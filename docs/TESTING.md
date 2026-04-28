# Testing Guide

## Overview

This document outlines the manual testing strategy for the JuanWork Frontend, focusing on the Project Submission feature. As we currently rely on manual verification, this guide provides the necessary checklists and procedures.

## Quick Start (Smoke Test)

**Time**: ~15 mins
**Goal**: Verify the "Happy Path" (Create Project -> Success).

1.  **Login**: Use a Client account.
2.  **Navigate**: Go to "Post a Project".
3.  **Step 1 (Basics)**: Fill Project Name, Description, Budget.
    - _Verify_: Validation errors clear as you type.
4.  **Step 2 (Skills)**: Select Category (e.g., Web Dev).
    - _Verify_: Skills load. Select existing skill. Create a custom skill ("MySkill").
5.  **Step 3 (Scope)**: Select Experience Level (e.g., Intermediate).
6.  **Step 4 (Review)**: Submit.
    - _Verify_: Success message/redirect. Check Network tab for 201 Created.

## Detailed Testing Checklist

### 1. Categories & Skills

- **Category Selection**: Changing category should clear selected skills.
- **Skill Search**: Typing "React" should filter existing skills.
- **Custom Skills**:
  - Typing a non-existent skill allows creation.
  - Custom skills are assigned the current category ID.
  - Custom skills generate a valid slug (backend).
- **Limits**: Max 10 skills allowed.

### 2. Experience Level

- **Values**: Beginner, Intermediate, Expert.
- **Default**: Intermediate.
- **Validation**: Field is required.

### 3. Edge Cases & Error Handling

- **401 Unauthorized**: Ensure token is attached (Client Actions fixed this).
- **500 Internal Error**:
  - Duplicate skills: Selecting the same skill twice (UI prevents this).
  - Null Slug: Creating custom skill generates slug automatically.
- **Form Validation**: Trigger all errors by clicking "Next" on empty forms.

## Debugging

### Common Issues

- **Skills not loading**: Check `GET /categories/:slug/skills` in Network tab.
- **401 Error**: Check `localStorage` for `accessToken`. Re-login if needed.

### Useful Commands

- **Restart Backend**: `cd juanwork-api && npm run dev`
- **Restart Frontend**: `cd juanwork-frontend && pnpm dev`
