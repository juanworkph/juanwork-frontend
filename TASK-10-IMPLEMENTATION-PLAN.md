# Task 10 Implementation Plan: Update Step 4 Component (Preview)

## Confidence Level: 9/10
This task is straightforward - we need to update the preview component to use API types and display the deliveryDays field that was added in previous tasks.

## Current State Analysis

The `step-4-preview.tsx` component currently:
- Uses mock data from `post-project-data.ts` (projectUpgrades, calculateTotalUpgradeCost)
- Imports types from the old schema location
- Does NOT display the `deliveryDays` field
- Uses the old mock upgrade structure with `price` instead of `basePrice`

## Changes Required

### Subtask 10.1: Import types from schemas
1. Remove import from `post-project-data.ts` for types
2. Import `ProjectFormData` from `project-form.schema.ts`
3. Import `UpgradeType` from `project-post.schema.ts`
4. Import `calculateTotalUpgradeCost` from `project-form-mapper.ts`
5. Keep helper functions from `post-project-data.ts` (formatCurrency, formatFileSize)

### Subtask 10.2: Display all form data
1. Add delivery days display in the "Project Details" card
2. Update upgrade display to use API data structure (basePrice instead of price)
3. Pass upgradeTypes array as a prop to calculate costs correctly
4. Ensure all fields are displayed:
   - ✅ Project name
   - ✅ Description
   - ✅ Payment type
   - ✅ Budget range or hourly rate
   - ⚠️ Delivery days (MISSING - needs to be added)
   - ✅ Selected category
   - ✅ Selected skills
   - ✅ Selected upgrades with prices
   - ✅ Total upgrade cost

## Implementation Steps

1. Update imports to use correct schema types
2. Add `upgradeTypes` prop to component interface
3. Add delivery days display in the Project Details card
4. Update upgrade cost calculation to use API data
5. Update upgrade display to use `basePrice` from API
6. Test the component displays all data correctly

## Files to Modify

- `juanwork-frontend/src/features/projects/components/step-4-preview.tsx`

## Requirements Validated

- Requirement 5.1: Display all form data in preview

## Notes

- The component needs to receive `upgradeTypes` from the parent to calculate costs
- We'll need to update the parent component (post-project page) to pass this prop
- The delivery days field is critical and was missing from the original implementation
