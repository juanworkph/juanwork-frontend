# Task 15: Final Checkpoint - Manual Testing Checklist

**Feature:** Project Post Frontend  
**Test Date:** _____________  
**Tester:** _____________

---

## Pre-Testing Setup

- [ ] Backend API is running on `http://localhost:4000`
- [ ] Frontend dev server is running (`pnpm run dev`)
- [ ] Browser DevTools is open (Network tab visible)
- [ ] Test user accounts ready:
  - [ ] Client account credentials
  - [ ] Freelancer account credentials (for negative testing)

---

## Test Suite 1: API Endpoints ✅

### 1.1 Categories Endpoint
- [ ] Navigate to `/client/projects/post-project`
- [ ] Open Network tab, look for `GET /categories` request
- [ ] Verify response status: 200
- [ ] Verify response contains array of categories
- [ ] Verify each category has: id, name, slug, isActive
- [ ] Verify only active categories display in dropdown

**Expected Result:** Categories load successfully and populate dropdown

---

### 1.2 Skills Endpoint
- [ ] Select a category from dropdown
- [ ] Look for `GET /categories/:slug/skills` request in Network tab
- [ ] Verify response status: 200
- [ ] Verify response contains array of skills
- [ ] Verify each skill has: id, name, slug, categoryId
- [ ] Change category and verify new skills request is made

**Expected Result:** Skills load when category is selected

---

### 1.3 Upgrade Types Endpoint
- [ ] Navigate to Step 3 (Upgrades)
- [ ] Look for `GET /upgrade-types` request in Network tab
- [ ] Verify response status: 200
- [ ] Verify response contains array of upgrade types
- [ ] Verify each upgrade has: id, name, description, basePrice, isActive
- [ ] Verify inactive upgrades show "SOLD OUT" badge

**Expected Result:** Upgrades load and display correctly

---

### 1.4 Create Project Endpoint
- [ ] Fill out all form steps with valid data
- [ ] Click "Submit Project" button
- [ ] Look for `POST /projects` request in Network tab
- [ ] Verify request body contains all required fields:
  - [ ] name (string)
  - [ ] description (string)
  - [ ] categoryId (UUID)
  - [ ] paymentType ('fixed' or 'hourly')
  - [ ] budgetMin (number)
  - [ ] budgetMax (number)
  - [ ] deliveryDays (number)
  - [ ] customSkills (array, optional)
  - [ ] upgradeTypeIds (array, optional)
- [ ] Verify response status: 201
- [ ] Verify response contains project id and name
- [ ] Verify success screen displays

**Expected Result:** Project created successfully

---

## Test Suite 2: Form Validations ✅

### 2.1 Project Name Validation
- [ ] Leave project name empty, try to proceed → Error: "Please enter a project name"
- [ ] Enter 5 characters → Error on blur: "Project name must be at least 10 characters"
- [ ] Enter 10 characters → No error
- [ ] Enter 201 characters → Error on blur: "Project name must not exceed 200 characters"
- [ ] Enter 200 characters → No error

**Expected Result:** Validation works correctly for all cases

---

### 2.2 Description Validation
- [ ] Leave description empty, try to proceed → Error: "Please enter a description"
- [ ] Enter 30 characters → Error on blur: "Description must be at least 50 characters"
- [ ] Enter 50 characters → No error
- [ ] Enter 5001 characters → Error on blur: "Description must not exceed 5000 characters"
- [ ] Enter 5000 characters → No error

**Expected Result:** Validation works correctly for all cases

---

### 2.3 Budget Validation (Fixed Price)
- [ ] Select "Fixed Price" project type
- [ ] Enter min: 100, max: 50 → Error on blur: "Minimum budget cannot be greater than maximum budget"
- [ ] Enter min: 50, max: 100 → No error
- [ ] Enter min: 0 → Error: "Minimum budget must be at least 1"
- [ ] Enter max: 0 → Error: "Maximum budget must be at least 1"

**Expected Result:** Budget validation works correctly

---

### 2.4 Delivery Days Validation
- [ ] Enter 0 days → Error on blur: "Delivery days must be at least 1"
- [ ] Enter 1 day → No error
- [ ] Enter 366 days → Error on blur: "Delivery days must not exceed 365"
- [ ] Enter 365 days → No error

**Expected Result:** Delivery days validation works correctly

---

### 2.5 Category Validation
- [ ] Try to proceed to Step 3 without selecting category → Error: "Please select a category"
- [ ] Select a category → Can proceed

**Expected Result:** Category is required

---

### 2.6 Skills Validation
- [ ] Try to proceed to Step 3 without adding skills → Error: "Please add at least one skill"
- [ ] Add 1 skill → Can proceed
- [ ] Add 10 skills → Counter shows "10 / 10 skills added"
- [ ] Try to add 11th skill → Input disabled, message: "Maximum skills reached"

