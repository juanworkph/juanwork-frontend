import { z } from "zod";
import { UserRole } from "@/types/user";

// ============================================================================
// ZOD SCHEMAS
// ============================================================================

/**
 * Signup form validation schema
 */
export const signupSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be less than 50 characters"),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be less than 50 characters"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password must be less than 100 characters")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "Password must contain at least one uppercase letter, one lowercase letter, and one number"),
  confirmPassword: z
    .string()
    .min(1, "Please confirm your password"),
  role: z
    .enum(["freelancer", "client"])
    .refine((val) => val !== undefined, {
      message: "Please select a role",
    }),
  sendHelpfulEmails: z.boolean().optional(),
  agreeToTerms: z
    .boolean()
    .refine((val) => val === true, "You must agree to the terms and conditions"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

/**
 * Login form validation schema
 */
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required"),
});

/**
 * Forgot password form validation schema
 */
export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
});

/**
 * Reset password form validation schema
 */
export const resetPasswordSchema = z.object({
  token: z.string().min(1, "Token is required"),
  newPassword: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password must be less than 100 characters")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "Password must contain at least one uppercase letter, one lowercase letter, and one number"),
  confirmPassword: z
    .string()
    .min(1, "Please confirm your password"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

/**
 * Verify email schema
 */
export const verifyEmailSchema = z.object({
  token: z.string().min(1, "Token is required"),
});

/**
 * Resend verification email schema
 */
export const resendVerificationSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
});

// ============================================================================
// TYPESCRIPT TYPES (Inferred from Zod schemas)
// ============================================================================

export type SignupFormData = z.infer<typeof signupSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
export type VerifyEmailFormData = z.infer<typeof verifyEmailSchema>;
export type ResendVerificationFormData = z.infer<typeof resendVerificationSchema>;

// ============================================================================
// API REQUEST TYPES
// ============================================================================

/**
 * Registration request payload sent to backend API
 * Note: Frontend-only fields (confirmPassword, agreeToTerms) are NOT included
 * @property firstName - User's first name (min 2, max 100 chars)
 * @property lastName - User's last name (min 2, max 100 chars)
 * @property email - Valid email address
 * @property password - Password (min 8 chars)
 * @property role - User role (defaults to 'client' on backend if not provided)
 */
export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role?: 'client' | 'freelancer';
}

/**
 * Login request payload
 */
export interface LoginRequest {
  email: string;
  password: string;
}

/**
 * Refresh token request payload
 */
export interface RefreshTokenRequest {
  refreshToken: string;
}

/**
 * Verify email request payload
 */
export interface VerifyEmailRequest {
  token: string;
}

/**
 * Forgot password request payload
 */
export interface ForgotPasswordRequest {
  email: string;
}

/**
 * Reset password request payload
 */
export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}

/**
 * Resend verification email request payload
 */
export interface ResendVerificationRequest {
  email: string;
}

// ============================================================================
// API RESPONSE TYPES
// ============================================================================

/**
 * Auth tokens returned from backend
 */
export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

/**
 * User data returned from auth endpoints
 */
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

/**
 * Standard auth response from backend
 */
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
