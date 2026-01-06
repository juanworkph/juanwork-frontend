# Project Post Frontend - Testing Quick Reference

## Quick Start Commands

```bash
# Terminal 1: Start Backend API
cd juanwork-api
npm run dev
# API runs on http://localhost:4000

# Terminal 2: Start Frontend
cd juanwork-frontend
pnpm dev
# Frontend runs on http://localhost:3000
```

## Test Data Templates

### Valid Project Data
```
Project Name: "Test E-commerce Website Development"
Description: "I need a full-stack e-commerce website with payment integration, user authentication, product catalog, shopping cart, and admin dashboard. The site should be responsive and SEO-friendly with modern UI/UX design."
Project Type: Fixed Price
Budget Min: 1000
Budget Max: 5000
Delivery Days: 30
Category: Web Development
Skills: React, Node.js, CustomSkill2024
Upgrades: Featured, Urgent
```

### Invalid Test Cases

#### Project Name
- Too short: `"Test"`
- Too long: `"A".repeat(201)`
- Empty: `""`

#### Description
- Too short: `"Short description"`
- Too long: `"A".repeat(5001)`
- Empty: `""`

#### Budget
- Min > Max: Min=5000, Max=1000
- Min < 1: Min=0
- Max < 1: Max=0

#### Delivery Days
- Too low: 0
- Too high: 366

## Browser DevTools Shortcuts

### Open DevTools
- **Windows/Linux**: `F12` or `Ctrl + Shift + I`
- **Mac**: `Cmd + Option + I`

### Network Tab
- **Filter by XHR**: Click "XHR" button
- **Clear**: Click trash icon
- **Preserve log**: Check "Preserve log" checkbox
- **Offline mode**: Throttling dropdown → "Offline"

### Console Tab
- **Clear**: `Ctrl + L` or click trash icon
- **Filter errors**: Click "Errors" button

### Application Tab
- **View localStorage**: Application → Local Storage → http://localhost:3000
- **Clear storage**: Application → Clear storage → "Clear site data"

## API Endpoints to Monitor

### GET Requests
```
GET /categories
GET /categories/:slug/skills
GET /upgrade-types
GET /projects/:id
GET /projects
```

### POST Requests
```
POST /projects
```

### Expected Status Codes
- **200**: Success (GET)
- **201**: Created (POST)
- **400**: Validation error
- **401**: Unauthorized
- **403**: Forbidden
- **404**: Not found
- **500**: Server error

## Common Testing Scenarios

### Scenario 1: Happy Path (2 minutes)
1. Login as client
2. Navigate to post project
3. Fill all steps with valid data
4. Submit
5. Verify success screen

### Scenario 2: Validation Errors (3 minutes)
1. Try short project name
2. Try short description
3. Try invalid budget (min > max)
4. Try invalid delivery days
5. Verify all error messages

### Scenario 3: Category & Skills (2 minutes)
1. Verify skills disabled without category
2. Select category
3. Type "R" in skills
4. Verify filtering
5. Add custom skill

### Scenario 4: Error Handling (3 minutes)
1. Test with offline mode
2. Test with expired token
3. Test as freelancer
4. Verify error messages

### Scenario 5: Loading States (2 minutes)
1. Watch categories load
2. Watch skills load
3. Watch upgrades load
4. Watch form submission
5. Verify all indicators

## Debugging Tips

### Form Not Submitting
1. Check console for errors
2. Check Network tab for failed requests
3. Verify all required fields filled
4. Check validation errors
5. Verify auth token exists

### Skills Not Loading
1. Verify category selected
2. Check Network tab for GET /categories/:slug/skills
3. Check response status and data
4. Verify categorySlug is correct
5. Check console for errors

### API Errors
1. Verify backend is running
2. Check API URL in .env.local
3. Verify auth token in request headers
4. Check request payload format
5. Check backend logs

### Loading States Not Showing
1. Check if loading state variables set
2. Verify conditional rendering logic
3. Check if API calls are async
4. Verify loading state cleared after response

## localStorage Keys

### Auth Tokens
```
authToken
refreshToken
user
```

### Form Data Persistence
```
savedProjectFormData
```

### Check localStorage
```javascript
// In browser console
localStorage.getItem('authToken')
localStorage.getItem('savedProjectFormData')
```

### Clear localStorage
```javascript
// In browser console
localStorage.clear()
```

## Test Account Requirements

### Client Account
- Role: `client`
- Can post projects
- Can access /client/projects/post-project

### Freelancer Account
- Role: `freelancer`
- Cannot post projects
- Should see error on /client/projects/post-project

### Create Test Accounts
Use the backend API or signup flow to create test accounts with appropriate roles.

## Expected API Request Format

### POST /projects
```json
{
  "name": "Test E-commerce Website Development",
  "description": "I need a full-stack e-commerce website...",
  "categoryId": "uuid-here",
  "paymentType": "fixed",
  "budgetMin": 1000,
  "budgetMax": 5000,
  "deliveryDays": 30,
  "customSkills": ["React", "Node.js", "CustomSkill2024"],
  "upgradeTypeIds": ["uuid-1", "uuid-2"]
}
```

### Expected Response
```json
{
  "success": true,
  "data": {
    "id": "project-uuid",
    "name": "Test E-commerce Website Development",
    "status": "active",
    "createdAt": "2024-01-06T12:00:00Z"
  },
  "message": "Project created successfully"
}
```

## Error Response Format

### Validation Error (400)
```json
{
  "success": false,
  "error": "Validation Error",
  "message": "Project name must be at least 10 characters",
  "statusCode": 400
}
```

### Unauthorized (401)
```json
{
  "success": false,
  "error": "Unauthorized",
  "message": "Please log in to continue",
  "statusCode": 401
}
```

### Forbidden (403)
```json
{
  "success": false,
  "error": "Forbidden",
  "message": "Only clients can create projects",
  "statusCode": 403
}
```

## Performance Benchmarks

### Expected Response Times
- GET /categories: < 500ms
- GET /categories/:slug/skills: < 500ms
- GET /upgrade-types: < 500ms
- POST /projects: < 1000ms

### Page Load Times
- Initial page load: < 2s
- Step navigation: < 100ms
- Form submission: < 2s

## Checklist Summary

### Pre-Testing ✓
- [ ] Backend running
- [ ] Frontend running
- [ ] Test accounts ready
- [ ] DevTools open
- [ ] localStorage cleared

### Core Tests ✓
- [ ] Complete form flow
- [ ] Validation errors
- [ ] Category & skills
- [ ] API errors
- [ ] Loading states
- [ ] Authentication

### Post-Testing ✓
- [ ] No console errors
- [ ] All API calls successful
- [ ] Error messages user-friendly
- [ ] Loading states working
- [ ] Form data persistence working

## Contact for Issues

If you encounter issues during testing:
1. Check console for errors
2. Check Network tab for failed requests
3. Review this quick reference
4. Check the detailed testing checklist
5. Document the issue with screenshots

## Notes Section

Use this space for quick notes during testing:

```
Test Run: [Date/Time]
Tester: [Name]

Quick Notes:
- 
- 
- 

Issues Found:
- 
- 
- 
```
