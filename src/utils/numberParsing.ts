export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  numbers: number[];
}

// Accepts: optional +/- sign, integers, standard decimals.
// Allows: "5", "-12", "3.14", "5.", ".5"
// Disallows: scientific notation (e.g., 1e3), Infinity, NaN, multiple dots like 3.14.15, empty tokens
const numberPattern = /^[+-]?((\d+(\.\d*)?)|(\.\d+))$/;

export function parseCommaSeparatedNumbers(input: string): ValidationResult {
  const trimmed = input.trim();
  if (!trimmed) {
    return { isValid: false, errors: ['Please enter some values'], numbers: [] };
    }

  const rawValues = trimmed.split(',').map(v => v.trim());
  const errors: string[] = [];
  const numbers: number[] = [];

  // Filter out empty segments resulting from consecutive commas or trailing commas
  const values = rawValues.filter(v => v !== '');
  if (values.length === 0) {
    return { isValid: false, errors: ['Please enter valid comma-separated values'], numbers: [] };
  }

  values.forEach((value, index) => {
    // Reject Infinity and NaN explicitly
    if (value.toLowerCase() === 'infinity' || value.toLowerCase() === 'nan') {
      errors.push(`Value "${value}" at position ${index + 1} is not a valid number`);
      return;
    }

    if (!numberPattern.test(value)) {
      errors.push(`Value "${value}" at position ${index + 1} is not a valid number`);
      return;
    }

    const num = Number(value);
    if (!Number.isFinite(num)) {
      errors.push(`Value "${value}" at position ${index + 1} is not a valid number`);
    } else {
      numbers.push(num);
    }
  });

  return { isValid: errors.length === 0, errors, numbers };
}
