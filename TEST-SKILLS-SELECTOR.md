# Quick Test Guide: Skills Selector with MultipleSelector

## Setup (2 minutes)

### 1. Start Servers
```bash
# Terminal 1: Backend
cd juanwork-api
npm run dev

# Terminal 2: Frontend
cd juanwork-frontend
pnpm dev
```

### 2. Open Browser
- Go to http://localhost:3000
- Login as a **client** user
- Navigate to `/client/projects/post-project`

## Test Scenarios

### ✅ Test 1: Category-First Logic (1 minute)

**Steps**:
1. Navigate to Step 2 (Categories & Skills)
2. Look at the skills section

**Expected**:
- ✅ Skills selector is **NOT visible**
- ✅ Alert message: "Please select a category first"

**Steps**:
3. Select a category (e.g., "Web Development")

**Expected**:
- ✅ Loading indicator appears briefly
- ✅ Skills selector becomes **visible**
- ✅ Placeholder: "Type to search skills or create custom ones..."

---

### ✅ Test 2: Skills Loading and Display (1 minute)

**Steps**:
1. Select category "Web Development"
2. Wait for skills to load
3. Click on the skills input field

**Expected**:
- ✅ Dropdown opens automatically
- ✅ Shows list of skills (React, Node.js, JavaScript, etc.)
- ✅ Skills are from the selected category
- ✅ Dropdown has proper styling

---

### ✅ Test 3: Skill Filtering (1 minute)

**Steps**:
1. Click on skills input
2. Type "R"

**Expected**:
- ✅ Dropdown filters to show only skills containing "R"
- ✅ Examples: "React", "Ruby", "Rust", "Redux"
- ✅ Filtering is case-insensitive

**Steps**:
3. Type "Rea" (continue typing)

**Expected**:
- ✅ Dropdown narrows down to "React", "React Native"
- ✅ Real-time filtering works smoothly

**Steps**:
4. Clear the input

**Expected**:
- ✅ All skills appear again

---

### ✅ Test 4: Skill Selection (1 minute)

**Steps**:
1. Click on skills input
2. Click on "React" from dropdown

