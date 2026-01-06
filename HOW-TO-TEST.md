# How to Test the Project Post Frontend Feature

## Quick Start Guide

This guide will help you manually test the Project Post Frontend feature in **under 15 minutes**.

## Prerequisites (2 minutes)

### 1. Start the Servers

**Terminal 1 - Backend API:**
```bash
cd juanwork-api
npm run dev
```
✅ Verify: Console shows "Server listening on port 4000"

**Terminal 2 - Frontend:**
```bash
cd juanwork-frontend
pnpm dev
```
✅ Verify: Console shows "Ready on http://localhost:3000"

### 2. Prepare Browser
- Open Chrome/Firefox/Edge
- Press **F12** to open DevTools
- Click on **Network** tab
- Check "Preserve log" checkbox
- Open **Console** tab in another panel

### 3. Test Accounts
You'll need:
- ✅ **Client account** (role: 'client')
- ✅ **Freelancer account** (role: 'freelancer')

If you don't have these, create them using the signup flow.

---

## Test 1: Happy Path (5 minutes) ⭐ MOST IMPORTANT

### Goal
Verify the complete form works from start to finish.

### Steps

1. **Login as Client**
   - Go to http://localhost:3000/auth
   - Login with client credentials
   - ✅ Should redirect to dashboard

2. **Navigate to Post Project**
   - Click "Post a Project" or go to `/client/projects/post-project`
   - ✅ Form should load, Step 1 active

3. **Fill Step 1: Basic Details**
   ```
   Project Name: Test E-commerce Website Development
   Description: I need a full-stack e-commerce website with payment integration, user authentication, product catalog, shopping cart, and admin dashboard. The site should be responsive and SEO-friendly.
   Project Type: Fixed Price
   Budget Min: 1000
   Budget Max: 5000
   Delivery Days: 30
   Attachments: (skip - optional)
   ```
   - Click **Next**
   - ✅ Should move to Step 2

4. **Fill Step 2: Categories & Skills**
   - ✅ Skills input should be **disabled**
   - Select **Category**: "Web Development" (or any available)
   - ✅ Skills input should become **enabled**
   - Type **"R"** in skills input
   - ✅ Should see filtered skills (React, Ruby, etc.)
   - Click **"React"** to select it
   - Click **"Node.js"** to select it
   - Type **"CustomSkill2024"** and press **Enter**
   - ✅ Should see 3 skill chips
   - Click **Next**
   - ✅ Should move to Step 3

5. **Fill Step 3: Upgrades**
   - Select any 1-2 upgrades (if available)
   - ✅ Total cost should update
   - Click **Next**
   - ✅ Should move to Step 4

6. **Review & Submit (Step 4)**
   - ✅ Verify all data displays correctly
   - Click **"Submit Project"**
   - ✅ Button should show "Submitting..."
   - ✅ Button should be disabled

7. **Verify Success**
   - ✅ Success screen should appear
   - ✅ Project name should display
   - ✅ "Post Another Project" button visible
   - ✅ "View My Projects" button visible

8. **Check Network Tab**
   - ✅ Look for these requests:
     - `GET /categories` → Status 200
     - `GET /categories/web-development/skills` → Status 200
     - `GET /upgrade-types` → Status 200
     - `POST /projects` → Status 200 or 201

9. **Check Console**
   - ✅ No red errors

### ✅ Test 1 Result: PASS / FAIL

---

## Test 2: Validation Errors (3 minutes)

### Goal
Verify form prevents invalid submissions.

### Quick Tests

1. **Short Project Name**
   - Enter: "Test"
   - Tab out
   - ✅ Error: "Project name must be at least 10 characters"

2. **Short Description**
   - Enter: "Short"
   - Tab out
   - ✅ Error: "Description must be at least 50 characters"

3. **Invalid Budget**
   - Budget Min: 5000
   - Budget Max: 1000
   - Tab out
   - ✅ Error: "Minimum budget cannot be greater than maximum budget"

4. **Invalid Delivery Days**
   - Enter: 0
   - Tab out
   - ✅ Error: "Delivery days must be at least 1"

5. **No Category Selected**
   - Go to Step 2
   - ✅ Skills input should be disabled
   - ✅ Message: "Please select a category first"

### ✅ Test 2 Result: PASS / FAIL

---

## Test 3: Skill Filtering (2 minutes)

### Goal
Verify skill filtering and custom skills work.

### Steps

1. **Category First**
   - Go to Step 2
   - ✅ Skills input disabled without category