**Expected Result:** Skills validation works correctly

---

### 2.7 Attachments Optional
- [ ] Leave attachments empty
- [ ] Proceed through all steps
- [ ] Submit form successfully

**Expected Result:** Form submits without attachments

---

## Test Suite 3: Loading States ✅

### 3.1 Categories Loading
- [ ] Refresh page
- [ ] Observe category dropdown area
- [ ] Verify loading skeleton displays
- [ ] Verify skeleton disappears when data loads

**Expected Result:** Loading skeleton visible during fetch

---

### 3.2 Skills Loading
- [ ] Select a category
- [ ] Observe skills input area
- [ ] Verify loading indicator displays
- [ ] Verify "Loading skills..." message shows
- [ ] Verify loading disappears when data loads

**Expected Result:** Loading indicator visible during fetch

---

### 3.3 Upgrades Loading
- [ ] Navigate to Step 3
- [ ] Observe upgrade cards area
- [ ] Verify loading skeleton displays
- [ ] Verify skeleton disappears when data loads

**Expected Result:** Loading skeleton visible during fetch

---

### 3.4 Submit Button Loading
- [ ] Fill form completely
- [ ] Click "Submit Project"
- [ ] Verify button shows "Submitting..." text
- [ ] Verify button shows loading spinner
- [ ] Verify button is disabled during submission
- [ ] Verify button returns to normal after completion

**Expected Result:** Button shows loading state during submission

---

### 3.5 Form Navigation Prevention
- [ ] Start submitting form
- [ ] Try to click "Back" button during submission
- [ ] Verify navigation is prevented

**Expected Result:** Cannot navigate during submission

---

## Test Suite 4: Error Handling ✅

### 4.1 400 Validation Error
- [ ] Submit form with invalid data (e.g., budgetMin > budgetMax)
- [ ] Verify error toast displays with specific validation message
- [ ] Verify form remains on current step
- [ ] Verify user can correct and resubmit

**Expected Result:** Field-specific error message displays

---

### 4.2 401 Unauthorized Error
**Setup:** Manually clear access token from localStorage

- [ ] Fill out form completely
- [ ] Click "Submit Project"
- [ ] Verify error toast: "Your session has expired. Please log in again."
- [ ] Verify form data is saved to localStorage
- [ ] Verify redirect to `/auth` after 1.5 seconds
- [ ] Log in again
- [ ] Navigate back to `/client/projects/post-project`
- [ ] Verify form data is restored

**Expected Result:** Form data persists across login

---

### 4.3 403 Forbidden Error
**Setup:** Log in as freelancer

- [ ] Navigate to `/client/projects/post-project`
- [ ] Verify error screen displays
- [ ] Verify message: "Only clients can post projects"
- [ ] Verify "Go to freelancer Dashboard" button shows
- [ ] Verify "Switch to Client Account" button shows

**Expected Result:** Access denied for non-clients

---

### 4.4 404 Not Found Error
**Setup:** Modify API endpoint to invalid URL

- [ ] Try to load categories
- [ ] Verify error message displays
- [ ] Verify "Retry" button shows
- [ ] Click "Retry" button
- [ ] Verify request is made again

**Expected Result:** Error message with retry option

---

### 4.5 500 Server Error
**Setup:** Stop backend server

- [ ] Try to submit form
- [ ] Verify error toast: "Server error. Please try again later"
- [ ] Verify form remains on current step
- [ ] Restart backend server
- [ ] Verify user can retry submission

**Expected Result:** Generic error message displays

---

### 4.6 Network Error
**Setup:** Disconnect internet or stop backend

- [ ] Try to load categories
- [ ] Verify error message: "Network error. Please check your connection"
- [ ] Verify "Retry" button shows
- [ ] Reconnect internet
- [ ] Click "Retry"
- [ ] Verify data loads successfully

**Expected Result:** Network error message with retry

---

## Test Suite 5: Category-First Logic ✅

### 5.1 Skills Input Disabled
- [ ] Navigate to Step 2
- [ ] Verify skills input is disabled
- [ ] Verify placeholder: "Select a category first"
- [ ] Verify alert message: "Please select a category first to add skills"

**Expected Result:** Skills input disabled without category

---

### 5.2 Skills Input Enabled
- [ ] Select a category
- [ ] Verify skills input becomes enabled
- [ ] Verify placeholder changes to: "Type a skill (e.g. React, Node.js)"
- [ ] Verify alert message disappears

**Expected Result:** Skills input enabled after category selection

---

