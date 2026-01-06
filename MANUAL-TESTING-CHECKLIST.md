# Project Post Frontend - Manual Testing Checklist

## Setup Instructions

### 1. Start Backend API
```bash
cd juanwork-api
npm run dev
```
**Verify**: API running on http://localhost:4000

### 2. Start Frontend
```bash
cd juanwork-frontend
pnpm dev
```
**Verify**: Frontend running on http://localhost:3000

### 3. Prepare Test Accounts
- **Client Account**: Email/password for client role
- **Freelancer Account**: Email/password for freelancer role
- **No Account**: For testing authentication redirect

### 4. Open Browser DevTools
- Press F12 or Right-click → Inspect
- Open **Network** tab
- Open **Console** tab
- Open **Application** tab (for localStorage)

---

## Test 14.1: Complete Form Flow ✓

### Test Steps

#### Step 1: Login as Client
- [ ] Navigate to http://localhost:3000/auth
- [ ] Login with client credentials
- [ ] Verify successful login
- [ ] Verify redirect to dashboard

#### Step 2: Navigate to Post Project
- [ ] Click "Post a Project" or navigate to /client/projects/post-project
- [ ] Verify form loads
- [ ] Verify Step 1 is active

#### Step 3: Fill Basic Details (Step 1)
- [ ] **Project Name**: "Test E-commerce Website Development"
- [ ] **Description**: "I need a full-stack e-commerce website with payment integration, user authentication, product catalog, shopping cart, and admin dashboard. The site should be responsive and SEO-friendly."
- [ ] **Project Type**: Select "Fixed Price"
- [ ] **Budget Min**: 1000
- [ ] **Budget Max**: 5000
- [ ] **Delivery Days**: 30
- [ ] **Attachments**: (Optional - test without first)
- [ ] Click "Next"
- [ ] Verify navigation to Step 2

#### Step 4: Select Category and Skills (Step 2)
- [ ] Verify skills input is **disabled**
- [ ] Verify message "Please select a category first"
- [ ] **Select Category**: "Web Development" (or any available)
- [ ] Verify loading indicator appears
- [ ] Verify skills input becomes **enabled**
- [ ] **Type in skills**: "R"
- [ ] Verify filtered skills appear (React, Ruby, etc.)
- [ ] Select "React"
- [ ] Select "Node.js"
- [ ] **Add custom skill**: Type "CustomFramework2024" and press Enter
- [ ] Verify custom skill added as chip
- [ ] Click "Next"
- [ ] Verify navigation to Step 3

#### Step 5: Select Upgrades (Step 3)
- [ ] Verify upgrade cards load
- [ ] Select "Featured" upgrade (if available)
- [ ] Select "Urgent" upgrade (if available)
- [ ] Verify total cost calculation updates
- [ ] Click "Next"
- [ ] Verify navigation to Step 4

#### Step 6: Review and Submit (Step 4)
- [ ] Verify project name displays correctly
- [ ] Verify description displays correctly
- [ ] Verify payment type displays correctly
- [ ] Verify budget range displays correctly
- [ ] Verify delivery days displays correctly
- [ ] Verify category displays correctly
- [ ] Verify all skills display (including custom)
- [ ] Verify selected upgrades display with prices
- [ ] Verify total upgrade cost displays
- [ ] Click "Submit Project"

#### Step 7: Verify Submission
- [ ] Verify submit button shows "Submitting..."
- [ ] Verify submit button is disabled
- [ ] **Check Network Tab**: POST /projects request
- [ ] Verify response status: 200 or 201
- [ ] Verify success screen appears
- [ ] Verify project name displays on success screen
- [ ] Verify "Post Another Project" button appears
- [ ] Verify "View My Projects" button appears

#### Step 8: Verify API Calls in Network Tab
- [ ] GET /categories (Step 2 load)
- [ ] GET /categories/:slug/skills (After category selection)
- [ ] GET /upgrade-types (Step 3 load)
- [ ] POST /projects (Form submission)
- [ ] All requests have status 200/201
- [ ] All requests include Authorization header

### Expected Results
✅ Form completes successfully  
✅ All API calls succeed  
✅ Success screen displays  
✅ No console errors  

