import React, { useState, useCallback, useMemo } from 'react';
import './TransactionProcessor.css';

interface ValidationResult {
  isValid: boolean;
  errors: string[];
  numbers: number[];
}

type SortOrder = 'asc' | 'desc';

const TransactionProcessor: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [validationResult, setValidationResult] = useState<ValidationResult>({
    isValid: true,
    errors: [],
    numbers: []
  });
  const [hasProcessed, setHasProcessed] = useState<boolean>(false);

  const validateAndParseInput = useCallback((input: string): ValidationResult => {
    if (!input.trim()) {
      return {
        isValid: false,
        errors: ['Please enter some values'],
        numbers: []
      };
    }

    const values = input.split(',').map(val => val.trim()).filter(val => val !== '');
    const errors: string[] = [];
    const numbers: number[] = [];

    if (values.length === 0) {
      return {
        isValid: false,
        errors: ['Please enter valid comma-separated values'],
        numbers: []
      };
    }

    values.forEach((value, index) => {
      const num = parseFloat(value);
      if (isNaN(num)) {
        errors.push(`Value "${value}" at position ${index + 1} is not a valid number`);
      } else {
        numbers.push(num);
      }
    });

    return {
      isValid: errors.length === 0,
      errors,
      numbers
    };
  }, []);

  const handleInputChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
  }, []);

  const handleProcess = useCallback(() => {
    const result = validateAndParseInput(inputValue);
    setValidationResult(result);
    setHasProcessed(true);
  }, [inputValue, validateAndParseInput]);

  const handleToggleSort = useCallback(() => {
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
  }, []);

  const handleReset = useCallback(() => {
    setInputValue('');
    setValidationResult({ isValid: true, errors: [], numbers: [] });
    setHasProcessed(false);
    setSortOrder('asc');
  }, []);

  const sortedNumbers = useMemo(() => {
    if (!validationResult.isValid || validationResult.numbers.length === 0) {
      return [];
    }
    
    return [...validationResult.numbers].sort((a, b) => {
      return sortOrder === 'asc' ? a - b : b - a;
    });
  }, [validationResult.numbers, validationResult.isValid, sortOrder]);

  return (
    <div className="transaction-processor">
      <div className="input-section">
        <label htmlFor="transaction-input" className="input-label">
          Enter Transaction Values (comma-separated):
        </label>
        <textarea
          id="transaction-input"
          className={`input-field ${validationResult.errors.length > 0 ? 'error' : ''}`}
          value={inputValue}
          onChange={handleInputChange}
          placeholder="e.g., 10.5, 25, 3.14, 100, 7.89"
          rows={4}
          aria-describedby="input-help validation-errors"
        />
        <div id="input-help" className="input-help">
          Enter numerical values separated by commas. Both integers and decimals are accepted.
        </div>
        
        <div className="button-group">
          <button 
            onClick={handleProcess}
            className="process-btn"
            disabled={!inputValue.trim()}
          >
            Process Values
          </button>
          <button 
            onClick={handleReset}
            className="reset-btn"
            disabled={!hasProcessed}
          >
            Reset
          </button>
        </div>
      </div>

      {hasProcessed && (
        <div className="results-section">
          {validationResult.errors.length > 0 && (
            <div id="validation-errors" className="error-section" role="alert">
              <h3>Validation Errors:</h3>
              <ul>
                {validationResult.errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}

          {validationResult.isValid && sortedNumbers.length > 0 && (
            <div className="success-section">
              <div className="sort-controls">
                <h3>Sorted Results:</h3>
                <button 
                  onClick={handleToggleSort}
                  className="toggle-btn"
                  aria-label={`Switch to ${sortOrder === 'asc' ? 'descending' : 'ascending'} order`}
                >
                  {sortOrder === 'asc' ? '↑ Ascending' : '↓ Descending'}
                </button>
              </div>
              
              <div className="results-display">
                <div className="numbers-grid">
                  {sortedNumbers.map((number, index) => (
                    <span key={index} className="number-item">
                      {number}
                    </span>
                  ))}
                </div>
                
                <div className="summary">
                  <p><strong>Total values:</strong> {sortedNumbers.length}</p>
                  <p><strong>Order:</strong> {sortOrder === 'asc' ? 'Ascending' : 'Descending'}</p>
                  <p><strong>Range:</strong> {Math.min(...sortedNumbers)} to {Math.max(...sortedNumbers)}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TransactionProcessor;