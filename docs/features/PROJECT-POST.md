# Project Post Feature

## Overview

The Project Post feature allows Clients to create new projects. It involves a multi-step wizard, complex validation, and skill selection.

## 1. Project Form Steps

### Step 1: Basic Details & Payment

This step collects the project name, description, and budget details.

- **Payment types**: `Fixed Price` and `Hourly`.
- **Budget Fields**:
  - `budgetMin` and `budgetMax` are used for **both** payment types (Hourly Rate uses the same fields to define a range).
  - Labels update dynamically (e.g., "Minimum Hourly Rate" vs "Minimum Project Budget").
- **Delivery Days**:
  - Visible only for `Fixed Price` projects (smooth animation reveal).
  - Hidden for `Hourly` projects (backend receives value `0`).

### Step 2: Categories & Skills

- See [Skills Selector](#skills-selector--custom-skills) below.

### Step 3: Upgrades

- Selection of optional project upgrades (Featured, Urgent, etc.).

### Step 4: Preview

- Final review before submission.

## 2. Skills Selector & Custom Skills

### Problem

The original implementation had issues with selecting existing skills and intuitively creating generic custom skills.

### Solution

We integrated the `MultipleSelector` component (shadcn-compatible) for an enhanced UX.

- **Category-Driven**: Skills are fetched dynamically based on the selected category.
- **Dual Mode**: Users can select existing skills or type new ones.
- **Backend Handling**:
  - **Existing Skills**: Linked via ID.
  - **Custom Skills**: backend checks if it exists (case-insensitive); if not, creates it with `is_custom=true` and a generated slug.

### Data Flow

1.  Frontend splits input into `skillIds` and `customSkillNames`.
2.  Backend resolves names to IDs (creating new records if needed).
3.  All IDs are linked to the project in a single transaction.

## 3. Experience Level

### Implementation

- **Field**: `experienceLevel`
- **Type**: Enum (`beginner`, `intermediate`, `expert`).
- **Default**: `intermediate`.
- **Validation**: Required field in Step 1 of the wizard.

## 4. Validation & Error Handling

- **Client-Side**: Zod schema validates all steps. First "Next" click reveals all errors.
- **Server-Side**: Joi/Zod validation ensures data integrity.
- **Visuals**: Red borders and character counts provide immediate feedback.
