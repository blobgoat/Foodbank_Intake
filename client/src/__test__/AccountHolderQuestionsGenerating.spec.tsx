import { describe, test, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AccountHolder from '../pages/AccountHolder';
import { translationAPI } from '../../../modifiable_content/translationAPI';

afterEach(cleanup);
//note developed with Claude
/**
 * Helper: renders AccountHolder inside a Router (required by the app's routing setup).
 */
function renderAccountHolder() {
  return render(
    <BrowserRouter>
      <AccountHolder />
    </BrowserRouter>
  );
}

// =============================================================================
// Domain 1: Question Presence
// Tests that all three required questions are rendered on the AccountHolder page.
// The prompt requires exactly three questions: First Name, Last Name, Date of Birth.
// =============================================================================
describe.each([
  {
    // Verifies the first name question label is rendered.
    // Req: "The three questions in english are 'Account Holder's First Name:'"
    name: 'First Name question label',
    labelPattern: /account holder.*first name/i,
  },
  {
    // Verifies the last name question label is rendered.
    // Req: "The three questions in english are ... 'Account Holder's Last Name:'"
    name: 'Last Name question label',
    labelPattern: /account holder.*last name/i,
  },
  {
    // Verifies the date of birth question label is rendered.
    // Req: "The three questions in english are ... 'Account Holder's Date of Birth:'"
    name: 'Date of Birth question label',
    labelPattern: /account holder.*date of birth/i,
  },
])('Question presence — $name', ({ labelPattern }) => {
  test('is rendered on the AccountHolder page', () => {
    renderAccountHolder();
    const label = screen.getByText(labelPattern);
    expect(label).toBeDefined();
  });
});

// =============================================================================
// Domain 2: Input Types
// Tests that the first two questions use text inputs and the third uses a date input.
// Req: "The first 2 should be short text box user input"
// Req: "The third question should be a date picker calendar widget"
// =============================================================================
describe.each([
  {
    // First Name must be a text input — short text box for typing a name.
    // Req: "The first 2 should be short text box user input"
    name: 'First Name input is type text',
    labelPattern: /account holder.*first name/i,
    expectedType: 'text',
  },
  {
    // Last Name must be a text input — short text box for typing a name.
    // Req: "The first 2 should be short text box user input"
    name: 'Last Name input is type text',
    labelPattern: /account holder.*last name/i,
    expectedType: 'text',
  },
  {
    // Date of Birth must be a date input — date picker calendar widget.
    // Req: "The third question should be a date picker calendar widget"
    name: 'Date of Birth input is type date',
    labelPattern: /account holder.*date of birth/i,
    expectedType: 'date',
  },
])('Input type — $name', ({ labelPattern, expectedType }) => {
  test(`renders an input of type "${expectedType}"`, () => {
    renderAccountHolder();
    // The question label text should be associated with or near an input element.
    // We look for an input within the same container or via accessible labelling.
    const label = screen.getByText(labelPattern);
    // Walk up to find the nearest container, then find the input within it
    const container = label.closest('div') || label.parentElement;
    const input = container?.querySelector('input');
    expect(input).not.toBeNull();
    expect(input?.type).toBe(expectedType);
  });
});

// =============================================================================
// Domain 3: Card Container
// Tests that the questions are wrapped in a card container element.
// Req: "Everything should be in a new card container, which you can reuse
//       implementation from reusableUI.css"
// The card container in reusableUI.css uses class "card-container" or
// "card-containerForText" with specific styling (white bg, border-radius, shadow).
// =============================================================================
describe('Card container', () => {
  test.each([
    {
      // The questions section should be wrapped in a card-container div.
      // Req: "Everything should be in a new card container"
      // Edge: verifies the structural wrapper exists, matching the reusableUI.css pattern.
      name: 'questions are inside a card container element',
    },
  ])('$name', () => {
    const { container } = renderAccountHolder();
    // Look for an element with a card-container class (matching reusableUI.css naming)
    const cardContainer = container.querySelector(
      '[class*="card-container"], [class*="card-containerForText"]'
    );
    expect(cardContainer).not.toBeNull();
  });

  test.each([
    {
      // All three question inputs must be inside the card container, not scattered.
      // Req: "Everything should be in a new card container"
      // Edge: ensures no question is rendered outside the card.
      name: 'all three inputs are inside the card container',
    },
  ])('$name', () => {
    const { container } = renderAccountHolder();
    const cardContainer = container.querySelector(
      '[class*="card-container"], [class*="card-containerForText"]'
    );
    expect(cardContainer).not.toBeNull();
    const inputs = cardContainer!.querySelectorAll('input');
    expect(inputs.length).toBe(3);
  });
});

// =============================================================================
// Domain 4: Full-Width Text Inputs
// Tests that the first two text inputs extend across the full width of the card.
// Req: "short text box user input which extends across the entire card container"
// We check for CSS width or a style/class that indicates full-width behavior.
// =============================================================================
describe.each([
  {
    // First Name text input should span the full card width.
    // Req: "extends across the entire card container"
    name: 'First Name input is full-width',
    labelPattern: /account holder.*first name/i,
  },
  {
    // Last Name text input should span the full card width.
    // Req: "extends across the entire card container"
    name: 'Last Name input is full-width',
    labelPattern: /account holder.*last name/i,
  },
])('Full-width layout — $name', ({ labelPattern }) => {
  test('input has full-width styling', () => {
    renderAccountHolder();
    const label = screen.getByText(labelPattern);
    const container = label.closest('div') || label.parentElement;
    const input = container?.querySelector('input');
    expect(input).not.toBeNull();
    // Check for width: 100% in inline style or a CSS class that implies full-width
    const style = input?.style.width;
    const className = input?.className || '';
    const hasFullWidth =
      style === '100%' ||
      className.includes('full-width') ||
      className.includes('w-full') ||
      // Also accept if the input's parent wrapper has width 100%
      input?.parentElement?.style.width === '100%' ||
      input?.parentElement?.className.includes('full-width') ||
      input?.parentElement?.className.includes('w-full');
    expect(hasFullWidth).toBe(true);
  });
});

// =============================================================================
// Domain 5: Translation API Integration
// Tests that question text is sourced from the translation system (p2Q1, p2Q2, p2Q3 keys)
// rather than hardcoded.
// Req: "The questions should utilize the APITranslator architecture and be defined
//       using the structure place there with p2q1..p2q2 etc."
// =============================================================================
test('AccountHolder uses expected translated question text for English', () => {
  translationAPI.changeLanguage('English')

  renderAccountHolder();



  expect(
    screen.getByLabelText(
      translationAPI.getStandardTranslation()['p2Q1FirstName']
    )
  ).toBeTruthy();

  expect(
    screen.getByLabelText(
      translationAPI.getStandardTranslation()['p2Q2LastName']
    )
  ).toBeTruthy();

  expect(
    screen.getByLabelText(translationAPI.getStandardTranslation()['p2Q3DOB'])
  ).toBeTruthy();


});
test('AccountHolder uses expected translated question text for Spanish', () => {
  translationAPI.changeLanguage('Spanish')

  renderAccountHolder();



  expect(
    screen.getByLabelText(
      translationAPI.getStandardTranslation()['p2Q1FirstName']
    )
  ).toBeTruthy();

  expect(
    screen.getByLabelText(
      translationAPI.getStandardTranslation()['p2Q2LastName']
    )
  ).toBeTruthy();

  expect(
    screen.getByLabelText(translationAPI.getStandardTranslation()['p2Q3DOB'])
  ).toBeTruthy();


});

// =============================================================================
// Domain 6: Clamp-Based Fluid Font Sizing
// Tests that question heading fonts use CSS clamp() for fluid scaling.
// Req: "the font should expand using clamp like other implementations"
// The codebase uses pxToFluid() which generates clamp(min, vw, max) expressions
// and sets them as CSS custom properties via inline styles.
// =============================================================================
describe('Clamp-based fluid font sizing', () => {
  test.each([
    {
      // The First Name question heading should use a clamp() font-size.
      // Req: "the font should expand using clamp like other implementations"
      // Edge: verifies the pxToFluid pattern is applied to question headings.
      name: 'First Name heading uses clamp font size',
      labelPattern: /account holder.*first name/i,
    },
    {
      // The Last Name question heading should use a clamp() font-size.
      // Req: "the font should expand using clamp like other implementations"
      name: 'Last Name heading uses clamp font size',
      labelPattern: /account holder.*last name/i,
    },
    {
      // The DOB question heading should use a clamp() font-size.
      // Req: "the font should expand using clamp like other implementations"
      name: 'Date of Birth heading uses clamp font size',
      labelPattern: /account holder.*date of birth/i,
    },
  ])('$name', ({ labelPattern }) => {
    renderAccountHolder();
    const label = screen.getByText(labelPattern);
    // Walk up the DOM to find an element with a style containing "clamp("
    // The pxToFluid utility sets clamp values on CSS custom properties in inline styles
    let el: HTMLElement | null = label as HTMLElement;
    let foundClamp = false;
    while (el) {
      const styleAttr = el.getAttribute('style') || '';
      if (styleAttr.includes('clamp(')) {
        foundClamp = true;
        break;
      }
      el = el.parentElement;
    }
    expect(foundClamp).toBe(true);
  });
});

// =============================================================================
// Domain 7: Non-Reusable AccountHolder Component
// Tests that the questions are rendered as part of an AccountHolder-specific component,
// not a generic reusable widget imported from a shared components directory.
// Req: "the questions should be an accountholder component as nothing here is
//       expected to be reusable"
// We verify this structurally: the AccountHolder page must render the inputs
// (they shouldn't only exist in a generic, page-agnostic module).
// =============================================================================
describe('AccountHolder-specific component', () => {
  test.each([
    {
      // AccountHolder page renders all three question inputs directly.
      // Req: "the questions should be an accountholder component"
      // This verifies the questions are part of the AccountHolder page render tree.
      name: 'AccountHolder renders question inputs in its tree',
    },
  ])('$name', () => {
    renderAccountHolder();
    // All three inputs should be findable within the AccountHolder render
    const firstNameLabel = screen.getByText(/account holder.*first name/i);
    const lastNameLabel = screen.getByText(/account holder.*last name/i);
    const dobLabel = screen.getByText(/account holder.*date of birth/i);
    expect(firstNameLabel).toBeDefined();
    expect(lastNameLabel).toBeDefined();
    expect(dobLabel).toBeDefined();
  });
});

// =============================================================================
// Domain 8: Question as Heading
// Tests that the question text serves as a heading for the input, not just a label.
// Req: "with the question as the heading"
// =============================================================================
describe.each([
  {
    // First Name question text should be in a heading-like element (h1-h6 or
    // an element with a heading role/class).
    // Req: "with the question as the heading"
    name: 'First Name question is a heading',
    labelPattern: /account holder.*first name/i,
  },
  {
    // Last Name question text should be in a heading-like element.
    // Req: "with the question as the heading"
    name: 'Last Name question is a heading',
    labelPattern: /account holder.*last name/i,
  },
  {
    // DOB question text should be in a heading-like element.
    // Req: "with the question as the heading"
    name: 'Date of Birth question is a heading',
    labelPattern: /account holder.*date of birth/i,
  },
])('Question as heading — $name', ({ labelPattern }) => {
  test('question text is inside a heading element', () => {
    renderAccountHolder();
    const label = screen.getByText(labelPattern);
    // Check if the element itself or its parent is a heading tag
    let el: HTMLElement | null = label as HTMLElement;
    let isHeading = false;
    while (el) {
      const tag = el.tagName.toLowerCase();
      if (/^h[1-6]$/.test(tag)) {
        isHeading = true;
        break;
      }
      // Also accept elements with a heading-like class or role
      if (el.getAttribute('role') === 'heading') {
        isHeading = true;
        break;
      }
      // Only walk up a couple levels — the heading should be close to the text
      if (el === label.parentElement?.parentElement?.parentElement) break;
      el = el.parentElement;
      console.log('Checking element:', el?.tagName, 'with classes:', el?.className);
    }
    expect(isHeading, 'Expected question text to be inside a heading element').toBe(true);
  });
});
