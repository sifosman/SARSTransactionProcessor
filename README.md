# SARS Transaction Processor

A React TypeScript application for processing and sorting numerical transaction values, built as part of the SARS Specialist Developer Technical Assessment.

## Features

- **Input Validation**: Accepts comma-separated numerical values (integers and decimals)
- **Error Handling**: Clear validation messages for invalid inputs
- **Sorting**: Display numbers in both ascending and descending order
- **Toggle Functionality**: Switch between sort orders with a single click
- **Responsive Design**: Works on desktop and mobile devices
- **Accessibility**: ARIA labels, keyboard navigation, and screen reader support

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

- **Real-time Processing**: Validation occurs when the user clicks "Process Values"
- **Detailed Error Messages**: Specific error messages indicate which values are invalid and their positions
- **Graceful Handling**: Invalid values don't prevent processing of valid ones in the same input

### User Experience

- **Progressive Enhancement**: Form starts in a clean state and progressively reveals functionality
- **Visual Feedback**: Clear visual indicators for errors, success states, and current sort order
- **Accessibility**: ARIA labels, semantic HTML, and keyboard navigation support
- **Responsive Design**: Mobile-first approach with flexible layouts

### Performance Optimizations

- **Memoization**: Used `useMemo` for sorting calculations and `useCallback` for event handlers
- **Efficient Re-renders**: Minimized unnecessary component re-renders through proper dependency arrays
- **Lazy Evaluation**: Results are only calculated when needed

### Code Quality

- **TypeScript Interfaces**: Defined clear interfaces for data structures
- **Separation of Concerns**: Logic separated from presentation
- **Error Boundaries**: Proper error handling and user feedback
- **Consistent Naming**: Clear, descriptive variable and function names

## Testing Strategy

The application includes comprehensive unit tests covering:

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

- **React Testing Library**: Used for component testing with focus on user behavior
- **User Event Simulation**: Tests simulate real user interactions
- **Accessibility Testing**: Ensures proper ARIA labels and screen reader support
- **Edge Case Coverage**: Tests handle boundary conditions and error scenarios

### How to Extend Testing

To add more tests:

1. **Integration Tests**: Test component interactions with external APIs
2. **E2E Tests**: Use tools like Cypress for full user journey testing
3. **Performance Tests**: Measure rendering performance with large datasets
4. **Visual Regression Tests**: Ensure UI consistency across changes

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

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements

- **Data Export**: Allow users to export sorted results as CSV/JSON
- **Batch Processing**: Handle multiple sets of transaction data
- **Advanced Sorting**: Additional sorting options (by absolute value, custom criteria)
- **Data Visualization**: Charts and graphs for transaction analysis
- **Persistence**: Save and load transaction sets
- **API Integration**: Connect to external transaction data sources

## Contributing

This project was built for the SARS technical assessment. For any questions or clarifications, please contact the development team.

## License

This project is created for assessment purposes only.