# Task 7 Implementation Plan: Update Step 1 Component (Basic Details)

## Confidence Level: 9/10
This is a straightforward UI update task with clear requirements and existing validation utilities.

## Overview
Update the Step 1 component to:
1. Import validation functions and schemas
2. Add deliveryDays field
3. Make attachments optional
4. Add real-time validation with error messages

## Current State Analysis
- Step 1 component exists at: `juanwork-frontend/src/features/projects/components/step-1-basic-details.tsx`
- Validation utilities exist at: `juanwork-frontend/src/features/projects/utils/project-form-validator.ts`
- Schemas exist at: `juanwork-frontend/src/features/projects/schema/project-form.schema.ts`
- FormData already has `deliveryDays` field with default value of 7
- Attachments are already marked as "Optional" in the UI

## Sub-task Breakdown

### Sub-task 7.1: Import validation functions and schemas
**What to do:**
- Add imports for validation functions: `validateProjectName`, `validateDescription`, `validateBudget`, `validateDeliveryDays`
- Add imports for schemas: `projectNameSchema`, `descriptionSchema`, `budgetSchema`, `deliveryDaysSchema`

**Files to modify:**
- `juanwork-frontend/src/features/projects/components/step-1-basic-details.tsx`

**Code changes:**
```typescript
import { 
  validateProjectName, 
  validateDescription, 
  validateBudget, 
  validateDeliveryDays 
} from '../utils/project-form-validator';
import {
  projectNameSchema,
  descriptionSchema,
  budgetSchema,
  deliveryDaysSchema,
} from '../schema/project-form.schema';
```

### Sub-task 7.2: Add deliveryDays field to form
**What to do:**
- Add a new input field for delivery days after the budget section
- Set input type to "number"
- Add min="1" and max="365" attributes
- Bind value to `formData.deliveryDays`
- Update formData on change

**Files to modify:**
- `juanwork-frontend/src/features/projects/components/step-1-basic-details.tsx`

**Code changes:**
```typescript
{/* Delivery Days */}
<div className="space-y-2">
  <Label htmlFor="deliveryDays">
    Delivery Days <span className="text-red-500">*</span>
  </Label>
  <Input
    id="deliveryDays"
    type="number"
    min="1"
    max="365"
    value={formData.deliveryDays || ""}
    onChange={(e) => onUpdate({ deliveryDays: Number(e.target.value) })}
    placeholder="7"
    className="focus-visible:ring-[#F45A0B]"
  />
  <p className="text-sm text-gray-500">
    How many days do you need to complete this project? (1-365 days)
  </p>
</div>
```

### Sub-task 7.3: Update attachments field to be optional
**What to do:**
- Verify "Optional" label is present (already exists)
- Ensure no required validation exists for attachments
- Confirm form can progress without attachments

**Files to modify:**
- `juanwork-frontend/src/features/projects/components/step-1-basic-details.tsx`

**Code changes:**
- Already implemented: Label shows "Additional Files (Optional)"
- No changes needed, just verify

### Sub-task 7.4: Add real-time validation
**What to do:**
- Add state for validation errors for each field
- Add onBlur handlers to validate fields when user leaves them
- Display error messages below each field
- Use validation functions from project-form-validator.ts

**Files to modify:**
- `juanwork-frontend/src/features/projects/components/step-1-basic-details.tsx`

**Code changes:**
1. Add state for errors:
```typescript
const [errors, setErrors] = React.useState<{
  projectName?: string;
  description?: string;
  budget?: string;
  deliveryDays?: string;
}>({});
```

2. Add validation handlers:
```typescript
const handleProjectNameBlur = () => {
  const result = validateProjectName(formData.projectName);
  setErrors(prev => ({ ...prev, projectName: result.error }));
};

const handleDescriptionBlur = () => {
  const result = validateDescription(formData.description);
  setErrors(prev => ({ ...prev, description: result.error }));
};

const handleBudgetBlur = () => {
  if (formData.projectType === 'fixed') {
    const result = validateBudget(formData.budget.min, formData.budget.max);
    setErrors(prev => ({ ...prev, budget: result.error }));
  }
};

const handleDeliveryDaysBlur = () => {
  const result = validateDeliveryDays(formData.deliveryDays);
  setErrors(prev => ({ ...prev, deliveryDays: result.error }));
};
```

3. Add onBlur to inputs and display errors:
```typescript
// For each input, add:
onBlur={handleProjectNameBlur}

// After each input, add error display:
{errors.projectName && (
  <p className="text-sm text-red-500">{errors.projectName}</p>
)}
```

## Implementation Order
1. Sub-task 7.1: Import validation functions and schemas
2. Sub-task 7.2: Add deliveryDays field
3. Sub-task 7.3: Verify attachments are optional (already done)
4. Sub-task 7.4: Add real-time validation

## Testing Checklist
- [ ] Validation functions are imported correctly
- [ ] Delivery days field appears in the form
- [ ] Delivery days accepts values 1-365
- [ ] Attachments field shows "Optional" label
- [ ] Form can progress without attachments
- [ ] Project name validation triggers on blur
- [ ] Description validation triggers on blur
- [ ] Budget validation triggers on blur
- [ ] Delivery days validation triggers on blur
- [ ] Error messages display below fields
- [ ] Error messages are user-friendly

## Potential Issues
1. **State management**: Need to ensure validation errors don't interfere with form submission
2. **Budget validation**: Need to handle both fixed and hourly rate scenarios
3. **Error clearing**: Errors should clear when user corrects the input

## Success Criteria
- All validation functions imported and working
- Delivery days field added and functional
- Attachments remain optional
- Real-time validation working on all fields
- Error messages display correctly
- No TypeScript errors
- No runtime errors
