# Service Post Feature - Frontend Documentation

## Overview

The Service Post feature enables freelancers to create and publish service offerings on the JuanWork platform. This feature provides a 4-step wizard form for creating services with comprehensive validation, real-time feedback, and seamless API integration.

**Status:** ✅ Production Ready (MVP)  
**Version:** 1.0  
**Last Updated:** January 9, 2026

---

## Table of Contents

1. [Feature Summary](#feature-summary)
2. [Architecture](#architecture)
3. [Implementation Details](#implementation-details)
4. [API Integration](#api-integration)
5. [Validation](#validation)
6. [Testing](#testing)
7. [Usage Guide](#usage-guide)
8. [Troubleshooting](#troubleshooting)

---

## Feature Summary

### What It Does

Allows freelancers to create service offerings with:
- **Step 1:** Basic service details (name, description, payment type, experience level, budget, delivery days)
- **Step 2:** Category and skills selection (with custom skills support)
- **Step 3:** Optional upgrade selection (Featured, Urgent, NDA, etc.)
- **Step 4:** Preview and submit

### Key Features

✅ **4-Step Wizard Interface** - Intuitive multi-step form with progress tracking  
✅ **Real-Time Validation** - Zod schemas with inline error messages  
✅ **Conditional Fields** - Delivery days shown only for fixed-price services  
✅ **File Upload** - Support for up to 5 files (25MB total)  
✅ **Custom Skills** - Create new skills on-the-fly  
✅ **Type Safety** - Full TypeScript with Zod validation  
✅ **Loading States** - Skeleton loaders and spinners  
✅ **Error Handling** - Comprehensive error messages with retry capability  

---

## Architecture

### File Structure

```
juanwork-frontend/src/
├── app/freelancer/services/post-service/
│   └── page.tsx                          # Main form container
├── features/services/
│   ├── schema/
│   │   ├── service-post.schema.ts        # API types & Zod validation
│   │   └── service-form.schema.ts        # Form types & validation
│   ├── actions/
│   │   └── service-post.actions.ts       # Server actions (API calls)
│   ├── components/
│   │   ├── step-1-basic-details.tsx      # Step 1 component
│   │   ├── step-2-categories-skills.tsx  # Step 2 component
│   │   ├── step-3-upgrades.tsx           # Step 3 component
│   │   └── step-4-preview.tsx            # Step 4 component
│   ├── utils/
│   │   └── service-form-mapper.ts        # Form to API mapper
│   └── hooks/
│       └── use-service-form-data.ts      # Form state hook
```

### Component Hierarchy

```
ServicePostPage (page.tsx)
├── Step1BasicDetails
├── Step2CategoriesSkills
├── Step3Upgrades
└── Step4Preview
```

### Data Flow

```
User Input → Form State → Validation → API Mapper → Server Action → Backend API
                ↓                                                        ↓
         Error Display ←─────────────────────────────────────── Response
```

---

## Implementation Details

### 1. Main Form Container (`page.tsx`)

**Location:** `src/app/freelancer/services/post-service/page.tsx`

**Responsibilities:**
- Manages form state across all steps
- Handles step navigation (Next/Previous)
- Validates data before step transitions
- Submits form to backend API
- Handles success/error states

**Key State:**
```typescript
const [currentStep, setCurrentStep] = useState(1); // 1-4
const [formData, setFormData] = useState<ServiceFormData>(initialFormData);
const [isSubmitting, setIsSubmitting] = useState(false);
const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
```

**Key Methods:**
- `handleNext()` - Validates current step and advances
- `handlePrevious()` - Returns to previous step
- `handleSubmit()` - Maps form data and submits to API
- `updateFormData()` - Updates form state

### 2. Step 1: Basic Details

**Location:** `src/features/services/components/step-1-basic-details.tsx`

**Fields:**
- Service Name (10-200 chars, required)
- Description (50-5000 chars, required)
- Payment Type (dropdown: Fixed Price / Hourly Rate, required)
- Experience Level (dropdown: Beginner / Intermediate / Expert, required)
- Delivery Days (1-365, conditional on Fixed Price, required for fixed)
- Budget Min/Max (PHP, required, min <= max)
- File Attachments (optional, max 5 files, 25MB total)

**Validation:**
- Real-time validation on blur
- Character counters for text fields
- Conditional validation for delivery days
- File size and count validation

**Layout:**
```
┌─────────────────────────────────────┐
│ Service Name                        │
├─────────────────────────────────────┤
│ Description                         │
├──────────────────┬──────────────────┤
│ Payment Type     │ Experience Level │
├──────────────────┴──────────────────┤
│ Delivery Days (conditional)         │
├──────────────────┬──────────────────┤
│ Budget Min       │ Budget Max       │
├─────────────────────────────────────┤
│ File Upload                         │
└─────────────────────────────────────┘
```

### 3. Step 2: Categories & Skills

**Location:** `src/features/services/components/step-2-categories-skills.tsx`

**Features:**
- Category dropdown (fetched from API)
- Skills multi-select (fetched based on category)
- Custom skill input with add button
- Selected skills displayed as chips/tags
- Loading states for API calls

**Validation:**
- At least 1 skill required
- Maximum 20 skills allowed
- Custom skill names cannot be empty

### 4. Step 3: Upgrades

**Location:** `src/features/services/components/step-3-upgrades.tsx`

**Features:**
- Checkbox list of available upgrades
- Price display for each upgrade
- Dynamic total cost calculation
- Loading state while fetching upgrades

**Available Upgrades:**
- Featured (₱11.19)
- Urgent (₱11.19)
- NDA (₱24.63)
- IP Agreement (₱24.63)
- Private (₱24.63)
- Sealed (₱11.19)

### 5. Step 4: Preview & Submit

**Location:** `src/features/services/components/step-4-preview.tsx`

**Features:**
- Read-only preview of all form data
- Edit buttons for each section
- Submit button with loading state
- Success/error message display
- Redirect on successful submission

---

## API Integration

### Server Actions

**Location:** `src/features/services/actions/service-post.actions.ts`

#### Available Actions

```typescript
// Fetch all active categories
getAllCategories(): Promise<Category[]>

// Fetch skills for a specific category
getSkillsByCategory(categoryId: string): Promise<Skill[]>

// Fetch all active upgrade types
getAllUpgradeTypes(): Promise<UpgradeType[]>

// Create a new service
createService(data: CreateServiceRequest): Promise<CreateServiceResponse>
```

### API Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/categories` | Get all active categories | No |
| `GET` | `/categories/:id/skills` | Get skills for category | No |
| `GET` | `/upgrade-types` | Get all upgrade types | No |
| `POST` | `/services` | Create new service | Yes (Freelancer) |
| `GET` | `/services/:id` | Get service by ID | No |

### Request/Response Types

**Create Service Request:**
```typescript
interface CreateServiceRequest {
  name: string;                    // 10-200 chars
  description: string;             // 50-5000 chars
  categoryId: string;              // UUID
  paymentType: 'fixed' | 'hourly';
  experienceLevel: 'beginner' | 'intermediate' | 'expert';
  budgetMin: number;               // > 0
  budgetMax: number;               // >= budgetMin
  deliveryDays: number;            // 1-365 for fixed, 0 for hourly
  skills?: string[];               // Existing skill UUIDs
  customSkills?: string[];         // New skill names
  upgradeTypeIds?: string[];       // Upgrade UUIDs
}
```

**Create Service Response:**
```typescript
interface CreateServiceResponse {
  id: string;
  name: string;
  status: string;
  createdAt: string;
}
```

### Error Handling

The API integration handles the following error codes:

- **400 Bad Request** - Validation errors (displays specific field errors)
- **401 Unauthorized** - Redirects to login page
- **403 Forbidden** - "You don't have permission to create services"
- **404 Not Found** - "Resource not found"
- **500 Server Error** - "Something went wrong. Please try again later."

---

## Validation

### Frontend Validation (Zod)

**Location:** `src/features/services/schema/service-form.schema.ts`

#### Service Name
```typescript
z.string()
  .min(10, "Service name must be at least 10 characters")
  .max(200, "Service name must not exceed 200 characters")
```

#### Description
```typescript
z.string()
  .min(50, "Description must be at least 50 characters")
  .max(5000, "Description must not exceed 5000 characters")
```

#### Budget
```typescript
z.object({
  min: z.number().positive("Minimum budget must be greater than 0"),
  max: z.number().positive("Maximum budget must be greater than 0")
}).refine(data => data.min <= data.max, {
  message: "Minimum budget must be less than or equal to maximum budget"
})
```

#### Delivery Days (Conditional)
```typescript
// For fixed-price services
z.number()
  .min(1, "Delivery days must be at least 1")
  .max(365, "Delivery days must not exceed 365")

// For hourly services
z.number().optional() // or 0
```

### Validation Timing

- **On Blur** - Individual field validation
- **On Next** - Current step validation
- **On Submit** - Complete form validation

---

## Testing

### Test Coverage

✅ **Component Verification** - All components import successfully  
✅ **Form State Management** - Data persists across steps  
✅ **Validation Logic** - All validation rules tested  
✅ **API Integration** - Server actions tested  
✅ **Error Handling** - All error scenarios covered  

### Manual Testing Checklist

#### Step 1: Basic Details
- [ ] Enter service name < 10 chars → See error
- [ ] Enter service name > 200 chars → See error
- [ ] Enter valid service name → No error
- [ ] Enter description < 50 chars → See error
- [ ] Enter description > 5000 chars → See error
- [ ] Select payment type 'Fixed Price' → Delivery days field appears
- [ ] Select payment type 'Hourly Rate' → Delivery days field hidden
- [ ] Enter budget min > budget max → See error
- [ ] Enter budget min <= budget max → No error
- [ ] Upload > 5 files → See error
- [ ] Upload <= 5 files → No error

#### Step 2: Categories & Skills
- [ ] Categories load on page load
- [ ] Select category → Skills load
- [ ] Select < 1 skill → See error on Next
- [ ] Select > 20 skills → See error
- [ ] Add custom skill → Appears in list
- [ ] Add empty custom skill → See error

#### Step 3: Upgrades
- [ ] Upgrades load on page load
- [ ] Select upgrades → Total cost updates
- [ ] Deselect upgrades → Total cost updates

#### Step 4: Preview
- [ ] All entered data displays correctly
- [ ] Click edit → Navigate to that step
- [ ] Click submit with valid data → Service created
- [ ] Successful submission → Redirect to service detail page

---

## Usage Guide

### For Developers

#### Adding a New Field

1. **Update Schema** (`service-form.schema.ts`):
```typescript
export interface ServiceFormData {
  // ... existing fields
  newField: string;
}

export const newFieldSchema = z.string().min(1);
```

2. **Update Component** (e.g., `step-1-basic-details.tsx`):
```typescript
<Input
  value={formData.newField}
  onChange={(e) => onUpdate({ newField: e.target.value })}
/>
```

3. **Update Mapper** (`service-form-mapper.ts`):
```typescript
export const mapFormDataToApiRequest = (formData: ServiceFormData) => ({
  // ... existing mappings
  newField: formData.newField,
});
```

#### Customizing Validation

Edit the Zod schemas in `service-form.schema.ts`:

```typescript
export const customValidation = z.string()
  .min(5, "Custom error message")
  .max(100)
  .regex(/pattern/, "Must match pattern");
```

### For Users

#### Creating a Service

1. **Navigate** to `/freelancer/services/post-service`
2. **Fill Step 1** - Enter service details
3. **Fill Step 2** - Select category and skills
4. **Fill Step 3** - Choose optional upgrades
5. **Review Step 4** - Preview and submit

#### Tips

- Use descriptive service names (e.g., "I will build a modern e-commerce website")
- Write detailed descriptions (minimum 50 characters)
- Select relevant skills to improve discoverability
- Consider adding upgrades for better visibility

---

## Troubleshooting

### Common Issues

#### Issue: "Service name must be at least 10 characters"
**Solution:** Enter a more descriptive service name (minimum 10 characters)

#### Issue: "Delivery days field not showing"
**Solution:** Select "Fixed Price" as payment type

#### Issue: "Cannot upload file"
**Solution:** 
- Check file size (max 25MB total)
- Check file count (max 5 files)
- Ensure file type is supported (PDF, DOC, TXT, Images, ZIP)

#### Issue: "Skills not loading"
**Solution:** 
- Ensure you've selected a category first
- Check internet connection
- Refresh the page

#### Issue: Form submission fails
**Solution:**
- Check all required fields are filled
- Ensure you're logged in as a freelancer
- Check validation errors displayed on the form
- Try again after a few moments

### Debug Mode

To enable debug logging, add to browser console:
```javascript
localStorage.setItem('DEBUG_SERVICE_POST', 'true');
```

---

## Technical Notes

### Performance Optimizations

- **Lazy Loading** - Components loaded on demand
- **Debounced Validation** - Reduces validation calls
- **Memoized Calculations** - Upgrade cost calculation cached
- **Optimistic Updates** - UI updates before API confirmation

### Accessibility

- **ARIA Labels** - All form fields have proper labels
- **Keyboard Navigation** - Full keyboard support
- **Screen Reader Support** - Semantic HTML and ARIA attributes
- **Focus Management** - Proper focus handling on step changes

### Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

---

## Future Enhancements

### Planned Features

1. **Service Templates** - Save and reuse service configurations
2. **Draft Auto-Save** - Automatically save progress
3. **Bulk Upload** - Upload multiple services at once
4. **AI Suggestions** - AI-powered service description suggestions
5. **Analytics** - Track service views and conversions

### Optional Features (Not in MVP)

- Update service
- Delete service
- List services with filters
- Service search functionality

---

## Related Documentation

- [Backend API Documentation](../../juanwork-api/docs/features/SERVICE-POST.md)
- [Testing Guide](../TESTING.md)
- [Deployment Guide](../DEPLOYMENT.md)

---

## Support

For issues or questions:
1. Check this documentation
2. Review the [Troubleshooting](#troubleshooting) section
3. Check the verification report (`.agent/task-20-verification.md`)
4. Contact the development team

---

**Last Updated:** January 9, 2026  
**Feature Status:** ✅ Production Ready (MVP)  
**Version:** 1.0