---

## Test 14.2: Validation Errors ✓

### Test Case 1: Project Name Validation

#### Too Short
- [ ] Enter: "Test"
- [ ] Tab out or click Next
- [ ] **Expected**: "Project name must be at least 10 characters"
- [ ] **Expected**: Cannot proceed to next step

#### Too Long
- [ ] Enter: 201 character string (copy/paste)
- [ ] Tab out or click Next
- [ ] **Expected**: "Project name must not exceed 200 characters"
- [ ] **Expected**: Cannot proceed to next step

#### Empty
- [ ] Leave field empty
- [ ] Click Next
- [ ] **Expected**: "Project name is required" or similar
- [ ] **Expected**: Cannot proceed to next step

### Test Case 2: Description Validation

#### Too Short
- [ ] Enter: "Short description"
- [ ] Tab out or click Next
- [ ] **Expected**: "Description must be at least 50 characters"
- [ ] **Expected**: Cannot proceed to next step

#### Too Long
- [ ] Enter: 5001 character string
- [ ] Tab out or click Next
- [ ] **Expected**: "Description must not exceed 5000 characters"
- [ ] **Expected**: Cannot proceed to next step

#### Empty
- [ ] Leave field empty
- [ ] Click Next
- [ ] **Expected**: "Description is required" or similar
- [ ] **Expected**: Cannot proceed to next step

### Test Case 3: Budget Validation

#### Min > Max
- [ ] Budget Min: 5000
- [ ] Budget Max: 1000
- [ ] Tab out or click Next
- [ ] **Expected**: "Minimum budget cannot be greater than maximum budget"
- [ ] **Expected**: Cannot proceed to next step

#### Min < 1
- [ ] Budget Min: 0
- [ ] Budget Max: 1000
- [ ] Tab out or click Next
- [ ] **Expected**: "Minimum budget must be at least 1"
- [ ] **Expected**: Cannot proceed to next step

#### Max < 1
- [ ] Budget Min: 100
- [ ] Budget Max: 0
- [ ] Tab out or click Next
- [ ] **Expected**: "Maximum budget must be at least 1"
- [ ] **Expected**: Cannot proceed to next step

### Test Case 4: Delivery Days Validation

#### Too Low
- [ ] Delivery Days: 0
- [ ] Tab out or click Next
- [ ] **Expected**: "Delivery days must be at least 1"
- [ ] **Expected**: Cannot proceed to next step

#### Too High
- [ ] Delivery Days: 366
- [ ] Tab out or click Next
- [ ] **Expected**: "Delivery days must not exceed 365"
- [ ] **Expected**: Cannot proceed to next step

### Test Case 5: Category Validation

#### No Category Selected
- [ ] Navigate to Step 2
- [ ] Do not select a category
- [ ] Try to type in skills input
- [ ] **Expected**: Skills input is disabled
- [ ] **Expected**: Message "Please select a category first"
- [ ] Try to click Next
- [ ] **Expected**: Cannot proceed (or error message)

### Expected Results
✅ All validation errors display correctly  
✅ Form submission blocked for invalid data  
✅ Error messages are user-friendly  
✅ Fields highlighted when invalid  

---

## Test 14.3: Category and Skill Selection ✓

### Test Case 1: Skills Disabled Without Category
- [ ] Navigate to Step 2
- [ ] Verify skills input field is **disabled**
- [ ] Verify placeholder or message: "Please select a category first"
- [ ] Try to click on skills input
- [ ] **Expected**: Input remains disabled

### Test Case 2: Skills Load After Category Selection
- [ ] Select any category (e.g., "Web Development")
- [ ] **Expected**: Loading indicator appears in skills section
- [ ] **Expected**: Skills input becomes enabled after loading
- [ ] **Expected**: Skills data loads successfully
- [ ] **Check Network Tab**: GET /categories/:slug/skills request
- [ ] **Expected**: Response status 200

