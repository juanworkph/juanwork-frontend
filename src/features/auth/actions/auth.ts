import apiClient, {
  ApiResponse,
  setAccessToken,
  setRefreshToken,
  clearTokens,
  getAccessToken,
} from '@/lib/api-client';
import { logError, logApiError } from '@/utils/logger';
import {
  RegisterRequest,
  LoginRequest,
  RefreshTokenRequest,
  VerifyEmailRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  AuthResponse,
  AuthUserData,
} from '../schema/signup-schema';

// ============================================================================
// AUTH ACTIONS
// ============================================================================

/**
 * Register a new user
 * @throws Error with user-friendly message for various error scenarios
 */
export async function registerUser(data: RegisterRequest): Promise<AuthResponse> {
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
  } catch (error: unknown) {
    // Handle network errors (no response from server)
    if (error && typeof error === 'object' && 'response' in error && !error.response) {
      logApiError('Network error during registration', error);
      throw new Error('Unable to connect to server. Please check your internet connection.');
    }

    // Extract error details from response
    const errorResponse = error as { response?: { status: number; data?: { error?: string; message?: string; details?: unknown } } };
    const status = errorResponse.response?.status || 500;
    const errorData = errorResponse.response?.data;
    const errorMessage = errorData?.error || errorData?.message || 'Registration failed';

    // Log error for debugging (sensitive data will be redacted in production)
    logApiError('Registration error', error);

    // Handle specific HTTP status codes
    if (status === 400) {
      // Check for duplicate email error
      if (
        errorMessage.toLowerCase().includes('already exists') ||
        errorMessage.toLowerCase().includes('duplicate') ||
        errorMessage.toLowerCase().includes('email') && errorMessage.toLowerCase().includes('exist')
      ) {
        throw new Error('An account with this email already exists');
      }

      // Check for password strength errors
      if (
        errorMessage.toLowerCase().includes('password') &&
        (errorMessage.toLowerCase().includes('must') ||
         errorMessage.toLowerCase().includes('require') ||
         errorMessage.toLowerCase().includes('character'))
      ) {
        // Return backend's specific password requirements message
        throw new Error(errorMessage);
      }

      // Handle field-specific validation errors
      if (errorData?.details) {
        // If backend provides detailed field errors, use them
        throw new Error(errorMessage);
      }

      // Generic validation error
      throw new Error(errorMessage);
    }

    // Handle server errors (500+)
    if (status >= 500) {
      throw new Error('Something went wrong. Please try again later.');
    }

    // Handle other error codes (401, 403, etc.)
    throw new Error(errorMessage);
  }
}

/**
 * Login user
 */
export async function loginUser(data: LoginRequest): Promise<AuthResponse> {
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
  } catch (error: unknown) {
    // Extract error message from API response
    const errorResponse = error as { response?: { data?: { error?: string; message?: string } }; message?: string };
    const message = errorResponse.response?.data?.error || 
                   errorResponse.response?.data?.message || 
                   errorResponse.message || 
                   'Login failed. Please check your credentials and try again.';
    throw new Error(message);
  }
}

/**
 * Refresh access token
 */
export async function refreshAccessToken(refreshToken: string): Promise<AuthResponse> {
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
  } catch (error: unknown) {
    const errorResponse = error as { response?: { data?: { message?: string } }; message?: string };
    const message = errorResponse.response?.data?.message || errorResponse.message || 'Token refresh failed';
    clearTokens();
    throw new Error(message);
  }
}

/**
 * Logout user
 */
export async function logoutUser(): Promise<void> {
  try {
    // Call logout endpoint if it exists
    const token = getAccessToken();
    
    if (token) {
      await apiClient.post('/auth/logout');
    }
  } catch (error) {
    // Ignore logout errors, clear tokens anyway
    logError('Logout error', error);
  } finally {
    // Clear tokens from storage
    clearTokens();
  }
}

/**
 * Verify email
 */
export async function verifyUserEmail(data: VerifyEmailRequest): Promise<AuthUserData> {
  try {
    const response = await apiClient.post<ApiResponse<{ user: AuthUserData }>>(
      '/auth/verify-email',
      data
    );

    if (response.data.success && response.data.data) {
      return response.data.data.user;
    }

    throw new Error('Email verification failed');
  } catch (error: unknown) {
    const errorResponse = error as { response?: { data?: { message?: string } }; message?: string };
    const message = errorResponse.response?.data?.message || errorResponse.message || 'Email verification failed';
    throw new Error(message);
  }
}

/**
 * Resend verification email
 */
export async function resendVerificationEmail(email: string): Promise<void> {
  try {
    const response = await apiClient.post<ApiResponse>(
      '/auth/resend-verification',
      { email }
    );

    if (!response.data.success) {
      throw new Error('Failed to resend verification email');
    }
  } catch (error: unknown) {
    const errorResponse = error as { response?: { data?: { message?: string } }; message?: string };
    const message = errorResponse.response?.data?.message || errorResponse.message || 'Failed to resend verification email';
    throw new Error(message);
  }
}

/**
 * Forgot password - send reset email
 */
export async function sendPasswordResetEmail(data: ForgotPasswordRequest): Promise<void> {
  try {
    const response = await apiClient.post<ApiResponse>(
      '/auth/forgot-password',
      data
    );

    if (!response.data.success) {
      throw new Error('Failed to send reset email');
    }
  } catch (error: unknown) {
    const errorResponse = error as { response?: { data?: { message?: string } }; message?: string };
    const message = errorResponse.response?.data?.message || errorResponse.message || 'Failed to send reset email';
    throw new Error(message);
  }
}

/**
 * Reset password
 */
export async function resetUserPassword(data: ResetPasswordRequest): Promise<void> {
  try {
    const response = await apiClient.post<ApiResponse>(
      '/auth/reset-password',
      data
    );

    if (!response.data.success) {
      throw new Error('Password reset failed');
    }
  } catch (error: unknown) {
    const errorResponse = error as { response?: { data?: { message?: string } }; message?: string };
    const message = errorResponse.response?.data?.message || errorResponse.message || 'Password reset failed';
    throw new Error(message);
  }
}

/**
 * Get current user profile
 */
export async function getCurrentUser(): Promise<AuthUserData> {
  try {
    const response = await apiClient.get<ApiResponse<{ user: AuthUserData }>>(
      '/auth/me'
    );

    if (response.data.success && response.data.data) {
      return response.data.data.user;
    }

    throw new Error('Failed to fetch user profile');
  } catch (error: unknown) {
    const errorResponse = error as { response?: { data?: { message?: string } }; message?: string };
    const message = errorResponse.response?.data?.message || errorResponse.message || 'Failed to fetch user profile';
    throw new Error(message);
  }
}
