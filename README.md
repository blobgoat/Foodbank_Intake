# Foodbank_Intake

A website which will host a food bank intake process. The goal of this project is to not only make an intake form/process but make something designed and documented in such a way all foodbanks can easily modify and use for their individual services.

---

## Overview

A full-stack JavaScript web application built with **React** (frontend) and **Node.js/Express** (REST API backend), designed for deployment on **AWS**.

### 5 Pages

| Page | Path | Description |
|------|------|-------------|
| **Home** | `/` | Landing page with quick-action cards linking to all workflows |
| **New Intake** | `/new-intake` | Registration form for first-time clients |
| **Returning Client** | `/returning-client` | Check-in search for existing clients (by name, phone, or ID) |
| **Available Items** | `/inventory` | Real-time inventory table with category filters |
| **Confirmation** | `/confirmation` | Success page shown after intake or check-in |

Every secondary page has a **← Back** button that navigates to the previous screen using the browser history stack.

---

## Project Structure

```
Foodbank_Intake/
├── frontend/          # React single-page application
│   ├── src/
│   │   ├── api/       # Axios API client
│   │   ├── components/# NavBar, BackButton
│   │   └── pages/     # Home, NewIntake, ReturningClient, Inventory, Confirmation
│   └── package.json
├── backend/           # Node.js/Express REST API
│   ├── src/
│   │   ├── data/      # In-memory store (replace with DynamoDB for production)
│   │   └── routes/    # clients.js, inventory.js, intake.js
│   └── server.js
├── aws/
│   └── cloudformation.json  # CloudFormation template (API GW, Lambda IAM, DynamoDB, S3)
└── amplify.yml        # AWS Amplify CI/CD build config
```

---

## REST API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/health` | Health check |
| `POST` | `/api/clients` | Register a new client |
| `GET` | `/api/clients/search` | Search clients by name, phone, or ID |
| `POST` | `/api/clients/:id/checkin` | Check in a returning client |
| `GET` | `/api/inventory` | List all inventory items |
| `POST` | `/api/intake` | Record an intake transaction |

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm 8+

### Run locally

**Backend:**
```bash
cd backend
npm install
npm start        # runs on http://localhost:3001
```

**Frontend:**
```bash
cd frontend
npm install
npm start        # runs on http://localhost:3000
```

The frontend proxies `/api` requests to the backend automatically in development (configured via `"proxy"` in `package.json`).

### Run tests
```bash
cd frontend
npm test
```

### Build for production
```bash
cd frontend
REACT_APP_API_URL=https://your-api-gateway-url/api npm run build
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
- **Inventory items** — edit `backend/src/data/store.js` (or seed from DynamoDB)
- **Intake form fields** — edit `frontend/src/pages/NewIntake.js` and the corresponding API route
- **Branding / colors** — the primary green `#2c7a3a` is set throughout the CSS files
- **API base URL** — set via `REACT_APP_API_URL` environment variable

