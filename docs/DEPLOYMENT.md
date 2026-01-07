# Deployment & Security Guide

## Deployment Requirements

### 1. HTTPS (Critical)

- **Production**: `NEXT_PUBLIC_API_URL` MUST use `https://`.
- **Reason**: Protects auth tokens and user data. Backend validates this and warns if HTTP is used in production.

### 2. Environment Variables

Ensure these are set in your deployment environment (e.g., Vercel, Docker):

```bash
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
NODE_ENV=production
```

## Security Measures

### Logging

- **Production**: Debug logs are suppressed. Sensitive data (passwords, tokens) is redacted from error logs using `@/utils/logger`.
- **Development**: Full logs enabled.

### Authentication

- **Token Storage**: Currently uses `localStorage`. (Future plan: HTTPOnly cookies).
- **CORS**: Backend is configured to restrict origins in production.

## Operations

### Restarting Services

If you encounter issues or need to apply updates:

**Backend**:

```bash
cd juanwork-api
# Kill existing process (Ctrl+C)
npm run dev # or npm start for prod
```

**Frontend**:

```bash
cd juanwork-frontend
# Kill existing process
pnpm dev # or pnpm start for prod
```
