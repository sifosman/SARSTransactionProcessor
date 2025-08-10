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

## Contributing

This project was built specifically for the SARS technical assessment.

