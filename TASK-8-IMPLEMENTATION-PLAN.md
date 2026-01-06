# Task 8 Implementation Plan: Update Step 2 Component (Categories & Skills)

## Overview
Update the step-2-categories-skills.tsx component to integrate with the backend API, replacing mock data with real API calls and implementing proper category-first logic with skill filtering.

## Current State Analysis
- Component uses mock data from `post-project-data.ts`
- Has basic skill input and recommendation logic
- Missing category-first validation
- No loading/error states
- No integration with API

## Implementation Steps

### 8.1 Update Imports
**Confidence: 10/10**
- Remove: `categories`, `getSkillRecommendations` from post-project-data
- Add: `useProjectFormData` hook
- Add: `validateCustomSkill`, `isSkillAlreadySelected` from skill-filter
- Add: `Category`, `Skill` types from project-post.schema
- Add: `AlertCircle`, `Loader2`, `RefreshCw` icons from lucide-react
- Add: `Alert`, `AlertDescription` from ui/alert
- Add: `Skeleton` from ui/skeleton

### 8.2 Integrate useProjectFormData Hook
**Confidence: 10/10**
- Call hook with `formData.categorySlug`
- Destructure: categories, skills, loading states, error states
- Destructure: refetchCategories, refetchSkills, filterSkills

### 8.3 Update Category Dropdown
**Confidence: 9/10**
- Replace mock categories with API categories
- Filter to show only active categories
- Show loading skeleton while fetching
- Display error alert if fetch fails
- Add retry button that calls refetchCategories
- Update formData with: category (name), categoryId, categorySlug

### 8.4 Implement Category-First Logic
**Confidence: 10/10**
- Disable skills input when `!formData.category`
- Show helper text: "Please select a category first"
- Enable skills input when category is selected
- Clear skills when category changes
- Trigger skills fetch via hook (automatic via categorySlug)

### 8.5 Implement Skill Filtering
**Confidence: 10/10**
- Add state: `skillQuery` for search input
- Call `filterSkills(skillQuery, formData.skills)` to get recommendations
- Display filtered Skill objects (not strings)
- Show skill.name in recommendations
- Case-insensitive matching (handled by utility)
- Max 10 recommendations (handled by utility)

### 8.6 Implement Custom Skill Addition
**Confidence: 9/10**
- When recommendations.length === 0 and skillQuery.trim()
- Show message: "No matching skills. Press Enter to add as custom skill"
- On Enter key: validate using `validateCustomSkill`
- If valid: add to formData.skills array
- If invalid: show error message
- Clear input after adding

### 8.7 Update Skill Selection UI
**Confidence: 10/10**
- Display formData.skills as Badge chips
- Add X button to each chip
- On click X: remove from formData.skills
- Prevent duplicates using `isSkillAlreadySelected`
- Update formData.skills array on changes

### 8.8 Handle Loading and Error States
**Confidence: 10/10**
- Show Skeleton for category dropdown when isLoadingCategories
- Show Loader2 icon in skills section when isLoadingSkills
- Display Alert with error message for errorCategories
- Display Alert with error message for errorSkills
- Add retry buttons that call refetch functions
- Disable inputs during loading

## Key Changes Summary
1. **API Integration**: Replace all mock data with API calls via hook
2. **Category-First**: Enforce category selection before skills
3. **Smart Filtering**: Use API skills with real-time filtering
4. **Custom Skills**: Allow adding skills not in API
5. **Loading States**: Show skeletons and loaders
6. **Error Handling**: Display errors with retry options
7. **Type Safety**: Use proper TypeScript types throughout

## Testing Checklist
- [ ] Categories load from API on mount
- [ ] Loading skeleton shows while fetching categories
- [ ] Error message shows if categories fail to load
- [ ] Retry button refetches categories
- [ ] Skills input disabled without category
- [ ] Skills load when category selected
- [ ] Skill filtering works (type "R" shows React, Ruby, etc.)
- [ ] Custom skill can be added when no matches
- [ ] Custom skill validation works (2-50 chars)
- [ ] Duplicate skills prevented
- [ ] Skills can be removed via X button
- [ ] Loading indicator shows while fetching skills
- [ ] Error message shows if skills fail to load

## Requirements Validated
- 2.1: Fetch categories from API
- 2.2: Disable skills input without category
- 2.3: Enable skills input when category selected
- 2.4: Fetch skills from API
- 2.5: Filter skills as user types
- 2.6: Case-insensitive matching
- 2.7: Allow custom skills
- 2.9: Show only active categories
- 2.10: Prevent duplicate skills
- 4.7: Disable skills without category
- 4.8: Display helper message
- 6.1: Loading state for categories
- 6.2: Loading state for skills
- 7.1: Error handling with retry
