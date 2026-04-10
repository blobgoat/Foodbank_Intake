# Modifiable Content Guide

This directory contains all customizable content for the Foodbank Intake application, organized to support multi-language deployments and location-specific configurations.

## Directory Structure
### Images
The `images` folder contains assets expected to change per location (currently: logo).

### Language Folders
Each supported language has its own folder containing:
- **`<language>_standard_text.jsonc`** - Base text - generally translate only
- **`<language>_standard_text.generated.json`** - Auto-generated JSON version of standard text (do not modify)
- **`<language>_mutable.jsonc`** - Customizable text file expected to vary by location
- **`<language>_mutable.generated.json`** - Auto-generated JSON version of mutable text (do not modify)

The mutable JSONC file is designed for developers to modify based on specific foodbank needs and regional variations. The `.generated.json` files are automatically created from their corresponding JSONC files and should not be edited directly.

### Text Formatting Options

Writers can enhance text in language-specific mutable JSONC files using the following formatting:

- **Italics** - Surround text with single asterisks: `*italic text*`
- **Bold** - Surround text with double asterisks: `**bold text**`
- **Bold and Italic** - Surround text with triple asterisks: `***bold italic text***`
- **Foodbank Name** - Insert the placeholder `<name>` anywhere in text to dynamically display the foodbank's configured name
- **Bullet point** - Start a line with `/b ` (slash, b, space) to render it as a bullet-point list item: `/b Bring a valid ID`
- **Numbered list item** - Start a line with `/lN ` where N is the item's number (e.g. `/l1 Fill out the form`, `/l2 Show your confirmation`). The number is required — writing `/l` without a number immediately after will cause an error.

Consecutive lines using the same list token (`/b` or `/lN`) are automatically grouped into a single list. Switching between `/b` and `/lN` on adjacent lines creates separate lists. All other formatting tokens (bold, italic, `<name>`) work normally inside list items.

Example — a numbered list preceded by an intro sentence:
```
"Please complete these steps:\n/l1 Fill out the intake form\n/l2 Show a volunteer your confirmation"
```

### Naming Conventions

JSON keys follow a strict naming pattern to maintain consistency and enable automated validation:

- **Component Keys** - Prefix with `c` (e.g., `cHeaderButton`, `cInputField`)
- **Page Keys** - Prefix with `p` followed by page number (e.g., `p1`, `p2`, `p3`)
- **Question Keys** - Append `q#` to denote question order within a page, starting with `q1` at the top (e.g., `p1q1`, `p1q2`, `p2q1`)

Example: `p1q3` refers to the third question on page 1.

### CI/CD Validation

Automated test scripts run during continuous integration to enforce quality standards:

- Verify naming conventions are followed correctly
- Ensure no erroneous or extraneous files are present
- Detect missing fields or translations across supported languages
- Validate consistency against `translationAPI.ts` declarations

If a language becomes unsupported, delete its entire folder to prevent CI failures. Git preserves all work history, so no content is lost.



### Key Files

#### `translationAPI.ts`
An object-based API that simplifies accessing translated content across different languages and fields. This file is **not to be touched by translators** — it provides the interface for developers to retrieve localized text throughout the application.

#### `translationTextInterface.ts`
TypeScript interface that enforces type safety across all standard, mutable, and disabled questions. This ensures:
- Fields are only added with proper support
- Type consistency across all languages
- Unexpected modifications are caught at compile time

#### `disabled_questions_and_pages`
A boolean configuration list that allows foodbanks to disable specific questions and pages without modifying the codebase. When a page is disabled, it is automatically skipped — all routing and logic adjustments happen automatically.

## Foodbank Aesthetics

The `foodbank_aesthetics` folder contains non-language branding assets:
- **Logo** - Primary branding image
- **Name** - Foodbank display name
- **Colors** - Brand color palette
- **Fonts** - Typography configuration

### A note on visual fine-tuning

The values in `foodbank_aesthetics.jsonc` control the broad strokes of how buttons and text look — colors, font choices, and reference sizes. However, **every font renders slightly differently**: a font-size of `16px` in one typeface may look noticeably larger or smaller than `16px` in another, and a button that looks perfectly balanced with one font may feel cramped or lopsided with a different one.

This means that after changing a font or adjusting button sizes in the config file, **the results may need a small visual touch-up by a developer** to bring spacing, padding, and alignment back into balance. This is normal and expected — it is not a bug in the configuration.

If something looks slightly off after a config change (a button label that feels too close to the edge, an icon that seems misaligned, etc.), flag it for your development team. They will make small CSS adjustments in the individual component style files to correct it.

---

For questions, consult with your development team. Translators should only modify language-specific mutable JSONC files.