### Test Case 3: Skill Filtering - Single Character
- [ ] Type "R" in skills input
- [ ] **Expected**: Dropdown shows skills containing "R"
- [ ] **Expected**: Examples: "React", "Ruby", "Rust", "Redux"
- [ ] **Expected**: Maximum 10 recommendations shown
- [ ] **Expected**: Case-insensitive matching

### Test Case 4: Skill Filtering - Multiple Characters
- [ ] Type "Rea" in skills input
- [ ] **Expected**: Dropdown narrows to "React", "React Native"
- [ ] Type "React"
- [ ] **Expected**: Dropdown shows only "React" and "React Native"

### Test Case 5: Skill Selection
- [ ] Click on "React" from dropdown
- [ ] **Expected**: "React" appears as a chip/badge
- [ ] **Expected**: "React" removed from dropdown
- [ ] **Expected**: Input field clears
- [ ] Select another skill "Node.js"
- [ ] **Expected**: Both skills appear as chips

### Test Case 6: Custom Skill Addition
- [ ] Type "CustomSkillTest123" in skills input
- [ ] **Expected**: "No matching skills" message appears
- [ ] **Expected**: "Press Enter to add as custom skill" message appears
- [ ] Press Enter
- [ ] **Expected**: "CustomSkillTest123" added as chip
- [ ] **Expected**: Chip has same styling as API skills

### Test Case 7: Duplicate Prevention
- [ ] Try to add "React" again (already selected)
- [ ] **Expected**: "React" does not appear in dropdown
- [ ] Type "react" (lowercase)
- [ ] **Expected**: Still not in dropdown (case-insensitive)

### Test Case 8: Skill Removal
- [ ] Click X button on "React" chip
- [ ] **Expected**: "React" removed from selected skills
- [ ] **Expected**: "React" appears in dropdown again when typing "R"

### Expected Results
✅ Category-first logic enforced  
✅ Skills load after category selection  
✅ Filtering works case-insensitively  
✅ Custom skills can be added  
✅ No duplicate skills allowed  
✅ Skills can be removed  

---

## Test 14.4: API Error Scenarios ✓

### Test Case 1: Invalid Category ID
- [ ] Open browser console
- [ ] Fill form to Step 4
- [ ] In console, modify formData: `formData.categoryId = "invalid-uuid"`
- [ ] Click Submit
- [ ] **Check Network Tab**: POST /projects request
- [ ] **Expected**: Response status 400
- [ ] **Expected**: Error message displays
- [ ] **Expected**: Message mentions validation error

### Test Case 2: Expired Token
- [ ] Login as client
- [ ] Start filling form
- [ ] Open Application tab → Local Storage
- [ ] Delete or modify auth token
- [ ] Try to submit form or make API call
- [ ] **Expected**: 401 error detected
- [ ] **Expected**: Form data saved to localStorage
- [ ] **Expected**: Redirect to /auth
- [ ] Login again
- [ ] **Expected**: Form data restored

### Test Case 3: Network Disconnected
- [ ] Fill form completely
- [ ] Open DevTools → Network tab
- [ ] Enable "Offline" mode (throttling dropdown)
- [ ] Click Submit
- [ ] **Expected**: Network error message
- [ ] **Expected**: "Network error. Please check your connection"
- [ ] **Expected**: Retry button or option available
- [ ] Disable offline mode
- [ ] Click retry
- [ ] **Expected**: Form submits successfully

### Test Case 4: Freelancer Authorization
- [ ] Logout
- [ ] Login as **freelancer** account
- [ ] Navigate to /client/projects/post-project
- [ ] **Expected**: Error message displays
- [ ] **Expected**: "Only clients can post projects"
- [ ] **Expected**: Link to switch account or go back

### Test Case 5: Server Error (500)
- [ ] Stop backend API server
- [ ] Fill form completely
- [ ] Click Submit
- [ ] **Check Network Tab**: POST /projects request fails
- [ ] **Expected**: Error message displays
- [ ] **Expected**: "Server error. Please try again later"
- [ ] **Expected**: Retry button available
- [ ] Start backend server
- [ ] Click retry
- [ ] **Expected**: Form submits successfully

