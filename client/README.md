# Foodbank Intake — Client

This is the React/TypeScript frontend for the Foodbank Intake application. It is built with **Vite** and **React 19**.

## Available Scripts

In the `client/` directory, you can run:

### `npm run dev`

Runs the app in development mode. Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

The page will hot-reload when you make changes. Lint errors will appear in the console.

### `npm run build`

Builds the app for production to the `dist/` folder. The output is minified and filenames include content hashes.

Set the `REACT_APP_API_URL` environment variable to point to your deployed API Gateway URL before building:

```bash
REACT_APP_API_URL=<your-api-gateway-url> npm run build
```

### `npm run preview`

Serves the production build locally for verification before deploying.

### `npm test` / `npm run coverage`

Runs the Vitest test suite. Use `npm run coverage` for a full code coverage report.

## Project Structure

```
client/
├── public/          # Static assets served as-is
├── src/
│   ├── __test__/    # Vitest test files
│   ├── api/         # Axios API client (api.ts)
│   ├── components/  # Shared components (BackButton, etc.)
│   ├── pages/       # Page-level components (one per route)
│   └── utils/       # Shared utility functions
├── index.html       # Vite entry point
└── package.json
```

## Adding a New Page

1. Create a new `.tsx` file in `src/pages/`.
2. Register the route in `src/App.tsx`.
3. Add a back button using the `<BackButton />` component from `src/components/BackButton.tsx` if needed.
