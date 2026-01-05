# API Client Verification - Quick Start Guide

## 🚀 Quick Setup

1. **Ensure environment is configured:**
   ```bash
   # Check .env.local exists
   cat .env.local
   # Should show: NEXT_PUBLIC_API_URL=http://localhost:4000
   ```

2. **Start servers:**
   ```bash
   # Terminal 1: Backend
   cd juanwork-api && npm run dev
   
   # Terminal 2: Frontend
   cd juanwork-frontend && npm run dev
   ```

3. **Open browser:**
   ```
   http://localhost:3000
   ```

---

## 🔧 Browser Console Commands

### Environment Configuration
```javascript
// Verify environment variables and API Client setup
window.verifyApiClient()
```

**Expected Output:**
```
✅ Environment Variable Reading: PASS
✅ API Client Base URL: http://localhost:4000
✅ Default URL Fallback: PASS
✅ Content-Type Header: application/json
✅ Timeout Configuration: 30000ms
```

---

### Token Management

#### Run All Verifications
```javascript
// Run all token management checks
window.verifyTokenManagement.runAll()
```

#### Individual Checks
```javascript
// Check Authorization header
window.verifyTokenManagement.authorizationHeader()

// Check token storage functions
window.verifyTokenManagement.tokenStorage()

// Check response interceptor
window.verifyTokenManagement.responseInterceptor()

// Simulate token refresh flow
window.verifyTokenManagement.tokenRefreshFlow()

// Check auth endpoint exclusion
window.verifyTokenManagement.authEndpointExclusion()
```

---

## 🧪 Quick Manual Tests

### Test 1: Authorization Header
1. Register/login to get tokens
2. Open DevTools → Network tab
3. Navigate to any authenticated page
4. Check request headers for: `Authorization: Bearer {token}`

### Test 2: Token Refresh
1. Login to get tokens
2. Open DevTools → Application → Local Storage
3. Modify `accessToken` (make it invalid)
4. Navigate to authenticated page
5. Check Network tab:
   - First request: 401
   - Refresh call: POST /auth/refresh
   - Retry: Original request succeeds

### Test 3: Failed Refresh
1. Login to get tokens
2. Modify both `accessToken` and `refreshToken` (make invalid)
3. Navigate to authenticated page
4. Verify:
   - Tokens cleared from localStorage
   - Redirected to /auth

---

## 📋 Quick Checklist

### Environment Configuration
- [ ] `.env.local` file exists
- [ ] `NEXT_PUBLIC_API_URL` is set
- [ ] API Client reads environment variable
- [ ] Default fallback works

### Token Management
- [ ] Authorization header added to requests
- [ ] Token refresh works on 401
- [ ] Failed refresh clears tokens
- [ ] Failed refresh redirects to /auth
- [ ] Concurrent requests handled correctly
- [ ] Auth endpoints excluded from refresh

---

## 📚 Full Documentation

For detailed testing instructions, see:
- **Manual Testing Guide**: `MANUAL-TESTING-GUIDE.md`
- **Verification Results**: `../task5-verification-results.md`
- **Implementation Summary**: `../task5-implementation-summary.md`

---

## 🆘 Troubleshooting

### Environment variable not working
```bash
# Restart the dev server
# Next.js needs restart to pick up .env changes
```

### Verification functions not available
```javascript
// Check if scripts are imported
// They should be available after page load
console.log(window.verifyApiClient)
console.log(window.verifyTokenManagement)
```

### Tokens not stored
```javascript
// Check localStorage
localStorage.getItem('accessToken')
localStorage.getItem('refreshToken')

// Check if browser allows localStorage
// (may be blocked in incognito mode)
```

---

## ✅ Success Criteria

All checks should show **PASS**:
- ✅ Environment variable reading
- ✅ API Client base URL
- ✅ Authorization header
- ✅ Token storage
- ✅ Response interceptor
- ✅ Token refresh flow
- ✅ Auth endpoint exclusion

---

## 🎯 Next Steps

After verification:
1. ✅ Environment configured correctly
2. ✅ Token management working
3. ✅ Ready for integration testing
4. ➡️ Proceed to Task 6: Auth Context integration
