# Developers Manual
Welcome to the developer's manual. Here is everything you need to start contributing to our project:


## Tools
The only requirement for this project is to have [Node.js](https://nodejs.org/en/download) installed. Instructions can be found in the link. Our project requires Node.js 24+ and has no guarantees for older versions. Instructions on how to install dependencies are under [Usage](#Usage)

## Core Functionality
The Foodbank Intake application guides food bank guests through a multi-step online intake form. Guests fill out personal and household information, dietary restrictions, and food bank-specific questions. On submission, data is sent to the backend API which processes and stores entries. The backend flags potentially duplicate or suspicious submissions for volunteer review. Volunteers can then review, correct, or approve entries through a separate volunteer interface.

## Repository Layout
There are two directories, a frontend `client` and a `backend server`. Each is it's own project, detailed below. In addition, there is a `documentation` directory that provides further details about our project. Development, building, and testing will be detailed below under [Usage](#Usage).

### documentation/
This is a container for documentation useful to those that interact with the repository.  Includes:
- `documentation/guest_doc.md` to act as a user guide for guests of the foodbank.
- `documentation/volunteer_doc.md` to be an instruction manual for volunteers. (not yet written)
- `documentation/dev_doc.md` to include further specifications for developers.
- `documentation/threat_assessment` to include an assessment of the specific security risks we have identified.

### client/
This is a React/TypeScript application that represents our frontend. It is an interface for users to input information into the intake process. Contains both dependency information for the **Volunteer Hub local website**  and the corresponding code.
Includes:
- `client/package.json` to specify the dependencies of the local website.
- `client/src` to contain the source code.
- `client/src/__test__` contains automated tests for the local website.

### server/
This is a Node.js server that abstracts away all the interactions with our internal data and logic.
Includes:
- `server/package.json` to specify the dependencies of the local website.
- `server/__test__` contains automated tests of the local website.
- `server/src` contains non trivial code for complex functions such as flagging before it enters the aws database.

## Usage
Begin by cloning or forking this repository. There is sufficient documentation for this process online. Install npm on the machine containing the repository; you will need to invoke commands of the form `npm ...` to use this project. If warnings appear while using npm, try running `npm doctor`.

### .env

The `client/.env` file sets environment variables for the frontend. The key variable is:
- `REACT_APP_API_URL` — the base URL of the deployed backend API (e.g. your API Gateway URL). In local development this is not needed since the Vite dev server proxies `/api` requests to `localhost:3001` automatically.

### Dependencies
To install required dependencies:
1. `cd server` to enter the server directory
2. `npm install` to install all server dependencies
3. `cd ../client` to enter the client directory (this assumes you are currently in server, modify this command depending on your current directory to take you to the client directory)
4. `npm install` to install all client dependencies

### Development

Run the backend and frontend in separate terminals:

```bash
# Terminal 1 — backend (runs on http://localhost:3001)
cd server
npm install
npm start

# Terminal 2 — frontend (runs on http://localhost:5173)
cd client
npm install
npm run dev
```

The Vite dev server automatically proxies `/api` requests to `http://localhost:3001`, so no additional configuration is needed during local development.


### Building

To build the frontend for production:
```bash
cd client
REACT_APP_API_URL=<your-api-gateway-url> npm run build
```
The output is placed in `client/dist/`. To build the backend:
```bash
cd server
npm run build
```
The compiled output is placed in `server/build/`.


### Linting & Type Checking

The project uses **ESLint 9** with a flat config (`eslint.config.mjs` at the repository root). It covers both the `client/` and `server/` source trees in a single config file, using `@typescript-eslint` with full type-checked rules.

To run the linter:
```bash
# from the repo root
npx eslint .

# or from inside client/ (uses the root config automatically)
npm run lint          # fails on any warning — use this before pushing
npm run lint:fix      # auto-fixes what it can
```

To run the TypeScript type checker without emitting files:
```bash
cd client
npm run typecheck
```

**Key rules enforced:**

- Every function must declare an explicit return type (`@typescript-eslint/explicit-function-return-type`). Arrow functions and higher-order functions that are typed at the call site are exempt.
- All module boundary types must be explicit (`@typescript-eslint/explicit-module-boundary-types`).
- `any` is banned — use a specific type or `unknown` (`@typescript-eslint/no-explicit-any`).
- Type imports must use `import type` syntax (`@typescript-eslint/consistent-type-imports`).
- Unsafe operations (`no-unsafe-assignment`, `no-unsafe-return`, `no-unsafe-call`, `no-unsafe-member-access`, `no-unsafe-argument`) are all errors.
- Floating promises and misused async patterns are errors (`no-floating-promises`, `no-misused-promises`, `await-thenable`).

**What is excluded from linting:** `node_modules/`, `build/`, `dist/`, `coverage/`, `__test__/` directories, `vite.config.ts`, `vite-env.d.ts`, `reportWebVitals.ts`, and `eslint.config.mjs` itself.

The `npm run lint` script passes `--max-warnings 0`, so any warning is treated as a failure. Fix all lint issues before opening a pull request.

---

### Adding a New Page

The intake flow is built with React Router. Each step in the form is a separate page component registered as a route in `App.tsx`. Adding a new page is a three-step process.

**1. Create the page component**

Add a new `.tsx` file under `client/src/pages/`. Name it after the step it represents (e.g. `HouseholdInfo.tsx`). Follow the same pattern as `Start.tsx`:

- Use `React.FC` with an explicit `JSX.Element` return type.
- Pull display text from the appropriate `*.generated.json` translation file via a static `import`.
- Pull styling values from `modifiable_content/foodbank_aesthetics.generated.json`.
- Use shared components from `client/src/components/` (e.g. `<BackButton />`, `<NextButton />`) for navigation.

```tsx
import React from 'react';
import type { JSX } from 'react';
import BackButton from '../components/BackButton';

const HouseholdInfo: React.FC = (): JSX.Element => {
  return (
    <div>
      {/* page content */}
      <BackButton />
    </div>
  );
};

export default HouseholdInfo;
```

**2. Register the route in `App.tsx`**

Import your new component and add a `<Route>` inside the existing `<Routes>` block:

```tsx
import HouseholdInfo from './pages/HouseholdInfo';

// inside <Routes>:
<Route path="/household-info" element={<HouseholdInfo />} />
```

All routes are relative to the `basename="/LynwoodFoodbankIntake"` set on `<Router>`, so `/household-info` resolves to `/LynwoodFoodbankIntake/household-info` in the browser.

**3. Update the pages README**

Add a row to the table in `client/src/pages/README.md` documenting the new file, its route, and a short description.

---

### Testing
Both the client and server use **Vitest** for automated testing. To run the automated tests, `cd` into the server or client folder and run `npm run test`. For the client you can also run `npm run coverage` for a code coverage report.

To write your own client side Vitest tests:
- Locate the `__test__` folder under `client/src/__test__`
- If you wish to set up your own tests, right click the `__test__` folder and select New File. Otherwise edit or add to the existing tests we have.
- Use this template to write your tests. We do not require any specific guidelines, but your tests should be modular, readable, and well documented.

```Javascript
import {expect, test} from 'vitest';
import { demo_sum } from '../utils/utils';  // import what you want to test

test('A descriptive test name', () => {
  expect(demo_sum(1, 2)).toBe(3)  // expects the return value of demo_sum(1, 2) to be 3

  // similar tests should be grouped together
})

// other related but different tests

```

To write your own server side Vitest tests:
- Locate the `__test__` folder under `server/src/__test__`
- If you wish to set up your own tests, right click the `__test__` folder and select New File. Otherwise edit or add to the existing tests we have.
- Use this template to write your tests. We do not require any specific guidelines, but your tests should be modular, readable, and well documented.
- Following the `describe.each` format makes it easier to add test cases and parameterize input. Optionally you can create your own name for the test case, or you can just use the inputs as `$input`.
- For large mock data, use a `.ts` file to declare and export it to avoid cluttering the test scripts with an insurmountable amount of information.

```Javascript
import {expect, test} from 'vitest';
import { demo_sum } from '../utils/utils';  // import what you want to test
describe.each([
    {
      name: 'descriptivename',
      input: 'values',
      expect: 'expected output'
    }])('function_name - $name', ({ input, expected }) => {
it('descriptive subtest name', () => {
  expect(demo_sum(values)).toBe(expected)  // expects the return value of demo_sum(1, 2) to be 3

  // similar tests should be grouped together
});
});

// async test for data pipelining can be written in a single test format
test('A descriptive async test name', async () => {
    const result = await foo();
    expect(result).toBe(true);
});
```

## Report a Bug
Bugs will be tracked within the Github Issues tab. Go to Issues -> New issue -> Bug report, and fill out the template provided with the necessary information. Please ensure that you provide information on the following:
- Clear and concise high level description of the bug
- Steps to reproduce it
- Screenshots if possible/relevant
- Device information

Please also ensure that the bug has not already been reported. Known bugs can be found under the same Issues tab.