**Expected**:
- ✅ "React" appears as a chip/badge below input
- ✅ "React" is removed from dropdown
- ✅ Chip has orange styling (#F45A0B)
- ✅ Chip has X button to remove

**Steps**:
3. Select "Node.js"
4. Select "TypeScript"

**Expected**:
- ✅ All 3 skills show as chips
- ✅ Counter shows "3 / 10 skills added"
- ✅ None of the selected skills appear in dropdown

---

### ✅ Test 5: Custom Skill Creation (1 minute)

**Steps**:
1. Click on skills input
2. Type "MyCustomFramework2024"

**Expected**:
- ✅ Dropdown shows: "Create 'MyCustomFramework2024'"
- ✅ OR shows: "No skills found. Type to create a custom skill."

**Steps**:
3. Press **Enter** or click the Create option

**Expected**:
- ✅ "MyCustomFramework2024" added as a chip
- ✅ Custom skill has same styling as API skills
- ✅ Counter updates: "4 / 10 skills added"

---

### ✅ Test 6: Skill Removal (30 seconds)

**Steps**:
1. Click the **X** button on "React" chip

**Expected**:
- ✅ "React" chip is removed
- ✅ "React" appears in dropdown again
- ✅ Counter updates: "3 / 10 skills added"

---

### ✅ Test 7: Maximum Limit (1 minute)

**Steps**:
1. Add skills until you have 10 total
2. Try to add an 11th skill

**Expected**:
- ✅ Counter shows "10 / 10 skills added"
- ✅ Warning: "Maximum skills reached"
- ✅ Error message: "You can only select up to 10 skills"
- ✅ Cannot add more skills

**Steps**:
3. Remove one skill
4. Try to add another skill

**Expected**:
- ✅ Can add skills again
- ✅ Error message disappears

---

### ✅ Test 8: Category Change (1 minute)

**Steps**:
1. Select category "Web Development"
2. Add 3 skills (React, Node.js, TypeScript)
3. Change category to "Graphic Design"

**Expected**:
- ✅ All skills are **cleared**
- ✅ Counter resets to "0 / 10 skills added"
- ✅ Loading indicator appears
- ✅ New skills load for "Graphic Design"
- ✅ Dropdown shows design-related skills

---

### ✅ Test 9: Keyboard Navigation (1 minute)

**Steps**:
1. Click on skills input
2. Press **Arrow Down** key

**Expected**:
- ✅ First skill is highlighted

**Steps**:
3. Press **Arrow Down** again

**Expected**:
- ✅ Next skill is highlighted

**Steps**:
4. Press **Enter**

**Expected**:
- ✅ Highlighted skill is selected
- ✅ Skill appears as chip

**Steps**:
5. Press **Escape**

**Expected**:
- ✅ Dropdown closes
- ✅ Input loses focus

---

### ✅ Test 10: Error Handling (1 minute)

**Steps**:
1. Stop the backend API server
2. Select a category

**Expected**:
- ✅ Error message appears
- ✅ "Failed to load skills. Please try again."
- ✅ Retry button is visible

**Steps**:
3. Start backend API server
4. Click **Retry** button

**Expected**:
- ✅ Skills load successfully
- ✅ Error message disappears
- ✅ Dropdown shows skills

---

## Visual Checks

### ✅ Styling
- [ ] Skills selector has proper border and padding
- [ ] Dropdown has shadow and proper z-index
- [ ] Chips have orange color (#F45A0B)
- [ ] Hover states work on dropdown items
- [ ] Focus ring appears on input focus

### ✅ Responsive Design
- [ ] Works on desktop (1920x1080)
- [ ] Works on tablet (768px)
- [ ] Works on mobile (375px)

### ✅ Dark Mode
- [ ] Toggle dark mode
- [ ] Skills selector adapts to dark theme
- [ ] Dropdown adapts to dark theme
- [ ] Chips are visible in dark mode

---

## Browser DevTools Checks

### Network Tab
1. Open Network tab
2. Select a category
3. Look for: `GET /categories/web-development/skills`
4. **Expected**: Status 200, response contains skills array

### Console Tab
1. Open Console tab
2. Perform all tests above
3. **Expected**: No red errors
4. **Expected**: No warnings (except React dev warnings)

### Application Tab
1. Open Application → Local Storage
2. Fill form and navigate away
3. **Expected**: Form data is saved (if implemented)

---

## Quick Test Results

| Test | Status | Notes |
|------|--------|-------|
| 1. Category-First Logic | ⬜ Pass / ⬜ Fail | |
| 2. Skills Loading | ⬜ Pass / ⬜ Fail | |
| 3. Skill Filtering | ⬜ Pass / ⬜ Fail | |
| 4. Skill Selection | ⬜ Pass / ⬜ Fail | |
| 5. Custom Skill Creation | ⬜ Pass / ⬜ Fail | |
| 6. Skill Removal | ⬜ Pass / ⬜ Fail | |
| 7. Maximum Limit | ⬜ Pass / ⬜ Fail | |
| 8. Category Change | ⬜ Pass / ⬜ Fail | |
| 9. Keyboard Navigation | ⬜ Pass / ⬜ Fail | |
| 10. Error Handling | ⬜ Pass / ⬜ Fail | |

**Overall Status**: ⬜ PASS / ⬜ FAIL

---

## Common Issues & Solutions

### Issue: Dropdown doesn't open
**Solution**: Click directly on the input field, not the container

### Issue: Skills not loading
**Solution**: 
1. Check backend is running
2. Check Network tab for API call
3. Check category is selected

### Issue: Custom skill not created
**Solution**: 
1. Ensure skill name is 2-50 characters
2. Press Enter or click Create option
3. Check for validation errors

### Issue: Can't remove skill
**Solution**: Click the X button on the chip, not the chip itself

---

## Success Criteria

✅ All 10 tests pass
✅ No console errors
✅ API calls succeed (200 status)
✅ Smooth user experience
✅ Keyboard navigation works
✅ Error handling works

---

**Testing Time**: ~10 minutes
**Confidence Level**: 10/10
