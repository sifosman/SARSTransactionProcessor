# SARS Transaction Processor

A React  app for processing and sorting numerical transaction values, built for the SARS Specialist Developer Technical Assessment.

## What it does (brief)

- Accepts comma‑separated numbers, validates them, and shows the sorted result.
- Toggle between ascending and descending.
- Shows clear validation errors when input has non‑numeric values.

## How to run

- Requirements: Node.js 14+
- Install: `npm install`
- Dev: `npm start` (opens http://localhost:3000)
- Tests: `npm test`

## Usage

- Example input: `10.5, 25, 3.14, 100, 7.89`
- Click “Process Values” → toggle order if needed → “Reset” to clear.

## Validation rules (simple)

- Allowed: integers and decimals, optional +/- (e.g. `-12`, `3.14`, `.5`, `5.`)
- Disallowed: scientific notation (`1e3`), `Infinity`, `NaN`, malformed tokens (`3.14.15`), empty tokens
- If any token is invalid, errors are shown and results are hidden

## Testing Examples 
Valid integers only (ascending/descending check)
45, 2, 999, -10, 0

Valid decimals and integers mixed
3.14, .5, 7, -2.71, 100.0
   
Invalid token (should trigger error and hide results)
25, abc, 10.5

Extra spaces and valid negatives
 -5 ,  200 , -0.25 , 15
 
Multiple invalid tokens at once
5..0, 1e3, Infinity, NaN

## Technical requirements (how we met them)

- __Functional components with React Hooks__: The UI is built with function components using `useState`, `useMemo`, and `useId` where appropriate for local state, derived values, and accessibility.
- __Scalable, maintainable structure__: Validation is isolated in `src/utils/numberParsing.ts`, the main feature lives in `src/components/TransactionProcessor.tsx` with its own CSS and tests, and app-level layout is kept in `src/App.tsx` for clear separation of concerns.

## Contributing

This project was built specifically for the SARS technical assessment.

