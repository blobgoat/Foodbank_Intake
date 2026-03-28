# Foodbank_Intake

A website which will host a food bank intake process. The goal of this project is to not only make an intake form/process but make something designed and documented in such a way all foodbanks can easily modify and use for their individual services.

---

## Overview

A full-stack JavaScript web application built with **React** (frontend) and **Node.js/Express** (REST API backend), designed for deployment on **AWS**.

### 5 Pages

| Page | Path | Description |
|------|------|-------------|
| **Weclome** | `/` | Welome page allowing the user to start the process by pushing the button |
| **Account Holder** | `/account-holder` | Collects information of the account holder |
| **Group Members** | `/group-members` | Collects information of the family or group under the account holder |
| **Dietary Restrictions** | `/diet-restrictions` | allows client to input dietary restrictions, and modifications to their meal package |
| **Miscellaneous** | `/miscellaneous` | asks food bank specific questions |
| **TeaFap Guidelines** | `/TeaFap`| provides the TeaFap Guidelines and gets affirmation that the client understands they must be within this salary range
| **Confirmation** | `/confirmation` | shows the user a confirmation screen with the address and provides helpful links


Every page has a **← Back** button that navigates to the previous screen using the browser history stack. You should also be able to navigate by changing the url (or using the back button in the browser), to webpages except in the case you dont have local data to progress to that page then it should redirect you to the start.

---

## Project Structure

```
Foodbank_Intake/
├── .github/
|   ├── ISSUE_TEMPLATE/ #houses the bug report.md file to allow user to report bugs on our git
|   └──workflows/ #houses the ci workflow and will hopefully house the lynwood foodbank cd workflow
├── assets/ #holds relevant .png used for certain buttons and for graphic design, Note: foodbank logo.png should be inside modifiable content
├── aws/
│   └── cloudformation.json  # CloudFormation template (API GW, Lambda IAM, DynamoDB, S3)
├── client/          # React single-page application
│   ├── src/
|   |   ├──__tests__   #houses the tests for the front end
│   │   ├── api/       # Axios API client
│   │   ├── components/# NavBar, BackButton
│   │   ├── pages/     # Home, NewIntake, ReturningClient, Inventory, Confirmation
|   |   └──utils/      # Houses utility functions reusable by multiple applications
│   └── package.json
├── documentation      # This folder houses more specific documentation for developers, guests, and foodbank leaders.
├── modifiable_content # this is meant to be the workable folder for easy and adaptbale changes to the webpage
|   ├──Images          # houses specific images for the foodbank. Like the company logo
|   ├──<Language>      # folders which starts with any language name
|   |   ├──<language>_mutable_text.jsonc # holds the mutable or expected to be changed based on food bank text (outside of the company name)
|   |   ├──<language>_mutable_text.generated.json # holds the json file which other files call upon, should be generated and carries the same fields as the .jsonc
|   |   ├──<language>_standard_text.jsonc # holds the standard or the expected to be reusable text for all food banks
|   |   └──<language>_mutable_test.generated.json # holds the standard or expected to be reused for all food bank's text (outside of the company name)
|   ... (every supported language should follow the above format)
|   ├── disabled_questions_and_pages.jsonc #turning off fields will allow foodbanks to leave out or skip different pages, and also to leave out or skip certain questions. With the exception of the submission page
|   ├── disabled_questions_and_pages.generated.json #this is simply the generated version of the jsonc file that integrates with typescript
|   ├──foodbank_aesthetics.jsonc  # this file houses all the aethsthetics or branding of a certain foodbank. Everything that doesnt have to do with language. Except, of course, the name of the foodbank
|   ├──foodbank_aesthetics.generated.json  #this is simply the generated version of the jsonc file that integrates with typescript
|   ├──translationAPI.ts  #this is a functional API which abstracts the language away from the programmer. This object will house the selected language and then when running the objects function will return the correct languages text for each section
|   └──translationTextInterface.ts # this typescript file houses the interfaces typescript is using to track types for all modifiable json files
├── server/           # Node.js/Express REST API
│   ├── src/
|   |   ├──__tests__   #houses the tests for the back end and for style checking modifiable_content
|   |   ├──__tests__   #houses the tests for the front end
│   │   ├── data/      # In-memory store (replace with DynamoDB for production)
|   |   ├── scripts/    #houses the development tools which build files to enable better testing
│   │   ├── routes/    # clients.js, inventory.js, intake.js
│   │   └── utils/     # holds general utility function mean to support different functionalities
|   ├── package.json
│   └── index.ts       # starts the server
└── amplify.yml        # AWS Amplify CI/CD build config
```

---

## REST API Endpoints
Note: currently there is only two planned API calls

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/health` | Health check |
| `POST` | `/api/intake` | Record an intake transaction |

---

## Getting Started

- Node.js 18+
- npm 8+
- TypeScript 5.9+
- React 19.2+
- Express 5.2+

### Run locally

**Backend:**
```bash
cd server
npm install
npm start        # runs on http://localhost:3001
```

**Frontend:**
```bash
cd client
npm install
npm start        # runs on http://localhost:3000
```

The frontend proxies `/api` requests to the backend automatically in development (configured via `"proxy"` in `package.json`).

### Run tests

```bash
cd client
npm test
```
and
```bash
cd server
npm test
```

### Build for production
```bash
cd client
REACT_APP_API_URL=<secret> npm run build
```

---

## AWS Deployment

### AWS Amplify (recommended)
1. Connect this repository to **AWS Amplify Console**
2. Amplify will use `amplify.yml` for build configuration
3. Set the environment variable `REACT_APP_API_URL` to your deployed API Gateway URL

### CloudFormation
The `aws/cloudformation.json` template provisions:
- **API Gateway** REST API
- **IAM Role** for Lambda execution with DynamoDB access
- **DynamoDB tables**: `FoodbankClients`, `FoodbankInventory`, `FoodbankIntakes`
- **S3 Bucket** for static frontend hosting

Deploy with:
```bash
aws cloudformation create-stack \
  --stack-name foodbank-intake \
  --template-body file://aws/cloudformation.json \
  --capabilities CAPABILITY_NAMED_IAM \
  --parameters ParameterKey=Environment,ParameterValue=prod
```

---

## Customization

Each food bank can customize:
- **Add translations for your community** — edit `modifiable_content/translationAPI.ts` and add a language name to that file. Then build corresponding files by copying the english folder, and rename every file where english is displayed with the name of the language you are adding support for. (ideally we will make a build tool for convenience)
- **Intake form fields** — edit `modifiable_content/` and the corresponding tanslated languages mutable text.
- **Branding / colors** — for instance the primary green `#2c7a3a` is set throughout the CSS files inside `modifiable_content/foodbank_aesthetics.jsonc`
- **API base URL** — set via `REACT_APP_API_URL` environment variable

