# Pages

This directory contains top-level page components, one per route in the application.

Each file corresponds to a page in the intake flow. Pages are registered in `src/App.tsx` and are rendered by React Router when the user navigates to the matching path.

## Current Pages

| File | Route | Description |
|------|-------|-------------|
| `Start.tsx` | `/` | Welcome/start page — entry point to the intake flow |

## Adding a New Page

1. Create a new `.tsx` file in this directory (e.g. `MyPage.tsx`).
2. Export a default React component from that file.
3. Import and register the route in `src/App.tsx`.
4. Use the `<BackButton />` component from `src/components/BackButton.tsx` to provide navigation back to the previous step.
