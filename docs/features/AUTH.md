# Authentication Feature

## Overview

The authentication system has been migrated to use Server Actions and Client Actions, removing the deprecated service-based approach.

## Key Changes

1.  **Actions**: Migrated from `auth.service.ts` to `@/features/auth/actions/auth`.
2.  **Schema**: Consolidated all auth-related schemas (Login, Signup, etc.) into `src/features/auth/schema/auth.ts`.
3.  **Token Handling**:
    - Tokens are now handled client-side to avoid `use server` conflicts with `localStorage`.
    - Fixed `401 Unauthorized` errors by ensuring tokens are correctly attached to requests.

## Implementation Details

### Components

- **Login Form**: Uses `loginUser` action.
- **Signup Forms**: `ClientSignupForm` and `FreelancerSignupForm` use `registerUser`.
- **Auth Context**: Manages user state using `getCurrentUser` and `logoutUser`.

### Security

- **Token Storage**: `localStorage` (MVP) -> Planned move to HTTPOnly cookies.
- **HTTPS**: Required for specific production environments.

## Related Files

- `src/features/auth/actions/auth.ts`
- `src/features/auth/schema/auth.ts`
- `src/context/auth-context.tsx`