2. **Select Category**
   - Select any category
   - ✅ Loading indicator appears
   - ✅ Skills input becomes enabled

3. **Filter Skills**
   - Type "R"
   - ✅ Shows skills with "R" (React, Ruby, etc.)
   - ✅ Max 10 recommendations

4. **Custom Skill**
   - Type "MyCustomSkill123"
   - ✅ "No matching skills" message
   - ✅ "Press Enter to add" message
   - Press Enter
   - ✅ Skill added as chip

5. **Duplicate Prevention**
   - Try to add "React" again
   - ✅ Should not appear in dropdown

### ✅ Test 3 Result: PASS / FAIL

---

## Test 4: Error Handling (2 minutes)

### Goal
Verify error messages are user-friendly.

### Quick Tests

1. **Network Error**
   - Fill form completely
   - In DevTools Network tab: Enable **"Offline"** mode
   - Click Submit
   - ✅ Error: "Network error. Please check your connection"
   - Disable offline mode

2. **Freelancer Access**
   - Logout
   - Login as **freelancer**
   - Go to `/client/projects/post-project`
   - ✅ Error: "Only clients can post projects"

3. **Non-Authenticated**
   - Logout
   - Go to `/client/projects/post-project`
   - ✅ Should redirect to `/auth`

### ✅ Test 4 Result: PASS / FAIL

---

## Test 5: Loading States (1 minute)

### Goal
Verify loading indicators appear.

### Quick Checks

1. **Categories Loading**
   - Go to Step 2
   - ✅ Loading skeleton in category dropdown

2. **Skills Loading**
   - Select a category
   - ✅ Loading indicator in skills section

3. **Upgrades Loading**
   - Go to Step 3
   - ✅ Loading skeleton for upgrade cards

4. **Submission Loading**
   - Fill form and submit
   - ✅ Button shows "Submitting..."
   - ✅ Button is disabled

### ✅ Test 5 Result: PASS / FAIL

---

## Final Checklist

### Console Errors
- [ ] No red errors in Console tab
- [ ] No unhandled promise rejections

### Network Requests
- [ ] All API calls have Authorization headers
- [ ] Successful requests return 200/201
- [ ] Error requests return appropriate status codes

### User Experience
- [ ] Form is intuitive and easy to use
- [ ] Error messages are clear and helpful
- [ ] Loading states provide feedback
- [ ] Success screen is satisfying

---

## Test Results Summary

| Test | Status | Notes |
|------|--------|-------|
| 1. Happy Path | ⬜ Pass / ⬜ Fail | |
| 2. Validation Errors | ⬜ Pass / ⬜ Fail | |
| 3. Skill Filtering | ⬜ Pass / ⬜ Fail | |
| 4. Error Handling | ⬜ Pass / ⬜ Fail | |
| 5. Loading States | ⬜ Pass / ⬜ Fail | |

**Overall Status**: ⬜ PASS / ⬜ FAIL

---

## If You Find Issues

### Document the Issue
1. **What happened**: Describe the unexpected behavior
2. **What you expected**: Describe the expected behavior
3. **Steps to reproduce**: List the exact steps
4. **Screenshots**: Take screenshots if helpful
5. **Console errors**: Copy any error messages

### Example Issue Report
```
Issue: Skills not loading after category selection

What happened: Selected "Web Development" category but skills input remained disabled

Expected: Skills should load and input should become enabled

Steps:
1. Go to Step 2
2. Select "Web Development" from dropdown
3. Skills input stays disabled

Console error: "Failed to fetch skills: 404 Not Found"

Screenshot: [attach screenshot]
```

---

## Need More Details?

For comprehensive testing with all edge cases, see:
- **MANUAL-TESTING-CHECKLIST.md** - Complete checklist with 41 test cases
- **TESTING-QUICK-REFERENCE.md** - Quick reference for debugging
- **TASK-14-IMPLEMENTATION-PLAN.md** - Detailed testing strategy

---

## Quick Debugging Tips

### Form Not Submitting
1. Check Console for errors
2. Check Network tab for failed requests
3. Verify all required fields filled
4. Check validation errors

### Skills Not Loading
1. Verify category selected
2. Check Network tab for GET /categories/:slug/skills
3. Check response status and data
4. Verify categorySlug is correct

### API Errors
1. Verify backend is running (http://localhost:4000)
2. Check API URL in .env.local
3. Verify auth token in request headers
4. Check request payload format

---

**Testing Time**: ~15 minutes for all 5 tests  
**Confidence Level**: 10/10 - Comprehensive coverage of critical functionality