### 5.3 Category Change Clears Skills
- [ ] Select "Web Development" category
- [ ] Add 3 skills
- [ ] Change category to "Mobile Development"
- [ ] Verify skills array is cleared
- [ ] Verify new skills are fetched for new category

**Expected Result:** Skills cleared when category changes

---

## Test Suite 6: Skill Filtering ✅

### 6.1 Real-time Filtering
- [ ] Select a category
- [ ] Type "r" in skills input
- [ ] Verify recommendations dropdown appears
- [ ] Verify skills containing "r" are shown (e.g., "React", "Ruby", "Rust")
- [ ] Verify maximum 10 recommendations display
- [ ] Type "re"
- [ ] Verify recommendations update to match "re"

**Expected Result:** Filtering works in real-time

---

### 6.2 Case-Insensitive Matching
- [ ] Type "REACT" (uppercase)
- [ ] Verify "React" appears in recommendations
- [ ] Type "react" (lowercase)
- [ ] Verify "React" appears in recommendations

**Expected Result:** Matching is case-insensitive

---

### 6.3 Custom Skill Addition
- [ ] Type "MyCustomSkill123" (non-existent skill)
- [ ] Verify "No matching skills found" message displays
- [ ] Verify "Press Enter to add as custom skill" instruction shows
- [ ] Press Enter
- [ ] Verify skill is added to skills array
- [ ] Verify skill appears as badge

**Expected Result:** Custom skills can be added

---

### 6.4 Custom Skill Validation
- [ ] Type "A" (1 character)
- [ ] Press Enter
- [ ] Verify error: "Skill name must be at least 2 characters"
- [ ] Type 51 characters
- [ ] Press Enter
- [ ] Verify error: "Skill name must not exceed 50 characters"
- [ ] Type "AB" (2 characters)
- [ ] Press Enter
- [ ] Verify skill is added successfully

**Expected Result:** Custom skill validation works

---

### 6.5 Duplicate Prevention
- [ ] Add skill "React"
- [ ] Try to add "React" again
- [ ] Verify error: "This skill is already added"
- [ ] Try to add "react" (lowercase)
- [ ] Verify error: "This skill is already added"

**Expected Result:** Duplicate skills prevented

---

### 6.6 Skill Removal
- [ ] Add 3 skills
- [ ] Click X button on second skill badge
- [ ] Verify skill is removed from array
- [ ] Verify badge disappears
- [ ] Verify remaining skills stay intact

**Expected Result:** Skills can be removed

---

## Test Suite 7: Upgrade Selection ✅

### 7.1 Upgrade Display
- [ ] Navigate to Step 3
- [ ] Verify each upgrade card shows:
  - [ ] Name
  - [ ] Description
  - [ ] Price (formatted as currency)
- [ ] Verify inactive upgrades show "SOLD OUT" badge
- [ ] Verify inactive upgrades cannot be selected

**Expected Result:** Upgrades display correctly

---

### 7.2 Upgrade Selection
- [ ] Click on an active upgrade card
- [ ] Verify card is highlighted/selected
- [ ] Verify upgrade ID is added to selectedUpgrades array
- [ ] Click again to deselect
- [ ] Verify card is unhighlighted
- [ ] Verify upgrade ID is removed from array

**Expected Result:** Upgrades can be selected/deselected

---

### 7.3 Total Cost Calculation
- [ ] Select 2 upgrades (e.g., $10 and $20)
- [ ] Scroll to bottom of page
- [ ] Verify cost summary card displays
- [ ] Verify total shows: "$30.00 USD"
- [ ] Verify count shows: "2 upgrades selected"
- [ ] Deselect one upgrade
- [ ] Verify total updates to: "$10.00 USD"
- [ ] Verify count updates to: "1 upgrade selected"

**Expected Result:** Total cost calculates correctly

---

### 7.4 Upgrades Error Handling
**Setup:** Stop backend server temporarily

- [ ] Navigate to Step 3
- [ ] Verify error message displays
- [ ] Verify "Retry" button shows
- [ ] Verify "Continue without upgrades" option available
- [ ] Click "Next" button
- [ ] Verify can proceed to Step 4 without upgrades

**Expected Result:** Form continues even if upgrades fail

---

## Test Suite 8: Authentication Flow ✅

### 8.1 Non-Authenticated User
**Setup:** Log out completely

- [ ] Navigate to `/client/projects/post-project`
- [ ] Verify redirect to `/auth`
- [ ] Verify toast message: "Please log in to post a project"

**Expected Result:** Redirects to login

---

### 8.2 Freelancer Access
**Setup:** Log in as freelancer

- [ ] Navigate to `/client/projects/post-project`
- [ ] Verify error screen displays
- [ ] Verify message: "Only clients can post projects"
- [ ] Verify current role displays: "freelancer"
- [ ] Verify "Go to freelancer Dashboard" button works
- [ ] Verify "Switch to Client Account" button works

