# Manual Testing Guide: API Client Token Management

This guide provides step-by-step instructions for manually verifying the API Client token management functionality.

## Prerequisites

1. Backend server running on `http://localhost:4000`
2. Frontend server running on `http://localhost:3000`
3. Browser with DevTools (Chrome, Firefox, Edge, etc.)

## Test Suite 1: Environment Variable Configuration

### Test 1.1: Verify Environment Variable Reading

**Steps:**
1. Open `juanwork-frontend/.env.local`
2. Verify `NEXT_PUBLIC_API_URL=http://localhost:4000` is set
3. Start the frontend server: `npm run dev`
4. Open browser to `http://localhost:3000`
5. Open DevTools → Console
6. Type: `window.verifyApiClient()`

**Expected Result:**
```
✅ Environment Variable Reading: PASS
✅ API Client Base URL: http://localhost:4000
✅ Default URL Fallback: PASS
✅ Content-Type Header: application/json
✅ Timeout Configuration: 30000ms
```

### Test 1.2: Verify Default URL Fallback

**Steps:**
1. Rename `.env.local` to `.env.local.backup`
2. Restart the frontend server
3. Open DevTools → Console
4. Type: `window.verifyApiClient()`

**Expected Result:**
```
⚠️ Environment Variable Reading: FAIL (will use default)
✅ API Client Base URL: http://localhost:4000
✅ Default URL Fallback: PASS (using default)
```

5. Rename `.env.local.backup` back to `.env.local`
6. Restart the frontend server

### Test 1.3: Test Different Environment Values

**Steps:**
1. Edit `.env.local` and change to: `NEXT_PUBLIC_API_URL=http://localhost:5000`
2. Restart the frontend server
3. Open DevTools → Console
4. Type: `window.verifyApiClient()`

**Expected Result:**
```
✅ API Client Base URL: http://localhost:5000
```

5. Change back to `http://localhost:4000` and restart

---

## Test Suite 2: Authorization Header

### Test 2.1: Verify Authorization Header is Added

**Steps:**
1. Navigate to signup page: `http://localhost:3000/auth/signup`
2. Register a new user with valid data
3. After successful registration, open DevTools → Network tab
4. Navigate to profile or dashboard (any authenticated page)
5. Find an API request in Network tab
6. Click on the request → Headers tab
7. Look for "Request Headers" section

**Expected Result:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Test 2.2: Verify No Header Without Token

**Steps:**
1. Open DevTools → Application tab → Local Storage
2. Delete `accessToken` and `refreshToken`
3. Navigate to a public page (e.g., home page)
4. Open DevTools → Network tab
5. Check any API requests

**Expected Result:**
- No `Authorization` header present in requests
- Or requests fail with 401 if trying to access protected resources

---

## Test Suite 3: Token Refresh on 401

### Test 3.1: Simulate Token Expiration

**Steps:**
1. Login or register to get tokens
2. Open DevTools → Application tab → Local Storage
3. Copy the `accessToken` value
4. Modify the token (change a few characters to make it invalid)
5. Navigate to an authenticated page (e.g., dashboard)
6. Open DevTools → Network tab
7. Observe the network requests

**Expected Result:**
1. First request returns 401 (Unauthorized)
2. Immediately followed by POST request to `/auth/refresh`
3. Original request is retried with new token
4. Page loads successfully

**Network Tab Should Show:**
```
GET /api/user/profile → 401 Unauthorized
POST /auth/refresh → 200 OK
GET /api/user/profile → 200 OK (retry with new token)
```

### Test 3.2: Verify Token Update After Refresh

**Steps:**
1. After completing Test 3.1
2. Open DevTools → Application tab → Local Storage
3. Check `accessToken` value

**Expected Result:**
- Token value is different from the invalid one you set
- New valid token is stored

---

## Test Suite 4: Failed Token Refresh

### Test 4.1: Simulate Failed Refresh

**Steps:**
1. Login or register to get tokens
2. Open DevTools → Application tab → Local Storage
3. Modify both `accessToken` and `refreshToken` (make them invalid)
4. Navigate to an authenticated page
5. Observe behavior

**Expected Result:**
1. Request returns 401
2. Refresh attempt is made
3. Refresh fails (401 or 400)
4. Tokens are cleared from localStorage
5. User is redirected to `/auth` (login page)

### Test 4.2: Verify Token Clearing

**Steps:**
1. After completing Test 4.1
2. Open DevTools → Application tab → Local Storage
3. Check for `accessToken` and `refreshToken`

**Expected Result:**
- Both tokens are removed from localStorage
- localStorage is clean

---

## Test Suite 5: Concurrent Request Handling

### Test 5.1: Multiple Simultaneous Requests

**Steps:**
1. Login to get valid tokens
2. Modify `accessToken` to make it invalid
3. Open DevTools → Network tab
4. Navigate to a page that makes multiple API calls simultaneously (e.g., dashboard)
5. Observe the network requests

**Expected Result:**
1. Multiple requests return 401
2. Only ONE refresh request is made
3. All original requests are retried after refresh succeeds
4. All requests complete successfully

