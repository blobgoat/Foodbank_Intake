# Pages

This directory contains every top-level page component — one file per route in the intake flow. Pages are registered in `src/App.tsx` and rendered by React Router when the user navigates to the matching path.

---

## Current Pages

| File | Route | Description |
|---|---|---|
| `Start.tsx` | `/` | Welcome screen — entry point to the intake flow |
| `AccountHolder.tsx` | `/account-holder` | First form page — collects account-holder information |

---

## Architecture Overview

The pages layer is built around three collaborating pieces that together make it easy to add a new form page without touching shared layout code.

### 1. `pages.ts` — the page registry

`pages.ts` is the single source of truth for the page union type and for each page's metadata.

```ts
// The discriminated union of every valid page name.
export type Page = 'Start' | 'AccountHolderInfo';

// The data shape that every form page must supply.
export interface PageAPI {
    headerName: string;          // shown in the section header
    loadbarPercentage: number;   // progress bar fill (0–100)
    infoText: string;            // body copy / notice text
}
```

`Pages.getPageAPI()` is a switch statement that maps the current `Page` to its concrete `PageAPI` object. Registering a new page is as simple as adding a case here.

### 2. `formBase.tsx` — shared form layout

`FormBase` is a thin layout component that receives a `PageAPI` and renders the standard page layout. Every form page delegates to it so the layout stays consistent.

```tsx
const FormBase: React.FC<PageAPI> = (page: PageAPI): React.ReactElement => (
    <SectionHeader title={page.headerName} required={true} />
);
```

As the form grows you can extend `FormBase` to render the progress bar percentage, the info text, and any other shared chrome without touching individual page files.

### 3. Individual page files — e.g. `AccountHolder.tsx`

Each form page file does two things:

1. **Exports a `PageAPI` const** — its own metadata consumed by `formBase` and by `pages.ts`.
2. **Exports a default React component** — the component calls `formBase(YourPageAPI)` for the shared layout, then adds its own form fields below.

```ts
// AccountHolder.tsx
export const AccountHolderAPI: PageAPI = {
    headerName: 'Account Holder',
    loadbarPercentage: 0,
    infoText: translationAPI.getStandardTranslation().p2AccountHolderNotice,
};

const AccountHolder: React.FC = () => formBase(AccountHolderAPI);
export default AccountHolder;
```

`Start.tsx` follows a different pattern because it is not a form page — it has its own full layout and does not use `formBase`.

---

## Reusable Components

All reusable UI lives in `src/components/`. Import from there, never copy-paste styles or logic.

### AppBar (`AppBar.tsx`)
The persistent top bar rendered once in `App.tsx`. Its text and colours come entirely from `translationAPI` and `foodbank_aesthetics.generated.json` — you do not need to touch it when adding pages.

### SectionHeader (`sectionHeader.tsx`)

The section heading rendered by `FormBase`. Accepts:

| Prop | Type | Default | Purpose |
|---|---|---|---|
| `title` | `string` | required | Heading text |
| `required` | `boolean` | `false` | Shows a red `*` |
| `canSkip` | `boolean` | — | Reserved; controls skip availability |
| `onSkip` | `() => void` | — | Custom skip handler |
| `skipLabel` | `string` | — | Override skip button label |
| `cannotSkipText` | `string` | — | Text shown when skipping is disabled |

### Navigation Buttons

All button components share the same prop interface and the same `ButtonBase.css` base styles. They pull their labels from the translation JSON and their colours/sizes from the aesthetics config automatically.


**Common props (all buttons):**

| Prop | Type | Default | Purpose |
|---|---|---|---|
| `to` | `string` | — | React Router path to navigate to on click |
| `onClick` | `() => void` | — | Callback fired before navigation |
| `label` | `string` | translation default | Override displayed text |
| `disabled` | `boolean` | `false` | Disables the button |

All button sizes, colours, and icons are controlled via `foodbank_aesthetics.generated.json`. The `pxToFluid()` utility in `src/utils/utils.ts` converts the authored px values to responsive `clamp()` expressions automatically.

### Shared CSS

`reusableUI.css` (imported by `Start.tsx`) defines two card containers used throughout the app:

- `.card-container` — image/logo card with `fadeIn` animation
- `.card-containerForText` — text + button card with a slightly longer `fadeIn`

Import this file in any page that uses the card layout.

---

## Utilities (`src/utils/utils.ts`)

| Function | Purpose |
|---|---|
| `getBaseButtonVars()` | Returns the CSS custom properties common to every button. Spread into a button's `cssVars` object then add per-button overrides. |
| `toPlainText(raw, foodbankName)` | Strips `* ** ***` markers and substitutes `<name>` — use for `aria-label` attributes alongside `formatTranslations()`. |
| `pxToFluid(pxStr, refWidth, maxFraction)` | Converts an authored px string into a `clamp()` expression for fluid scaling. `refWidth` defaults to `button_scale_reference_width` from aesthetics. |

---

## Content & Theming

Pages should never hard-code text or colours.

- **Text / translations** — use `translationAPI.getStandardTranslation()` (from `modifiable_content/translationAPI`) or import the pre-generated JSON at `modifiable_content/English/english_standard_text.generated.json`.  Pass raw strings through `formatTranslations()` from `server/src/utils/utils` to handle bold markers.
- **Colours, fonts, sizes** — import `modifiable_content/foodbank_aesthetics.generated.json` and read the relevant key. Expose values to CSS via inline CSS custom properties (the `cssVars` pattern used by every component).

---

## Adding a New Form Page

Follow these steps to wire up a new page end-to-end.

**1. Create the page file** — `src/pages/MyPage.tsx`

```tsx
import type { PageAPI } from './pages';
import { translationAPI } from '../../../modifiable_content/translationAPI';
import formBase from './formBase';
import type React from 'react';

export const MyPageAPI: PageAPI = {
    headerName: 'My Section',
    loadbarPercentage: 50,                          // 0–100
    infoText: translationAPI.getStandardTranslation().myPageNotice,
};

const MyPage: React.FC = () => {
    // formBase renders the shared section header.
    // Add your form fields below (or wrap in a fragment).
    return formBase(MyPageAPI);
};

export default MyPage;
```

**2. Register the page name** — `src/pages/pages.ts`

```ts
// Add to the union:
export type Page = 'Start' | 'AccountHolderInfo' | 'MyPage';

// Add to getPageAPI():
case 'MyPage':
    return MyPageAPI;
```

**3. Register the route** — `src/App.tsx`

```tsx
import MyPage from './pages/MyPage';

// Inside <Routes>:
<Route path="/my-page" element={<MyPage />} />
```

**4. Wire up navigation** — in the preceding page, add a `<NextButton to="/my-page" />` (or `<SubmitButton>` if it is the last step).

**5. Update this table** — add a row to the "Current Pages" table at the top of this file.

---