**Expected Result:** Access denied with helpful message

---

### 8.3 Client Access
**Setup:** Log in as client

- [ ] Navigate to `/client/projects/post-project`
- [ ] Verify form loads successfully
- [ ] Verify no error messages
- [ ] Verify all steps are accessible

**Expected Result:** Full access granted

---

### 8.4 Token Expiration During Form Filling
**Setup:** Fill form halfway, then manually expire token

- [ ] Fill Steps 1 and 2
- [ ] Open DevTools Console
- [ ] Run: `localStorage.removeItem('accessToken')`
- [ ] Try to proceed to Step 3 (triggers API call)
- [ ] Verify error handling
- [ ] Verify form data is saved
- [ ] Log in again
- [ ] Verify form data is restored

**Expected Result:** Form data persists across token expiration

---

## Test Suite 9: Success Flow ✅

### 9.1 Success Screen Display
- [ ] Complete and submit form successfully
- [ ] Verify success screen displays
- [ ] Verify green checkmark icon shows
- [ ] Verify message: "Project Submitted Successfully!"
- [ ] Verify project name displays in message
- [ ] Verify project ID displays
- [ ] Verify descriptive text about next steps

**Expected Result:** Success screen displays correctly

---

### 9.2 Post Another Project
- [ ] Click "Post Another Project" button
- [ ] Verify form resets to Step 1
- [ ] Verify all fields are cleared
- [ ] Verify formData returns to initialFormData
- [ ] Verify can fill and submit new project

**Expected Result:** Form resets completely

---

### 9.3 View My Projects
- [ ] Click "View My Projects" button
- [ ] Verify navigation to `/client/projects/my-projects`
- [ ] Verify newly created project appears in list

**Expected Result:** Navigates to projects list

---

## Test Suite 10: Data Transformation ✅

### 10.1 Field Mapping Verification
**Use Browser DevTools Network tab to inspect POST /projects request body**

- [ ] Fill form with:
  - Project Name: "Test Project"
  - Description: "Test description with at least 50 characters to meet validation requirements"
  - Category: "Web Development"
  - Skills: ["React", "Node.js"]
  - Project Type: "Fixed Price"
  - Budget Min: 500
  - Budget Max: 1000
  - Delivery Days: 14
  - Upgrades: Select 1 upgrade

- [ ] Submit form
- [ ] Inspect request body in Network tab
- [ ] Verify mappings:
  - [ ] `name: "Test Project"` (not projectName)
  - [ ] `description: "Test description..."`
  - [ ] `categoryId: "<UUID>"` (not category name)
  - [ ] `paymentType: "fixed"` (not projectType)
  - [ ] `budgetMin: 500` (number, not string)
  - [ ] `budgetMax: 1000` (number, not string)
  - [ ] `deliveryDays: 14` (number, not string)
  - [ ] `customSkills: ["React", "Node.js"]` (not skills)
  - [ ] `upgradeTypeIds: ["<UUID>"]` (not selectedUpgrades)

**Expected Result:** All fields mapped correctly to API format

---

## Test Suite 11: Mock Data Removal ✅

### 11.1 Code Verification
- [ ] Open `src/features/projects/schema/` directory
- [ ] Verify no `post-project-data.ts` file exists
- [ ] Search codebase for "mockCategories"
- [ ] Verify no results found
- [ ] Search codebase for "mockSkills"
- [ ] Verify no results found
- [ ] Search codebase for "mockUpgrades"
- [ ] Verify no results found

**Expected Result:** No mock data in codebase

---

### 11.2 Runtime Verification
- [ ] Open Browser DevTools Network tab
- [ ] Navigate through all form steps
- [ ] Verify all data comes from API calls:
  - [ ] Categories from `GET /categories`
  - [ ] Skills from `GET /categories/:slug/skills`
  - [ ] Upgrades from `GET /upgrade-types`
- [ ] Verify no hardcoded data displays

**Expected Result:** All data from API

---

## Summary

### Test Results

**Total Tests:** _____ / _____  
**Passed:** _____  
**Failed:** _____  
**Blocked:** _____

### Critical Issues Found
1. _____________________________________
2. _____________________________________
3. _____________________________________

### Minor Issues Found
1. _____________________________________
2. _____________________________________
3. _____________________________________

### Overall Assessment
- [ ] ✅ Ready for Production
- [ ] ⚠️ Minor Issues - Can Deploy with Fixes
- [ ] ❌ Critical Issues - Cannot Deploy

### Tester Notes
_____________________________________________
_____________________________________________
_____________________________________________

---

**Test Completed By:** _____________  
**Date:** _____________  
**Sign-off:** _____________
