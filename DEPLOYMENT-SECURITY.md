# Deployment Security Guidelines

## Overview

This document outlines critical security requirements for deploying the JuanWork frontend application to production environments.

## HTTPS Requirements

### ⚠️ CRITICAL: Production MUST Use HTTPS

**All production deployments MUST use HTTPS for the API URL.**

### Why HTTPS is Required

1. **Data Protection**: HTTPS encrypts all data transmitted between the client and server, protecting:
   - User passwords during registration and login
   - Authentication tokens (access tokens and refresh tokens)
   - Personal information (names, emails, etc.)
   - Payment information

2. **Token Security**: Without HTTPS, authentication tokens can be intercepted, allowing attackers to:
   - Impersonate users
   - Access user accounts
   - Perform unauthorized actions

3. **Compliance**: Many security standards and regulations require HTTPS for applications handling user data.

### Configuration

Set the `NEXT_PUBLIC_API_URL` environment variable to use HTTPS:

```bash
# ✅ CORRECT - Production
NEXT_PUBLIC_API_URL=https://api.juanwork.com

# ❌ INCORRECT - Production (will trigger security warning)
NEXT_PUBLIC_API_URL=http://api.juanwork.com

# ✅ ACCEPTABLE - Local Development Only
NEXT_PUBLIC_API_URL=http://localhost:4000
```

### Runtime Validation

The application includes runtime validation that will:
- Check if the API URL uses HTTPS in production
- Log a security warning to the console if HTTP is detected in production
- This helps catch misconfigurations before they become security issues

### Deployment Checklist

Before deploying to production, verify:

- [ ] `NEXT_PUBLIC_API_URL` uses `https://` protocol
- [ ] SSL/TLS certificate is valid and not expired
- [ ] Backend API is configured to accept HTTPS connections
- [ ] No mixed content warnings in browser console
- [ ] All API requests show secure (🔒) indicator in browser DevTools

## Sensitive Data Logging

### Production Logging Rules

The application uses a secure logger utility (`@/utils/logger`) that:

1. **Suppresses Debug Logs**: Regular logs are not output in production
2. **Redacts Sensitive Data**: Automatically removes sensitive information from error logs:
   - Passwords
   - Tokens (access tokens, refresh tokens)
   - Authorization headers
   - API keys
   - Private keys

### What Gets Logged in Production

**Errors Only**: Only error messages are logged in production, with sensitive data redacted:

```typescript
// Development - Full error details
console.error("Login error:", {
  email: "user@example.com",
  password: "secret123",  // ⚠️ Visible in dev
  token: "jwt-token-here"
});

// Production - Sensitive data redacted
console.error("Login error:", {
  email: "user@example.com",
  password: "[REDACTED]",  // ✅ Protected
  token: "[REDACTED]"
});
```

### Developer Guidelines

When adding new logging:

1. **Use Secure Logger**: Always import from `@/utils/logger`
   ```typescript
   import { logError, logApiError, devLog } from '@/utils/logger';
   ```

2. **Never Use Direct Console**: Avoid `console.log`, `console.error`, `console.warn`
   ```typescript
   // ❌ INCORRECT
   console.error("Error:", error);
   
   // ✅ CORRECT
   logError("Error:", error);
   ```

3. **Development-Only Logs**: Use `devLog` for debugging
   ```typescript
   devLog("Debug info:", data); // Only logs in development
   ```

## Token Storage

### Current Implementation

Tokens are currently stored in `localStorage`:
- Access Token: `localStorage.getItem('accessToken')`
- Refresh Token: `localStorage.getItem('refreshToken')`

### Security Considerations

**localStorage Limitations**:
- Accessible to JavaScript (XSS vulnerability)
- Not httpOnly (cannot be protected from client-side scripts)
- Acceptable for MVP but should be upgraded for production

**Future Enhancement**: Consider migrating to httpOnly cookies for enhanced security:
- Cookies with `httpOnly` flag cannot be accessed by JavaScript
- Provides better protection against XSS attacks
- Requires backend support for cookie-based authentication

## Environment Variables

### Required Variables

```bash
# API Configuration
NEXT_PUBLIC_API_URL=https://api.juanwork.com  # MUST use HTTPS in production

# Node Environment (automatically set by Next.js)
NODE_ENV=production
```

### Security Best Practices

1. **Never Commit Secrets**: Never commit `.env.local` or `.env.production` to version control
2. **Use Environment-Specific Files**: Maintain separate configurations for each environment
3. **Validate at Build Time**: Ensure required variables are set before deployment
4. **Rotate Secrets Regularly**: Change API keys and secrets periodically

## Additional Security Measures

### CORS Configuration

Ensure the backend API is configured with appropriate CORS settings:
- Allow only trusted origins in production
- Restrict allowed methods and headers
- Enable credentials if using cookies

### Content Security Policy (CSP)

Consider implementing CSP headers to prevent XSS attacks:
```
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; connect-src 'self' https://api.juanwork.com
```

### Rate Limiting

Implement rate limiting on authentication endpoints to prevent:
- Brute force attacks
- Credential stuffing
- Account enumeration

## Monitoring and Incident Response

### Security Monitoring

Monitor for:
- Failed login attempts
- Token refresh failures
- API errors and anomalies
- Unusual traffic patterns

### Incident Response

If a security incident occurs:
1. Immediately rotate all tokens and secrets
2. Review logs for unauthorized access
3. Notify affected users if data was compromised
4. Document the incident and response actions

## Compliance

### Data Protection

Ensure compliance with relevant regulations:
- GDPR (if serving EU users)
- CCPA (if serving California users)
- Other local data protection laws

### Regular Security Audits

Conduct regular security audits:
- Review code for security vulnerabilities
- Test authentication and authorization flows
- Verify HTTPS configuration
- Check for exposed secrets or sensitive data

## Support

For security concerns or questions:
- Contact: security@juanwork.com
- Report vulnerabilities responsibly
- Do not disclose security issues publicly

---

**Last Updated**: January 5, 2026
**Version**: 1.0
