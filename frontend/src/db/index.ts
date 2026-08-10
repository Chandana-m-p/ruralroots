import Dexie, { Table } from 'dexie';

export interface LocalProduct {
  id: number;
  sku: string;
  category: string;
  titleI18n: string;
  descriptionI18n: string;
  basePrice: number;
  stockQuantity: number;
  thumbnailUrl: string;
  imagesJson: string;
  isActive: boolean;
  artisanName?: string;
  artisanRegion?: string;
}

export interface LocalPendingOrder {
  id?: number;
  idempotencyKey: string;
  orderNumber?: string;
  orderStatus?: string;
  deliveryDate?: string;
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
  syncStatus: 'QUEUED' | 'SYNCED' | 'FAILED' | 'CANCELLED';
  cancellationReason?: string;
  cancelledAt?: string;
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

export interface LocalReview {
  id?: number;
  productId: number;
  orderId: number;
  buyerName: string;
  overallRating: number;
  title: string;
  comment: string;
  isVerifiedPurchase: boolean;
  helpfulVotes: number;
  createdAt: string;
  attributes: Array<{ attributeName: string; ratingScore: number }>;
  mediaList: Array<{ mediaType: string; url: string }>;
}

export interface LocalAddress {
  id?: number;
  remoteId?: number;
  label: string;
  fullName: string;
  phoneNumber: string;
  addressLine: string;
  villageOrCity: string;
  district: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

export class RuralRootsDB extends Dexie {
  products!: Table<LocalProduct>;
  pendingOrders!: Table<LocalPendingOrder>;
  userSession!: Table<LocalUserSession>;
  reviews!: Table<LocalReview>;
  userAddresses!: Table<LocalAddress>;

  constructor() {
    super('RuralRootsDB');
    this.version(2).stores({
      products: 'id, sku, isActive',
      pendingOrders: '++id, idempotencyKey, syncStatus',
      userSession: 'key',
      reviews: '++id, productId, orderId'
    });
    this.version(3).stores({
      products: 'id, sku, isActive',
      pendingOrders: '++id, idempotencyKey, syncStatus',
      userSession: 'key',
      reviews: '++id, productId, orderId',
      userAddresses: '++id, remoteId, isDefault'
    });
  }
}

export const db = new RuralRootsDB();
