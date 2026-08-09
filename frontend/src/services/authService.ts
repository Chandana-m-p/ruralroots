import apiClient from './apiClient';

export interface AuthRequestPayload {
  phoneNumber: string;
  role?: string;
}

export interface OtpVerifyPayload {
  phoneNumber: string;
  otp: string;
}

export interface AuthResponseData {
  token: string;
  tokenType: string;
  userId: number;
  phoneNumber: string;
  fullName: string;
  role: string;
  preferredLanguage?: string;
  selectedHubId?: number;
}

export const authService = {
  /**
   * Request 4-digit SMS OTP from Spring Boot backend
   */
  async requestOtp(phoneNumber: string, role = 'ROLE_BUYER'): Promise<{ message: string; otp?: string }> {
    const cleanPhone = phoneNumber.replace(/\D/g, '');
    const response = await apiClient.post<{ message: string; otp?: string }>('/auth/request-otp', {
      phoneNumber: cleanPhone,
      role
    });
    return response.data;
  },

  /**
   * Verify OTP and receive JWT Token & User Data
   */
  async verifyOtp(phoneNumber: string, otp: string): Promise<AuthResponseData> {
    const cleanPhone = phoneNumber.replace(/\D/g, '');
    const response = await apiClient.post<AuthResponseData>('/auth/verify-otp', {
      phoneNumber: cleanPhone,
      otp: otp.trim()
    });
    return response.data;
  }
};

export default authService;
