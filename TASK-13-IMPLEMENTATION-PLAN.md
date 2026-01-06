# Task 13: Clean Up Mock Data - Implementation Plan

## Overview
Remove all mock data from post-project-data.ts now that API integration is complete. Keep only necessary helper functions and move them to appropriate locations.

## Current State Analysis

### Files to Modify:
1. `src/features/projects/schema/post-project-data.ts` - Main cleanup target
2. `src/features/projects/components/step-1-basic-details.tsx` - Uses formatFileSize
3. `src/features/projects/components/step-3-upgrades.tsx` - Uses formatCurrency
4. `src/features/projects/components/step-4-preview.tsx` - Uses formatCurrency, formatFileSize

### Mock Data to Remove:
- `categories` array (replaced by API call)
- `allSkills` array (replaced by API call)
- `projectUpgrades` array (replaced by API call)
- `getSkillRecommendations` function (replaced by skill-filter.ts)
- `ProjectUpgrade` interface (no longer needed)
- `calculateTotalUpgradeCost` function (already exists in project-form-mapper.ts)

### Code to Keep:
- `formatCurrency` helper function
- `formatFileSize` helper function
- `ProjectFormData` interface (already in project-form.schema.ts - can be removed)
- `initialFormData` constant (already in project-form.schema.ts - can be removed)
- `PostProjectStatus` type (already in project-form.schema.ts - can be removed)

## Implementation Steps

### Step 1: Create utility file for helper functions
Create `src/features/projects/utils/format-helpers.ts` with:
- `formatCurrency` function
- `formatFileSize` function

### Step 2: Update component imports
Update the following files to import from new location:
- `step-1-basic-details.tsx` - Import formatFileSize from utils/format-helpers
- `step-3-upgrades.tsx` - Import formatCurrency from utils/format-helpers
- `step-4-preview.tsx` - Import formatCurrency and formatFileSize from utils/format-helpers

### Step 3: Remove post-project-data.ts
Delete the entire file since all necessary code has been moved

### Step 4: Verify no broken imports
- Run TypeScript compiler to check for errors
- Ensure all components work correctly

## Confidence Level: 10/10
This is a straightforward cleanup task with clear requirements and no complex logic.
