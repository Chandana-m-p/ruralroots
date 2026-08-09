import apiClient from './apiClient';

export interface VillageHubDTO {
  id: number;
  hubCode: string;
  hubName: string;
  pincode: string;
  villageName: string;
  district: string;
  state: string;
  landmark: string;
  latitude?: number;
  longitude?: number;
  operatesCod: boolean;
}

const FALLBACK_HUBS: VillageHubDTO[] = [
  {
    id: 1,
    hubCode: 'HUB-RAMGARH-01',
    hubName: 'Ramgarh Central Kendra (Kalyan Store)',
    pincode: '452001',
    villageName: 'Ramgarh',
    district: 'Indore',
    state: 'Madhya Pradesh',
    landmark: 'Near Panchayat Bhawan',
    operatesCod: true
  },
  {
    id: 2,
    hubCode: 'HUB-CHANDAN-02',
    hubName: 'Chandanpur Rural Hub (Gupta General)',
    pincode: '452002',
    villageName: 'Chandanpur',
    district: 'Indore',
    state: 'Madhya Pradesh',
    landmark: 'Opposite Bus Stand',
    operatesCod: true
  }
];

export const hubService = {
  /**
   * Get all active Village Hub Kendra pickup stores
   */
  async getAllHubs(): Promise<VillageHubDTO[]> {
    try {
      const response = await apiClient.get<VillageHubDTO[]>('/hubs');
      if (Array.isArray(response.data) && response.data.length > 0) {
        return response.data;
      }
    } catch (err) {
      console.warn('Network error or server offline. Using cached village hubs:', err);
    }
    return FALLBACK_HUBS;
  },

  /**
   * Get Village Hubs filtered by rural pincode
   */
  async getHubsByPincode(pincode: string): Promise<VillageHubDTO[]> {
    try {
      const response = await apiClient.get<VillageHubDTO[]>(`/hubs/pincode/${pincode.trim()}`);
      if (Array.isArray(response.data) && response.data.length > 0) {
        return response.data;
      }
    } catch (err) {
      console.warn(`Error fetching hubs for pincode ${pincode}, checking fallback:`, err);
    }
    const all = await this.getAllHubs();
    return all.filter((h) => h.pincode === pincode.trim());
  },

  /**
   * Get hub details by ID
   */
  async getHubById(id: number): Promise<VillageHubDTO | null> {
    try {
      const response = await apiClient.get<VillageHubDTO>(`/hubs/${id}`);
      if (response.data) return response.data;
    } catch (err) {
      console.warn(`Error fetching hub #${id}, checking fallback:`, err);
    }
    const all = await this.getAllHubs();
    return all.find((h) => Number(h.id) === Number(id)) || null;
  }
};

export default hubService;
