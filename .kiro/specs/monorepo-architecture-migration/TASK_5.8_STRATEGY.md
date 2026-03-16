# Task 5.8: Import Path Updates - Strategy

## Overview
Update all import statements across the codebase to reflect new component locations.

## Import Path Changes Required

### 1. Common Components (packages/ui)
**Old Paths:**
- `./components/common/*`
- `../components/common/*`
- `../../components/common/*`

**New Path:**
- `@repo/ui/components/*`

**Files to Update:**
- All files importing GameTemplate, GameWrapper, LoadingSpinner, etc.

### 2. Core Components (packages/ui)
**Old Paths:**
- `./components/core/*`
- `../components/core/*`

**New Path:**
- `@repo/ui/components/*`

**Files to Update:**
- All files importing ErrorBoundary, GameCard, Layout

### 3. Game Engine (packages/game-engine)
**Old Paths:**
- Relative imports to game engine utilities

**New Path:**
- `@repo/game-engine/*`

### 4. Shared Utilities (packages/shared)
**Old Paths:**
- Relative imports to shared utilities

**New Path:**
- `@repo/shared/*`

### 5. Mock Data (packages/mock-data)
**Old Paths:**
- Relative imports to mock data

**New Path:**
- `@repo/mock-data/*`

## Approach

### Phase 1: Update TypeScript Path Mappings
1. Update tsconfig.json in each workspace
2. Add path aliases for @repo/* packages

### Phase 2: Update Imports Systematically
1. Start with packages (game-engine, ui, shared, mock-data)
2. Then update micro-frontends
3. Finally update apps (web, admin, teacher)

### Phase 3: Verification
1. Run TypeScript compiler
2. Check for broken imports
3. Run build to verify

## Status
- [ ] Phase 1: TypeScript path mappings
- [ ] Phase 2: Import updates
- [ ] Phase 3: Verification
