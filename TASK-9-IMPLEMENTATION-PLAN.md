# Task 9 Implementation Plan: Update Step 3 Component (Upgrades)

## Confidence Level: 9/10
This task is straightforward - we're replacing mock data with API data using the already-implemented hook and utilities.

## Current State Analysis

### Existing Code
- `step-3-upgrades.tsx` currently uses mock data from `projectUpgrades` array
- Uses `calculateTotalUpgradeCost` from `post-project-data.ts` which works with mock data
- Has proper UI for displaying upgrades with badges, descriptions, and prices
- Handles selection/deselection of upgrades
- Shows "SOLD OUT" badge for unavailable upgrades

### Available Resources
- `useProjectFormData` hook - already implemented, provides `upgradeTypes`, `isLoadingUpgrades`, `errorUpgrades`
- `calculateTotalUpgradeCost` in `project-form-mapper.ts` - works with API data
- `UpgradeType` interface from `project-post.schema.ts`
- API returns: `id`, `name`, `slug`, `description`, `basePrice`, `isActive`

## Implementation Steps

### Sub-task 9.1: Update Imports
**Confidence: 10/10**

1. Import `useProjectFormData` hook from `../hooks/use-project-form-data`
2. Import `UpgradeType` type from `../schema/project-post.schema`
3. Import `calculateTotalUpgradeCost` from `../utils/project-form-mapper`
4. Remove import of `projectUpgrades` and `calculateTotalUpgradeCost` from old location
5. Keep `formatCurrency` import from `post-project-data.ts` (it's a helper function we're keeping)

### Sub-task 9.2: Integrate Hook
**Confidence: 10/10**

1. Call `useProjectFormData()` at the top of the component
2. Destructure: `upgradeTypes`, `isLoadingUpgrades`, `errorUpgrades`
3. No need to pass `selectedCategorySlug` since upgrades are independent of category

### Sub-task 9.3: Update Upgrade Cards
**Confidence: 9/10**

1. Replace `projectUpgrades.map()` with `upgradeTypes.map()`
2. Update property mappings:
   - `upgrade.price` → `upgrade.basePrice`
   - `upgrade.available` → `upgrade.isActive`
3. Keep the same UI structure (badges, descriptions, checkboxes)
4. Show "SOLD OUT" badge when `!upgrade.isActive`
5. Disable selection when `!upgrade.isActive`

**Note**: The mock data has `badgeColor` property, but API doesn't. We'll need to either:
- Use a default color for all badges
- Create a mapping based on upgrade slug/name
- Use the existing `upgradeIcons` pattern and assign colors dynamically

### Sub-task 9.4: Update Selection Logic
**Confidence: 10/10**

1. Keep existing `handleToggleUpgrade` function (it already works with IDs)
2. Update `totalCost` calculation to use new `calculateTotalUpgradeCost(formData.selectedUpgrades, upgradeTypes)`
3. The function signature is: `calculateTotalUpgradeCost(upgradeIds: string[], upgrades: UpgradeType[]): number`

### Sub-task 9.5: Handle Loading and Error States
**Confidence: 9/10**

1. Add loading skeleton while `isLoadingUpgrades === true`
   - Show 3-4 skeleton cards with shimmer effect
2. Add error state when `errorUpgrades !== null`
   - Display error message in an Alert component
   - Provide "Retry" button to refetch upgrades
   - Show message: "Upgrades are optional. You can continue without them."
3. Allow form continuation even if upgrades fail (don't block navigation)

## Badge Color Strategy

Since API doesn't provide badge colors, I'll use a mapping based on upgrade slug:
- Default: `bg-gray-600`
- Map common upgrade types to colors (featured → orange, urgent → red, etc.)

## Testing Checklist

- [ ] Upgrades load from API on component mount
- [ ] Loading skeleton displays while fetching
- [ ] Upgrade cards show correct name, description, and price
- [ ] Inactive upgrades show "SOLD OUT" badge and are disabled
- [ ] Selecting/deselecting upgrades updates formData.selectedUpgrades
- [ ] Total cost calculates correctly using API basePrice
- [ ] Error state displays with retry option
- [ ] Form can continue even if upgrades fail to load
- [ ] No console errors or TypeScript errors

## Files to Modify

1. `juanwork-frontend/src/features/projects/components/step-3-upgrades.tsx` - Main component update

## Potential Issues

1. **Badge Colors**: API doesn't provide badge colors - will use slug-based mapping
2. **Icon Mapping**: Current code uses upgrade.id for icon mapping - need to ensure API IDs match or use slug
3. **Error Recovery**: Need to ensure refetch function is available from hook

## Success Criteria

- All mock data replaced with API data
- Loading states work correctly
- Error handling allows form continuation
- Total cost calculation uses API data
- No TypeScript errors
- Component maintains same visual appearance and UX