### Test Case 6: Resource Not Found (404)
- [ ] Manually trigger 404 (modify API endpoint in code temporarily)
- [ ] Try to fetch categories or skills
- [ ] **Expected**: "Resource not found" message
- [ ] **Expected**: Retry option available

### Expected Results
✅ All error scenarios handled gracefully  
✅ User-friendly error messages  
✅ Retry options where appropriate  
✅ Form data preserved on auth errors  
✅ No sensitive information in errors  

---

## Test 14.5: Loading States ✓

### Test Case 1: Categories Loading
- [ ] Navigate to Step 2 (Categories & Skills)
- [ ] **Expected**: Loading skeleton in category dropdown
- [ ] **Expected**: Dropdown is disabled during loading
- [ ] **Expected**: Loading indicator visible
- [ ] Wait for categories to load
- [ ] **Expected**: Loading indicator disappears
- [ ] **Expected**: Dropdown becomes enabled
- [ ] **Expected**: Categories populate dropdown

### Test Case 2: Skills Loading
- [ ] Select a category
- [ ] **Expected**: Loading indicator appears in skills section
- [ ] **Expected**: Skills input is disabled during loading
- [ ] **Expected**: "Loading skills..." or similar message
- [ ] Wait for skills to load
- [ ] **Expected**: Loading indicator disappears
- [ ] **Expected**: Skills input becomes enabled

### Test Case 3: Upgrades Loading
- [ ] Navigate to Step 3 (Upgrades)
- [ ] **Expected**: Loading skeleton for upgrade cards
- [ ] **Expected**: Cards are not clickable during loading
- [ ] **Expected**: Loading animation visible
- [ ] Wait for upgrades to load
- [ ] **Expected**: Loading skeleton disappears
- [ ] **Expected**: Upgrade cards become clickable

### Test Case 4: Form Submission Loading
- [ ] Fill form completely
- [ ] Navigate to Step 4
- [ ] Click "Submit Project"
- [ ] **Expected**: Submit button text changes to "Submitting..."
- [ ] **Expected**: Submit button is disabled
- [ ] **Expected**: Loading spinner on button (if implemented)
- [ ] **Expected**: Cannot click button again
- [ ] Wait for submission to complete
- [ ] **Expected**: Success screen appears

### Test Case 5: Form Navigation During Loading
- [ ] Start any loading operation (e.g., select category)
- [ ] Try to click "Next" button
- [ ] **Expected**: Button is disabled
- [ ] Try to click "Previous" button
- [ ] **Expected**: Button is disabled
- [ ] Try to click step indicators
- [ ] **Expected**: Navigation is blocked
- [ ] Wait for loading to complete
- [ ] **Expected**: Navigation buttons become enabled

### Test Case 6: Multiple Concurrent Loading States
- [ ] Navigate to Step 2
- [ ] Quickly select category and try to type in skills
- [ ] **Expected**: Skills input remains disabled until loading completes
- [ ] **Expected**: No race conditions or errors

### Expected Results
✅ Loading indicators appear for all async operations  
✅ Interactive elements disabled during loading  
✅ Form navigation blocked during operations  
✅ Loading states clear after completion  
✅ No flickering or UI jumps  

---

## Test 14.6: Authentication Scenarios ✓

### Test Case 1: Non-Authenticated User
- [ ] Logout or clear all cookies/localStorage
- [ ] Navigate directly to /client/projects/post-project
- [ ] **Expected**: Immediate redirect to /auth
- [ ] **Expected**: Form does not load
- [ ] **Expected**: No API calls made

### Test Case 2: Freelancer Access Denied
- [ ] Logout
- [ ] Login with **freelancer** account
- [ ] Navigate to /client/projects/post-project
- [ ] **Expected**: Page loads but shows error
- [ ] **Expected**: "Only clients can post projects" message
- [ ] **Expected**: Link to switch account or dashboard
- [ ] **Expected**: Form is not accessible

### Test Case 3: Client Access Granted
- [ ] Logout
- [ ] Login with **client** account
- [ ] Navigate to /client/projects/post-project
- [ ] **Expected**: Form loads successfully
- [ ] **Expected**: All steps accessible
- [ ] **Expected**: Can fill and submit form

