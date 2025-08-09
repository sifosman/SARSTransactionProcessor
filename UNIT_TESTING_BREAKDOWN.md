# Testing Plan for SARS Transaction Processor

Okay so I had to put together this testing plan pretty quickly since I'm juggling 3 projects for this interview. Here's what I'm thinking for testing the transaction processor app.

## What I'm Using
- Jest (comes with create-react-app)
- React Testing Library 
- TypeScript for the tests too

Basically just the standard React testing setup, nothing fancy.

## Main Test Categories

### 1. Basic Rendering
Make sure the form shows up with:
- Input textarea
- Process button (disabled initially)
- Reset button
- No results displayed yet

### 2. User Interactions
- Typing in the input enables the process button
- Clicking process shows sorted results
- Reset button clears everything
- Sort toggle switches between asc/desc

### 3. Input Validation
Test with different inputs:
- Valid numbers: `1, 2, 3` → should work
- Invalid stuff: `abc, def` → should show error
- Mixed: `1, abc, 3` → show error for invalid parts
- Edge cases: negative numbers, decimals, zero

### 4. Sorting Logic
- Default ascending: `3, 1, 2` → `1, 2, 3`
- Descending toggle: `1, 2, 3` → `3, 2, 1`
- Works with negatives and decimals

### 5. Error Handling
- Shows which values are invalid
- Error disappears when you fix the input
- Doesn't crash on weird input

## Sample Test
```javascript
test('processes valid numbers correctly', async () => {
  const user = userEvent.setup();
  render(<TransactionProcessor />);
  
  await user.type(screen.getByLabelText(/enter numerical/i), '10, 5, 15');
  await user.click(screen.getByRole('button', { name: /process/i }));
  
  expect(screen.getByText('5')).toBeInTheDocument();
  expect(screen.getByText('10')).toBeInTheDocument();
  expect(screen.getByText('15')).toBeInTheDocument();
});
```

## Coverage Goals
Aiming for:
- 90%+ statements
- 85%+ branches
- All functions tested

Not going crazy with 100% coverage since this is a small app and I have other projects to work on.

## What I'd Add Later
- Performance tests with large datasets
- Accessibility tests (keyboard navigation, screen readers)
- Visual regression tests
- E2E tests with Cypress maybe

But honestly, for a 5-day interview project with 2 other apps to build, the basic unit tests should be enough to show I know what I'm doing.

## Running Tests
```bash
npm test              # watch mode
npm run test:coverage # see coverage
```

That's pretty much it. The tests focus on user behavior rather than implementation details, which is what React Testing Library is all about. Should catch the main bugs and give confidence the app works as expected.