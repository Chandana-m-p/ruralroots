import Dexie, { Table } from 'dexie';

export interface LocalProduct {
  id: number;
  sku: string;
  titleI18n: string;
  descriptionI18n: string;
  basePrice: number;
  stockQuantity: number;
  thumbnailUrl: string;
  imagesJson: string;
  isActive: boolean;
}

export interface LocalPendingOrder {
  id?: number;
  idempotencyKey: string;
  hubId: number;
  hubName: string;
  buyerPhone: string;
  totalAmount: number;
  paymentType: string;
  items: Array<{
    productId: number;
    productTitle: string;
    quantity: number;
    unitPrice: number;
  }>;
  offlineCreatedAt: string;
  syncStatus: 'QUEUED' | 'SYNCED' | 'FAILED';
}

export interface LocalUserSession {
  key: string;
  token?: string;
  userId?: number;
  phoneNumber?: string;
  fullName?: string;
  role?: string;
  preferredLanguage?: string;
  selectedHubId?: number;
}

export class RuralRootsDB extends Dexie {
  products!: Table<LocalProduct>;
  pendingOrders!: Table<LocalPendingOrder>;
  userSession!: Table<LocalUserSession>;

  constructor() {
    super('RuralRootsDB');
    this.version(1).stores({
      products: 'id, sku, isActive',
      pendingOrders: '++id, idempotencyKey, syncStatus',
      userSession: 'key'
    });
  }
}

export const db = new RuralRootsDB();
