Testing for SARS Transaction Processor

 What I'm Using
- Jest (comes with create-react-app)
- React Testing Library 
- TypeScript for the tests too


 1. Basic Rendering
Make sure the form shows up with:
- Input textarea
- Process button (disabled initially)
-  Reset button
- No results displayed yet

 2. User Interactions
- Typing in the input enables the process button
-  Clicking process shows sorted results
- Reset button clears everything
- Sort toggle switches between asc/desc

 3. Input Validation
Test with different inputs:
- Valid numbers: `1, 2, 3` → should work
- Invalid stuff: `abc, def` → should show error
-  Mixed: `1, abc, 3` → show error for invalid parts
- Edge cases: negative numbers, decimals, zero

 4. Sorting Logic
- Default ascending: `3, 1, 2` → `1, 2, 3`
 Descending toggle: `1, 2, 3` → `3, 2, 1`
- Works with negatives and decimals

 5. Error Handling
- Shows which values are invalid
- Error disappears when you fix the input
- Doesn't crash on weird input

 Sample Test
javascript
test('processes valid numbers correctly', async () => {
  const user = userEvent.setup();
  render(<TransactionProcessor />);
  
  await user.type(screen.getByLabelText(/enter numerical/i), '10, 5, 15');
  await user.click(screen.getByRole('button', { name: /process/i }));
  
  expect(screen.getByText('5')).toBeInTheDocument();
  expect(screen.getByText('10')).toBeInTheDocument();
  expect(screen.getByText('15')).toBeInTheDocument();
});


Goals
Aiming for:
- 90%+ statements
- 85%+ branches
- All functions tested

Running Tests
``
npm test              
npm run test:coverage 
```


