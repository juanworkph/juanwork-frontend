# Task 12: Add Authentication Guards - Implementation Plan

## Confidence Level: 9/10

This implementation will add authentication guards to the post-project page to ensure only authenticated clients can access the form.

## Current State Analysis

1. **Auth Context**: Already exists at `src/contexts/auth-context.tsx` with:
   - `useAuth()` hook providing `user`, `isAuthenticated`, `isLoading`, `currentRole`
   - User role checking capability
   - Logout functionality

2. **API Client**: Already handles token refresh and 401 errors at `src/lib/api-client.ts`

3. **Post Project Page**: Currently at `src/app/client/projects/post-project/page.tsx`:
   - Has form data persistence (localStorage)
   - Handles 401 errors during submission
   - Missing: Initial auth check on page load

## Implementation Steps

### Sub-task 12.1: Update post-project/page.tsx with auth check
**Confidence: 9/10**

1. Import `useAuth` hook from auth context
2. Destructure `user`, `isAuthenticated`, `isLoading`, `currentRole` from useAuth
3. Add state for auth check completion
4. Check authentication status on component mount

### Sub-task 12.2: Implement redirect logic
**Confidence: 9/10**

1. Create early return for loading state (show loading spinner)
2. Create early return for non-authenticated users (redirect to /auth)
3. Create early return for non-client users (show error message with link)
4. Use `useRouter` for redirects
5. Display appropriate error messages using toast

### Sub-task 12.3: Handle token expiration
**Confidence: 8/10**

1. Token expiration during form filling is already handled in `handleSubmit`:
   - Detects 401 errors
   - Saves form data to localStorage
   - Redirects to login
2. Form data restoration is already implemented in `useEffect` on mount
3. Need to ensure the flow works correctly with auth guards

## Files to Modify

1. `juanwork-frontend/src/app/client/projects/post-project/page.tsx`
   - Add auth imports
   - Add auth checks
   - Add redirect logic
   - Add error UI for non-clients

## Testing Checklist

- [ ] Non-authenticated user redirected to /auth
- [ ] Freelancer user sees "Only clients can post projects" message
- [ ] Client user can access form normally
- [ ] Token expiration during form filling saves data and redirects
- [ ] Form data restored after login
- [ ] Loading state shows while checking auth

## Notes

- The existing 401 handling in `handleSubmit` already covers token expiration during form filling
- Form data persistence is already implemented
- We just need to add the initial auth check on page load
