import apiClient, {
  ApiResponse,
  setAccessToken,
  setRefreshToken,
  clearTokens,
  getAccessToken,
} from '@/lib/api-client';
import { User, UserRole } from '@/types/user';

// Auth request types
export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role?: 'client' | 'freelancer';
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface VerifyEmailRequest {
  token: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}

// Auth response types
export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthUserData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  emailVerified: boolean;
  phoneVerified: boolean;
  twoFactorEnabled: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  user: AuthUserData;
  tokens?: {
    accessToken: string;
    refreshToken: string;
  };
  requires2FA?: boolean;
  userId?: string;
  message?: string;
}

class AuthService {
  /**
   * Register a new user
   */
  async register(data: RegisterRequest): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<ApiResponse<AuthResponse>>(
        '/auth/register',
        data
      );

      if (response.data.success && response.data.data) {
        const authData = response.data.data;
        
        // Store tokens
        if (authData.tokens) {
          setAccessToken(authData.tokens.accessToken);
          setRefreshToken(authData.tokens.refreshToken);
        }

        return authData;
      }

      throw new Error('Registration failed');
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || 'Registration failed';
      throw new Error(message);
    }
  }

  /**
   * Login user
   */
  async login(data: LoginRequest): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<ApiResponse<AuthResponse>>(
        '/auth/login',
        data
      );

      if (response.data.success && response.data.data) {
        const authData = response.data.data;

        // Check if 2FA is required
        if (authData.requires2FA) {
          return authData;
        }

        // Store tokens
        if (authData.tokens) {
          setAccessToken(authData.tokens.accessToken);
          setRefreshToken(authData.tokens.refreshToken);
        }

        return authData;
      }

      throw new Error('Login failed');
    } catch (error: any) {
      // Extract error message from API response
      const message = error.response?.data?.error || 
                     error.response?.data?.message || 
                     error.message || 
                     'Login failed. Please check your credentials and try again.';
      throw new Error(message);
    }
  }

  /**
   * Refresh access token
   */
  async refreshToken(refreshToken: string): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<ApiResponse<AuthResponse>>(
        '/auth/refresh',
        { refreshToken }
      );

      if (response.data.success && response.data.data) {
        const authData = response.data.data;
        
        // Update tokens
        if (authData.tokens) {
          setAccessToken(authData.tokens.accessToken);
          setRefreshToken(authData.tokens.refreshToken);
        }

        return authData;
      }

      throw new Error('Token refresh failed');
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || 'Token refresh failed';
      clearTokens();
      throw new Error(message);
    }
  }

  /**
   * Logout user
   */
  async logout(): Promise<void> {
    try {
      // Call logout endpoint if it exists
      const token = getAccessToken();
      
      if (token) {
        await apiClient.post('/auth/logout');
      }
    } catch (error) {
      // Ignore logout errors, clear tokens anyway
      console.error('Logout error:', error);
    } finally {
      // Clear tokens from storage
      clearTokens();
    }
  }

  /**
   * Verify email
   */
  async verifyEmail(data: VerifyEmailRequest): Promise<AuthUserData> {
    try {
      const response = await apiClient.post<ApiResponse<{ user: AuthUserData }>>(
        '/auth/verify-email',
        data
      );

      if (response.data.success && response.data.data) {
        return response.data.data.user;
      }

      throw new Error('Email verification failed');
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || 'Email verification failed';
      throw new Error(message);
    }
  }

  /**
   * Resend verification email
   */
  async resendVerification(email: string): Promise<void> {
    try {
      const response = await apiClient.post<ApiResponse>(
        '/auth/resend-verification',
        { email }
      );

      if (!response.data.success) {
        throw new Error('Failed to resend verification email');
      }
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || 'Failed to resend verification email';
      throw new Error(message);
    }
  }

  /**
   * Forgot password - send reset email
   */
  async forgotPassword(data: ForgotPasswordRequest): Promise<void> {
    try {
      const response = await apiClient.post<ApiResponse>(
        '/auth/forgot-password',
        data
      );

      if (!response.data.success) {
        throw new Error('Failed to send reset email');
      }
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || 'Failed to send reset email';
      throw new Error(message);
    }
  }

  /**
   * Reset password
   */
  async resetPassword(data: ResetPasswordRequest): Promise<void> {
    try {
      const response = await apiClient.post<ApiResponse>(
        '/auth/reset-password',
        data
      );

      if (!response.data.success) {
        throw new Error('Password reset failed');
      }
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || 'Password reset failed';
      throw new Error(message);
    }
  }

  /**
   * Get current user profile
   */
  async getCurrentUser(): Promise<AuthUserData> {
    try {
      const response = await apiClient.get<ApiResponse<{ user: AuthUserData }>>(
        '/auth/me'
      );

      if (response.data.success && response.data.data) {
        return response.data.data.user;
      }

      throw new Error('Failed to fetch user profile');
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || 'Failed to fetch user profile';
      throw new Error(message);
    }
  }
}

export const authService = new AuthService();
