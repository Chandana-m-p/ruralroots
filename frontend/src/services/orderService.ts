import apiClient from './apiClient';

export interface OrderItemDTO {
  productId: number;
  productTitle: string;
  quantity: number;
  unitPrice: number;
}

export interface OrderSyncRequestDTO {
  idempotencyKey: string;
  hubId: number;
  paymentType?: string;
  totalAmount: number;
  offlineCreatedAt: string;
  items: OrderItemDTO[];
}

export interface OrderResponseDTO {
  id: number;
  orderNumber: string;
  idempotencyKey: string;
  buyerId?: number;
  buyerPhone: string;
  buyerName?: string;
  hubId: number;
  hubName: string;
  hubLandmark: string;
  orderStatus: string;
  paymentType: string;
  paymentStatus: string;
  totalAmount: number;
  offlineCreatedAt?: string;
  syncedAt?: string;
  cancellationReason?: string;
  cancelledAt?: string;
  items: OrderItemDTO[];
}

export const orderService = {
  /**
   * Sync new order to backend API with idempotency UUID
   */
  async syncOrder(payload: OrderSyncRequestDTO): Promise<OrderResponseDTO> {
    const response = await apiClient.post<OrderResponseDTO>('/orders/sync', payload);
    return response.data;
  },

  /**
   * Fetch order history for the logged-in buyer
   */
  async getMyOrders(): Promise<OrderResponseDTO[]> {
    try {
      const response = await apiClient.get<OrderResponseDTO[]>('/orders/my-orders');
      if (Array.isArray(response.data)) {
        return response.data;
      }
    } catch (err) {
      console.warn('Network error or server offline fetching user orders:', err);
    }
    return [];
  },

  /**
   * Submit order cancellation request
   */
  async cancelOrder(orderId: number, reason: string): Promise<OrderResponseDTO> {
    const response = await apiClient.post<OrderResponseDTO>(`/orders/${orderId}/cancel`, { reason });
    return response.data;
  }
};

export default orderService;
