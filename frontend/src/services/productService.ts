import apiClient from './apiClient';
import { db, LocalProduct } from '../db';
import { getProductCategory, FALLBACK_PRODUCTS } from './api';

export interface ProductResponseDTO {
  id: number;
  sku: string;
  category?: string;
  titleI18n: string;
  descriptionI18n: string;
  basePrice: number;
  stockQuantity: number;
  thumbnailUrl: string;
  imagesJson: string;
  isActive: boolean;
}

export const productService = {
  /**
   * Get all active products from backend API, caching into Dexie IndexedDB
   */
  async getAllProducts(): Promise<LocalProduct[]> {
    try {
      const response = await apiClient.get<ProductResponseDTO[]>('/products');
      const data = response.data;

      if (Array.isArray(data) && data.length > 0) {
        await db.products.clear();
        const productsToStore: LocalProduct[] = data.map((p) => ({
          id: p.id,
          sku: p.sku,
          category: p.category || getProductCategory(p as any),
          titleI18n: typeof p.titleI18n === 'object' ? JSON.stringify(p.titleI18n) : p.titleI18n,
          descriptionI18n: typeof p.descriptionI18n === 'object' ? JSON.stringify(p.descriptionI18n) : p.descriptionI18n,
          basePrice: Number(p.basePrice),
          stockQuantity: p.stockQuantity,
          thumbnailUrl: p.thumbnailUrl,
          imagesJson: typeof p.imagesJson === 'object' ? JSON.stringify(p.imagesJson) : (p.imagesJson || '[]'),
          isActive: p.isActive
        }));

        await db.products.bulkPut(productsToStore);
        return productsToStore;
      }
    } catch (err) {
      console.warn('Network error or server offline. Reading products from Dexie IndexedDB cache:', err);
    }

    // Read from IndexedDB offline cache
    const cached = await db.products.toArray();
    if (cached.length > 0) {
      return cached;
    }

    // Default fallback
    await db.products.bulkPut(FALLBACK_PRODUCTS);
    return FALLBACK_PRODUCTS;
  },

  /**
   * Get product details by ID
   */
  async getProductById(id: number): Promise<LocalProduct | null> {
    try {
      const response = await apiClient.get<ProductResponseDTO>(`/products/${id}`);
      const p = response.data;
      if (p) {
        return {
          id: p.id,
          sku: p.sku,
          category: p.category || getProductCategory(p as any),
          titleI18n: typeof p.titleI18n === 'object' ? JSON.stringify(p.titleI18n) : p.titleI18n,
          descriptionI18n: typeof p.descriptionI18n === 'object' ? JSON.stringify(p.descriptionI18n) : p.descriptionI18n,
          basePrice: Number(p.basePrice),
          stockQuantity: p.stockQuantity,
          thumbnailUrl: p.thumbnailUrl,
          imagesJson: typeof p.imagesJson === 'object' ? JSON.stringify(p.imagesJson) : (p.imagesJson || '[]'),
          isActive: p.isActive
        };
      }
    } catch (err) {
      console.warn(`Error fetching product #${id} from backend API, checking local cache:`, err);
    }

    const all = await this.getAllProducts();
    return all.find((item) => String(item.id) === String(id)) || null;
  }
};

export default productService;
