# Changelog

## January 2026

### 🛠️ Fixes & Tech Debt

#### ESLint `any` Type Fixes

Fixed various Typescript linting errors to improve type safety:

- **Project Actions**: Replaced `Promise<any>` with proper `Project` and `ProjectsListResponse` types.
- **Form Validator**: Fix Zod `error.errors` vs `error.issues` mismatch.
- **Frontend**: Fixed `basePrice` type coercion in Upgrades/Preview steps (string vs number).
- Corrected `CreateProjectRequest` interfaces to include optional `skills` array.

#### Payment Fields Refactor

- Unified budget fields: `Hourly` projects now use `budgetMin`/`budgetMax` instead of a separate `hourlyRate` field.
- Improved UX: "Delivery Days" field now smoothly animates in/out based on Project Type (Fixed vs Hourly).

### ✨ New Features

- **Experience Level**: Added strict enum values (`beginner`, `intermediate`, `expert`).
- **Skills Selector**: New `MultipleSelector` component allowing both selection and creation of custom skills.