### Test Case 4: Token Expiration During Form Filling
- [ ] Login as client
- [ ] Start filling form (Step 1)
- [ ] Fill some fields with valid data
- [ ] Open Application tab → Local Storage
- [ ] Manually delete or modify auth token
- [ ] Try to navigate to Step 2 or make API call
- [ ] **Expected**: 401 error detected
- [ ] **Expected**: Form data saved to localStorage (key: "savedProjectFormData" or similar)
- [ ] **Expected**: Redirect to /auth
- [ ] **Check localStorage**: Verify form data is saved
- [ ] Login again with client credentials
- [ ] Navigate back to /client/projects/post-project
- [ ] **Expected**: Form data is restored
- [ ] **Expected**: Previously filled fields are populated
- [ ] Complete and submit form
- [ ] **Expected**: Submission succeeds
- [ ] **Expected**: Saved form data is cleared from localStorage

### Test Case 5: Token Refresh Success
- [ ] Login as client
- [ ] Fill form partially
- [ ] Wait for token to near expiration (if auto-refresh implemented)
- [ ] Make an API call (e.g., select category)
- [ ] **Expected**: Token refresh happens automatically
- [ ] **Expected**: API call succeeds
- [ ] **Expected**: No redirect to login
- [ ] **Expected**: Form state preserved

### Test Case 6: Session Timeout
- [ ] Login as client
- [ ] Start filling form
- [ ] Wait for session timeout (or simulate)
- [ ] Try to submit form
- [ ] **Expected**: Session expired message
- [ ] **Expected**: Form data saved
- [ ] **Expected**: Redirect to login
- [ ] Login again
- [ ] **Expected**: Form data restored

### Expected Results
✅ Non-authenticated users redirected  
✅ Freelancers blocked with clear message  
✅ Clients can access form  
✅ Form data persists across auth flows  
✅ Token refresh works seamlessly  
✅ Session timeout handled gracefully  

---

## Post-Testing Verification

### Console Errors
- [ ] Open Console tab
- [ ] Review all messages
- [ ] **Expected**: No red errors
- [ ] **Expected**: No unhandled promise rejections
- [ ] **Expected**: Only expected warnings (if any)

### Network Requests
- [ ] Review all API calls in Network tab
- [ ] **Expected**: All requests have proper Authorization headers
- [ ] **Expected**: All successful requests return 200/201
- [ ] **Expected**: Error requests return appropriate status codes
- [ ] **Expected**: Request/response payloads match API schema

### LocalStorage
- [ ] Open Application tab → Local Storage
- [ ] **Expected**: Auth tokens stored correctly
- [ ] **Expected**: Form data cleared after successful submission
- [ ] **Expected**: Form data saved on auth errors
- [ ] **Expected**: No sensitive data stored in plain text

### Performance
- [ ] Check page load time
- [ ] Check API response times
- [ ] Check form interaction responsiveness
- [ ] **Expected**: No significant delays
- [ ] **Expected**: Smooth user experience

---

## Test Results Summary

### Test 14.1: Complete Form Flow
- **Status**: ⬜ Pass / ⬜ Fail
- **Notes**: 

### Test 14.2: Validation Errors
- **Status**: ⬜ Pass / ⬜ Fail
- **Notes**: 

### Test 14.3: Category and Skill Selection
- **Status**: ⬜ Pass / ⬜ Fail
- **Notes**: 

### Test 14.4: API Error Scenarios
- **Status**: ⬜ Pass / ⬜ Fail
- **Notes**: 

### Test 14.5: Loading States
- **Status**: ⬜ Pass / ⬜ Fail
- **Notes**: 

### Test 14.6: Authentication Scenarios
- **Status**: ⬜ Pass / ⬜ Fail
- **Notes**: 

---

## Issues Found

### Critical Issues
1. 
2. 
3. 

### Minor Issues
1. 
2. 
3. 

### Improvements Needed
1. 
2. 
3. 

---

## Sign-Off

- **Tester Name**: _______________
- **Date**: _______________
- **Overall Status**: ⬜ Pass / ⬜ Fail
- **Ready for Production**: ⬜ Yes / ⬜ No

