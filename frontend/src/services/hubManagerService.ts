import apiClient from './apiClient';
import { OrderResponseDTO } from './orderService';

export const hubManagerService = {
  /**
   * Fetch incoming orders for a specific Village Hub store
   */
  async getOrdersForHub(hubId: number): Promise<OrderResponseDTO[]> {
    try {
      const response = await apiClient.get<OrderResponseDTO[]>(`/hub/orders/hub/${hubId}`);
      if (Array.isArray(response.data)) {
        return response.data;
      }
    } catch (err) {
      console.warn(`Error fetching orders for hub #${hubId} from backend API:`, err);
    }
    return [];
  },

  /**
   * Complete Cash-on-Delivery handover for an order
   */
  async completeOrderHandover(orderId: number): Promise<OrderResponseDTO> {
    const response = await apiClient.post<OrderResponseDTO>(`/hub/orders/${orderId}/handover`);
    return response.data;
  }
};

export default hubManagerService;
