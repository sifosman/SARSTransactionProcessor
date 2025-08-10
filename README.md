# SARS Transaction Processor

A small React + TypeScript app for processing and sorting numerical transaction values, built for the SARS Specialist Developer Technical Assessment.

## Features

- **Strict validation**: Comma-separated integers and decimals. Rejects malformed tokens (e.g., `3.14.15`), `Infinity`, `NaN`, and scientific notation.
- **Clear errors**: Specific messages show exactly which token failed and its position.
- **Sorting + toggle**: Sort ascending or descending and toggle the view.
- **Basic accessibility**: Associated label, `aria-describedby` guidance, and `aria-live` for error announcements.

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. Clone or download this repository
2. Navigate to the project directory:
   ```bash
   cd "Interview Project 1 React"
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

1. Start the development server:
   ```bash
   npm start
   ```

2. Open your browser and navigate to `http://localhost:3000`

### Running Tests

```bash
npm test
```

### Building for Production

```bash
npm run build
```

## Usage

1. Enter comma-separated numerical values in the text area (e.g., `10.5, 25, 3.14, 100, 7.89`)
2. Click "Process Values" to validate and sort the numbers
3. Use the toggle button to switch between ascending and descending order
4. Click "Reset" to clear the form and start over

## Testing Dummy Data

Use these pre-prepared data sets to quickly test different scenarios:

### Basic Valid Data
```
10.5, 25, 3.14, 100, 7.89
```
```
1, 2, 3, 4, 5
```
```
100, 50, 75, 25, 90
```

### Edge Cases
```
0, -5, 10.5, -3.14, 100
```
```
0.001, 999999, -0.5, 42
```
```
1.23456789, 0, -100.5
```

### Invalid Data (for error testing)
```
10, abc, 25, def
```
```
1, 2, , 4, 5
```
```
text, 123, more text
```

### Mixed Valid/Invalid
```
10.5, invalid, 25, 3.14, error, 100
```
```
1, 2, abc, 4, def, 6
```

### Performance Testing (Large Dataset)
```
1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30
```

### Financial Transaction Simulation
```
1250.75, 89.99, 2500.00, 45.50, 999.99, 12.34, 5000.00, 234.56
```
```
-150.25, 300.75, -89.50, 1200.00, -45.99
```

### Quick Copy-Paste Options

**Scenario 1 - Basic Testing:**
`5, 2, 8, 1, 9, 3`

**Scenario 2 - Decimal Testing:**
`10.5, 2.3, 8.7, 1.1, 9.9`

**Scenario 3 - Negative Numbers:**
`-5, 10, -2, 8, -1`

**Scenario 4 - Error Testing:**
`5, abc, 8, def, 9`

**Scenario 5 - Empty Values:**
`5, , 8, , 9`

**Scenario 6 - Large Numbers:**
`1000000, 500000, 750000, 250000`

## Key Design Decisions

### Architecture

- **Functional Components with Hooks**: Used React functional components with hooks for state management and side effects
- **TypeScript**: Implemented for type safety and better developer experience
- **Component Separation**: Split functionality into reusable components for maintainability

### State Management

- **useState**: Used for managing component state (input value, sort order, validation results)
- **useCallback**: Implemented to prevent unnecessary re-renders and optimize performance
- **useMemo**: Used for expensive calculations (sorting) to avoid recalculation on every render

### Validation Strategy

- **On-demand**: Validation runs when the user clicks "Process Values".
- **Whole-token checks**: Uses a strict regex (see `src/utils/numberParsing.ts`) so partial parses (e.g., `3.14abc`) are rejected.
- **Actionable messages**: Identifies the bad token and its position.

### User Experience

- **Straightforward flow**: Enter values → Process → Toggle order → Reset.
- **Visual feedback**: Error styling and a small summary (count, order, range).
- **Accessibility**: Label/description connections and `aria-live` on the error container.

### Performance Notes

- **Memoization**: `useMemo` wraps sorting to avoid redundant work when inputs don’t change.
- **Simplicity over micro-optimization**: Event handlers are plain functions (no `useCallback`) since there’s no prop drilling or heavy child trees.

### Code Quality

- **TypeScript types** for the validation result.
- **Separation of concerns**: Validation lives in `src/utils/numberParsing.ts`.
- **Consistent naming** and focused component structure.

## Assumptions & Constraints

- Input is comma-separated with optional spaces.
- Allowed formats: `5`, `-12`, `3.14`, `5.`, `.5`, `+3`.
- Disallowed: scientific notation (`1e3`), `Infinity`, `NaN`, empty tokens, and malformed decimals (`3.14.15`).
- If any token is invalid, results are not shown; errors are displayed instead.

## Testing Strategy (summary)

Unit tests cover:

### Test Coverage Areas

1. **Component Rendering**
   - Initial state rendering
   - Conditional rendering based on state
   - Proper element presence and attributes

2. **User Interactions**
   - Input field changes
   - Button clicks and state changes
   - Form submission and processing

3. **Validation Logic**
   - Valid numerical input processing
   - Invalid input error handling
   - Mixed valid/invalid input scenarios
   - Edge cases (empty input, whitespace)

4. **Sorting Functionality**
   - Ascending order sorting
   - Descending order sorting
   - Toggle between sort orders

5. **State Management**
   - Form reset functionality
   - Button enable/disable states
   - Error state management

### Testing Approach

- **React Testing Library** with realistic user events.
- Edge cases include malformed decimals, scientific notation, and special tokens.

### How to Extend Testing

- E2E (e.g., Cypress) for full flows.
- Property-based tests for random numeric inputs.

## Project Structure

```
src/
├── components/
│   ├── TransactionProcessor.tsx    # Main component
│   ├── TransactionProcessor.css    # Component styles
│   └── TransactionProcessor.test.tsx # Unit tests
├── App.tsx                         # Root component
├── App.css                         # App styles
├── index.tsx                       # Entry point
└── index.css                       # Global styles
```

## Browser Support

- Modern evergreen browsers.

## Trade-offs & Rationale

- Kept state local to the component; a state library would be overkill for this scope.
- Hand-rolled validation to keep dependencies minimal and rules explicit.
- Show one sort order at a time via toggle (simple UI); easy to extend to side-by-side if needed.

## What I’d do next (with more time)

1. Show both ascending and descending lists side-by-side with a highlight on the active view.
2. Add CSV/JSON export for results and persistence of last input.
3. Add Cypress E2E tests and property-based tests for validation fuzzing.

## Bugs considered

- Prevented partial parses (e.g., `3.14abc`) by requiring whole-token matches.
- Rejected `Infinity`/`NaN` explicitly to avoid edge coercions.
- Ignored empty segments from stray commas.

## Contributing

This project was built specifically for the SARS technical assessment.

## License

This project is created for assessment purposes only.