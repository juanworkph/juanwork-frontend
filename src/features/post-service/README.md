# Post a Service Feature

This feature allows freelancers to post services through a multi-step form process.

## Structure

```
post-service/
├── components/
│   ├── step-1-basic-details.tsx      # Basic service information
│   ├── step-2-categories-skills.tsx  # Categories and skills selection
│   ├── step-3-upgrades.tsx           # Optional service upgrades
│   ├── step-4-preview.tsx            # Review and preview
│   ├── progress-indicator.tsx         # Step progress indicator
│   └── index.ts
├── schema/
│   ├── post-service-data.ts          # Types and mock data
│   └── index.ts
└── README.md
```

## Features

### Step 1: Basic Details

- Project name (required)
- Description (required)
- Project type: Fixed or Hourly (required)
- Budget range or hourly rate (required)
- File attachments (optional, max 25MB total)

### Step 2: Categories & Skills

- Category selection (required)
- Skills selection with autocomplete recommendations (1-10 skills required)
- Manual skill entry support

### Step 3: Upgrades

- 7 optional upgrade options based on Freelancer.com model:
  - RECRUITER (Sold out)
  - NDA ($24.63)
  - IP AGREEMENT ($24.63)
  - FEATURED ($11.19)
  - URGENT ($11.19)
  - PRIVATE ($24.63)
  - SEALED ($11.19)

### Step 4: Preview

- Complete summary of all entered information
- Cost breakdown including upgrades
- Submit button with loading state

## Usage

```typescript
import PostAServicePage from "@/app/freelancer/services/post-a-service/page";

// The page handles all state management internally
<PostAServicePage />;
```

## Validation

- Step 1: Validates project name, description, and budget
- Step 2: Validates category selection and at least 1 skill
- Step 3: No validation (optional upgrades)
- Step 4: Final validation before submission

## Key Components

- **ServiceFormData**: Main type for form data
- **serviceUpgrades**: Array of available upgrades
- **getSkillRecommendations**: Function to get skill suggestions based on input
- **calculateTotalUpgradeCost**: Helper to calculate total upgrade cost
