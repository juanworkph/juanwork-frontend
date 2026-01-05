/**
 * @deprecated This service is deprecated. Use actions from @/features/auth/actions/auth instead.
 * This file is kept for backward compatibility only.
 * 
 * Migration guide:
 * - authService.register() -> registerUser()
 * - authService.login() -> loginUser()
 * - authService.logout() -> logoutUser()
 * - authService.refreshToken() -> refreshAccessToken()
 * - authService.verifyEmail() -> verifyUserEmail()
 * - authService.resendVerification() -> resendVerificationEmail()
 * - authService.forgotPassword() -> sendPasswordResetEmail()
 * - authService.resetPassword() -> resetUserPassword()
 * - authService.getCurrentUser() -> getCurrentUser()
 */

import {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  verifyUserEmail,
  resendVerificationEmail,
  sendPasswordResetEmail,
  resetUserPassword,
  getCurrentUser,
} from '@/features/auth/actions/auth';

// Re-export types for backward compatibility
export type {
  RegisterRequest,
  LoginRequest,
  RefreshTokenRequest,
  VerifyEmailRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  AuthTokens,
  AuthUserData,
  AuthResponse,
} from '@/features/auth/schema/signup-schema';

/**
 * @deprecated Use actions from @/features/auth/actions/auth instead
 */
class AuthService {
  /**
   * @deprecated Use registerUser() from @/features/auth/actions/auth
   */
  async register(...args: Parameters<typeof registerUser>) {
    return registerUser(...args);
  }

  /**
   * @deprecated Use loginUser() from @/features/auth/actions/auth
   */
  async login(...args: Parameters<typeof loginUser>) {
    return loginUser(...args);
  }

  /**
   * @deprecated Use refreshAccessToken() from @/features/auth/actions/auth
   */
  async refreshToken(...args: Parameters<typeof refreshAccessToken>) {
    return refreshAccessToken(...args);
  }

  /**
   * @deprecated Use logoutUser() from @/features/auth/actions/auth
   */
  async logout() {
    return logoutUser();
  }

  /**
   * @deprecated Use verifyUserEmail() from @/features/auth/actions/auth
   */
  async verifyEmail(...args: Parameters<typeof verifyUserEmail>) {
    return verifyUserEmail(...args);
  }

  /**
   * @deprecated Use resendVerificationEmail() from @/features/auth/actions/auth
   */
  async resendVerification(...args: Parameters<typeof resendVerificationEmail>) {
    return resendVerificationEmail(...args);
  }

  /**
   * @deprecated Use sendPasswordResetEmail() from @/features/auth/actions/auth
   */
  async forgotPassword(...args: Parameters<typeof sendPasswordResetEmail>) {
    return sendPasswordResetEmail(...args);
  }

  /**
   * @deprecated Use resetUserPassword() from @/features/auth/actions/auth
   */
  async resetPassword(...args: Parameters<typeof resetUserPassword>) {
    return resetUserPassword(...args);
  }

  /**
   * @deprecated Use getCurrentUser() from @/features/auth/actions/auth
   */
  async getCurrentUser() {
    return getCurrentUser();
  }
}

/**
 * @deprecated Use actions from @/features/auth/actions/auth instead
 */
export const authService = new AuthService();
