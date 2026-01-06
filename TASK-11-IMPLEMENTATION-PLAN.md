# Task 11 Implementation Plan: Update Main Page Component (Form Submission)

## Confidence Level: 9/10

This implementation will integrate the existing utilities and actions into the main post-project page to enable full API integration for project submission.

## Current State Analysis

The `post-project/page.tsx` currently has:
- ✅ Multi-step form with state management
- ✅ Basic validation for each step
- ✅ Success screen UI
- ❌ Mock API call (setTimeout simulation)
- ❌ No real API integration
- ❌ No error handling for different HTTP status codes
- ❌ No form data persistence for auth failures
- ❌ No proper validation using Zod schemas

## Available Resources

Already implemented and ready to use:
1. `createProject` action - Server action for API call
2. `mapFormDataToApiRequest` - Data transformation utility
3. `handleApiError` - Error handling utility
4. `createProjectSchema` - Zod validation schema
5. All necessary TypeScript types

## Implementation Steps

### Sub-task 11.1: Import Required Dependencies
**Confidence: 10/10**

Add imports at the top of the file:
```typescript
import { createProject } from "@/features/projects/actions/project-post.actions";
import { mapFormDataToApiRequest } from "@/features/projects/utils/project-form-mapper";
import { handleApiError } from "@/features/projects/utils/project-form-validator";
import { createProjectSchema } from "@/features/projects/schema/project-post.schema";
```

### Sub-task 11.2: Update handleSubmit Function
**Confidence: 9/10**

Replace the mock implementation with real API integration:
1. Transform formData using `mapFormDataToApiRequest`
2. Validate transformed data with `createProjectSchema.parse()`
3. Call `createProject` action with validated data
4. Handle loading state (already exists, just needs proper integration)
5. Catch and handle errors appropriately

Key changes:
- Remove `setTimeout` mock
- Add try-catch for validation errors
- Add try-catch for API errors
- Update loading state management

### Sub-task 11.3: Handle API Success Response
**Confidence: 10/10**

Update success handling:
1. Extract project ID from response
2. Store project name for display (already in formData)
3. Set `isSubmitted` to true (already exists)
4. Display success toast with project name
5. Success screen already implemented - just needs project ID

Changes needed:
- Add state for `createdProjectId`
- Update success screen to use actual project ID
- Update "View My Projects" navigation

### Sub-task 11.4: Handle API Error Responses
**Confidence: 9/10**

Implement comprehensive error handling:
1. Use `handleApiError` utility for user-friendly messages
2. Display errors using toast (already using sonner)
3. Handle specific status codes:
   - 400: Show validation errors
   - 401: Save form data, redirect to login
   - 403: Show "Only clients can create projects"
   - 404: Show "Resource not found"
   - 500: Show generic error with retry option
   - Network: Show connection error

Changes needed:
- Add error state for displaying errors
- Add conditional rendering for error messages
- Add retry functionality

### Sub-task 11.5: Implement Form Data Persistence
**Confidence: 8/10**

Add localStorage persistence for auth failures:
1. Create helper functions:
   - `saveFormDataToStorage(formData)`
   - `restoreFormDataFromStorage()`
   - `clearFormDataFromStorage()`
2. Save form data before redirect on 401
3. Restore form data on component mount
4. Clear saved data after successful submission

Changes needed:
- Add useEffect for restoration on mount
- Add localStorage key constant
- Handle JSON serialization/deserialization
- Handle File objects in attachments (may need special handling)

## Potential Issues & Solutions

### Issue 1: File Attachments in localStorage
**Problem**: File objects cannot be serialized to JSON
**Solution**: 
- Don't persist File objects
- Only persist file metadata (name, size, type)
- User will need to re-upload files after login

### Issue 2: Validation Errors Display
**Problem**: Zod validation errors need to be mapped to specific fields
**Solution**:
- Catch ZodError separately
- Extract field-specific errors
- Display them using toast or inline messages

### Issue 3: Navigation After Success
**Problem**: Hard-coded window.location.href is not ideal
**Solution**:
- Use Next.js router for navigation
- Import and use `useRouter` from 'next/navigation'

## Testing Checklist

After implementation, manually test:
- [ ] Valid form submission succeeds
- [ ] Success screen displays with correct project name
- [ ] "Post Another Project" resets form
- [ ] "View My Projects" navigates correctly
- [ ] Invalid data shows validation errors
- [ ] Network errors show appropriate message
- [ ] 401 errors save form data and redirect
- [ ] Form data restores after login
- [ ] 403 errors show correct message
- [ ] Loading state disables button during submission

## Files to Modify

1. `juanwork-frontend/src/app/client/projects/post-project/page.tsx` - Main implementation

## Estimated Complexity

- **Low**: Imports and basic integration
- **Medium**: Error handling and state management
- **Medium-High**: Form data persistence with localStorage

## Success Criteria

✅ All imports added correctly
✅ handleSubmit uses real API call
✅ Success response handled properly
✅ All error scenarios handled with user-friendly messages
✅ Form data persists across auth failures
✅ No TypeScript errors
✅ No console errors during execution