**Network Tab Should Show:**
```
GET /api/user/profile → 401
GET /api/user/stats → 401
GET /api/user/projects → 401
POST /auth/refresh → 200 OK (only one refresh call)
GET /api/user/profile → 200 OK (retry)
GET /api/user/stats → 200 OK (retry)
GET /api/user/projects → 200 OK (retry)
```

---

## Test Suite 6: Auth Endpoint Exclusion

### Test 6.1: Verify Login Doesn't Trigger Refresh

**Steps:**
1. Clear all tokens from localStorage
2. Navigate to login page
3. Enter invalid credentials
4. Open DevTools → Network tab
5. Submit login form

**Expected Result:**
- POST `/auth/login` returns 401 (invalid credentials)
- NO refresh attempt is made
- User sees error message
- No redirect to `/auth` (already on auth page)

### Test 6.2: Verify Register Doesn't Trigger Refresh

**Steps:**
1. Navigate to signup page
2. Try to register with existing email
3. Open DevTools → Network tab

**Expected Result:**
- POST `/auth/register` returns 400 (duplicate email)
- NO refresh attempt is made
- User sees error message

---

## Test Suite 7: Browser Console Verification

### Test 7.1: Run Token Storage Verification

**Steps:**
1. Open DevTools → Console
2. Type: `window.verifyTokenManagement.tokenStorage()`

**Expected Result:**
```
💾 Token Storage Verification
✅ Access token storage: PASS
✅ Refresh token storage: PASS
✅ Token clearing: PASS
```

### Test 7.2: Run Authorization Header Verification

**Steps:**
1. Login to get tokens
2. Open DevTools → Console
3. Type: `window.verifyTokenManagement.authorizationHeader()`

**Expected Result:**
```
🔐 Authorization Header Verification
✅ Access token found: eyJhbGciOiJIUzI1NiI...
📋 Token will be added to requests as: Bearer eyJhbGciOiJIUzI1NiI...
✅ Request interceptor configured
```

### Test 7.3: Run All Verifications

**Steps:**
1. Open DevTools → Console
2. Type: `window.verifyTokenManagement.runAll()`

**Expected Result:**
```
🚀 Running API Client Token Management Verification

[All verification checks run]

📊 Verification Summary:
┌─────────────────────────┬────────┐
│ Authorization Header    │ PASS   │
│ Token Storage          │ PASS   │
│ Response Interceptor   │ PASS   │
│ Auth Endpoint Exclusion│ PASS   │
└─────────────────────────┴────────┘

✅ All verifications complete!
```

---

## Troubleshooting

### Issue: Environment variable not read

**Solution:**
1. Ensure `.env.local` exists in `juanwork-frontend/` directory
2. Restart the Next.js development server
3. Clear browser cache and reload

### Issue: Tokens not stored

**Solution:**
1. Check browser console for errors
2. Verify localStorage is enabled in browser
3. Check if running in incognito/private mode (may block localStorage)

### Issue: Infinite refresh loop

**Solution:**
1. Check that auth endpoints are properly excluded
2. Verify refresh token endpoint returns valid tokens
3. Check backend logs for errors

### Issue: No redirect after failed refresh

**Solution:**
1. Check browser console for JavaScript errors
2. Verify `window.location.href` is not blocked
3. Check if running in iframe (may block navigation)

---

## Verification Checklist

Use this checklist to track your manual testing progress:

### Environment Configuration
- [ ] Environment variable read correctly
- [ ] Default URL fallback works
- [ ] Different environment values work
- [ ] .env.local file created
- [ ] .env.example file created

### Authorization Header
- [ ] Header added with Bearer token
- [ ] No header when no token
- [ ] Correct format: `Bearer {token}`

### Token Refresh
- [ ] 401 triggers refresh
- [ ] Refresh endpoint called
- [ ] Original request retried
- [ ] New tokens stored
- [ ] Concurrent requests queued

### Failed Refresh
- [ ] Tokens cleared on failure
- [ ] Redirect to /auth occurs
- [ ] No infinite loops

### Auth Endpoint Exclusion
- [ ] Login doesn't trigger refresh
- [ ] Register doesn't trigger refresh
- [ ] Refresh doesn't trigger refresh
- [ ] Password reset doesn't trigger refresh

### Console Verification
- [ ] Token storage verification passes
- [ ] Authorization header verification passes
- [ ] Response interceptor verification passes
- [ ] All verifications pass

---

## Notes

- All tests should be performed with both backend and frontend running
- Use browser DevTools Network tab to observe API calls
- Check browser console for any errors or warnings
- Test in different browsers if possible (Chrome, Firefox, Safari)
- Test with different network conditions (slow 3G, offline, etc.)

---

## Conclusion

After completing all tests, you should have verified:
1. ✅ Environment variables are correctly configured
2. ✅ Authorization headers are properly added
3. ✅ Token refresh works on 401 errors
4. ✅ Failed refresh clears tokens and redirects
5. ✅ Concurrent requests are handled correctly
6. ✅ Auth endpoints are excluded from refresh logic

If all tests pass, the API Client token management is working correctly! 🎉
