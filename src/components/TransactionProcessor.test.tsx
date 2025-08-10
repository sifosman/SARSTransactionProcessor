import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TransactionProcessor from './TransactionProcessor';

describe('TransactionProcessor', () => {
  beforeEach(() => {
    render(<TransactionProcessor />);
  });

  test('rejects malformed decimals like 3.14.15', async () => {
    const input = screen.getByLabelText(/enter transaction values/i);
    const processButton = screen.getByRole('button', { name: /process values/i });

    await userEvent.type(input, '3.14.15, 2');
    await userEvent.click(processButton);

    await waitFor(() => {
      expect(screen.getByText(/validation errors/i)).toBeInTheDocument();
      expect(screen.getByText(/"3.14.15" at position 1 is not a valid number/i)).toBeInTheDocument();
    });
  });

  test('rejects scientific notation if not allowed', async () => {
    const input = screen.getByLabelText(/enter transaction values/i);
    const processButton = screen.getByRole('button', { name: /process values/i });

    await userEvent.type(input, '1e3, 2');
    await userEvent.click(processButton);

    await waitFor(() => {
      expect(screen.getByText(/validation errors/i)).toBeInTheDocument();
      expect(screen.getByText(/"1e3" at position 1 is not a valid number/i)).toBeInTheDocument();
    });
  });

  test('rejects Infinity and NaN tokens', async () => {
    const input = screen.getByLabelText(/enter transaction values/i);
    const processButton = screen.getByRole('button', { name: /process values/i });

    await userEvent.type(input, 'Infinity, NaN, 5');
    await userEvent.click(processButton);

    await waitFor(() => {
      expect(screen.getByText(/validation errors/i)).toBeInTheDocument();
      expect(screen.getByText(/"Infinity" at position 1 is not a valid number/i)).toBeInTheDocument();
      expect(screen.getByText(/"NaN" at position 2 is not a valid number/i)).toBeInTheDocument();
    });
  });

  test('accepts edge decimal formats like .5 and 5.', async () => {
    const input = screen.getByLabelText(/enter transaction values/i);
    const processButton = screen.getByRole('button', { name: /process values/i });

    await userEvent.type(input, '.5, 5.');
    await userEvent.click(processButton);

    await waitFor(() => {
      expect(screen.getByText(/sorted results/i)).toBeInTheDocument();
      // Ascending order by default
      expect(screen.getByText('0.5')).toBeInTheDocument();
      expect(screen.getByText('5')).toBeInTheDocument();
    });
  });

  test('renders the component with initial elements', () => {
    expect(screen.getByLabelText(/enter transaction values/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/e.g., 10.5, 25, 3.14, 100, 7.89/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /process values/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /reset/i })).toBeInTheDocument();
  });

  test('process button is disabled when input is empty', () => {
    const processButton = screen.getByRole('button', { name: /process values/i });
    expect(processButton).toBeDisabled();
  });

  test('reset button is disabled initially', () => {
    const resetButton = screen.getByRole('button', { name: /reset/i });
    expect(resetButton).toBeDisabled();
  });

  test('enables process button when input has content', async () => {
    const input = screen.getByLabelText(/enter transaction values/i);
    const processButton = screen.getByRole('button', { name: /process values/i });

    await userEvent.type(input, '1,2,3');
    expect(processButton).toBeEnabled();
  });

  test('processes valid numeric input correctly', async () => {
    const input = screen.getByLabelText(/enter transaction values/i);
    const processButton = screen.getByRole('button', { name: /process values/i });

    await userEvent.type(input, '10, 5, 20, 1');
    await userEvent.click(processButton);

    await waitFor(() => {
      expect(screen.getByText(/sorted results/i)).toBeInTheDocument();
      expect(screen.getByText('1')).toBeInTheDocument();
      expect(screen.getByText('5')).toBeInTheDocument();
      expect(screen.getByText('10')).toBeInTheDocument();
      expect(screen.getByText('20')).toBeInTheDocument();
    });
  });

  test('handles decimal numbers correctly', async () => {
    const input = screen.getByLabelText(/enter transaction values/i);
    const processButton = screen.getByRole('button', { name: /process values/i });

    await userEvent.type(input, '10.5, 3.14, 2.71');
    await userEvent.click(processButton);

    await waitFor(() => {
      expect(screen.getByText('2.71')).toBeInTheDocument();
      expect(screen.getByText('3.14')).toBeInTheDocument();
      expect(screen.getByText('10.5')).toBeInTheDocument();
    });
  });

  test('shows validation errors for invalid input', async () => {
    const input = screen.getByLabelText(/enter transaction values/i);
    const processButton = screen.getByRole('button', { name: /process values/i });

    await userEvent.type(input, '10, abc, 20');
    await userEvent.click(processButton);

    await waitFor(() => {
      expect(screen.getByText(/validation errors/i)).toBeInTheDocument();
      expect(screen.getByText(/"abc" at position 2 is not a valid number/i)).toBeInTheDocument();
    });
  });

  test('shows error for empty input', async () => {
    const input = screen.getByLabelText(/enter transaction values/i);
    const processButton = screen.getByRole('button', { name: /process values/i });

    await userEvent.type(input, '   ');
    await userEvent.click(processButton);

    await waitFor(() => {
      expect(screen.getByText(/please enter some values/i)).toBeInTheDocument();
    });
  });

  test('toggles between ascending and descending order', async () => {
    const input = screen.getByLabelText(/enter transaction values/i);
    const processButton = screen.getByRole('button', { name: /process values/i });

    await userEvent.type(input, '30, 10, 20');
    await userEvent.click(processButton);

    await waitFor(() => {
      expect(screen.getByText(/ascending/i)).toBeInTheDocument();
    });

    const toggleButton = screen.getByRole('button', { name: /switch to descending order/i });
    await userEvent.click(toggleButton);

    await waitFor(() => {
      expect(screen.getByText(/descending/i)).toBeInTheDocument();
    });
  });

  test('resets the form when reset button is clicked', async () => {
    const input = screen.getByLabelText(/enter transaction values/i);
    const processButton = screen.getByRole('button', { name: /process values/i });

    await userEvent.type(input, '1, 2, 3');
    await userEvent.click(processButton);

    await waitFor(() => {
      expect(screen.getByText(/sorted results/i)).toBeInTheDocument();
    });

    const resetButton = screen.getByRole('button', { name: /reset/i });
    await userEvent.click(resetButton);

    expect(input).toHaveValue('');
    expect(screen.queryByText(/sorted results/i)).not.toBeInTheDocument();
    expect(resetButton).toBeDisabled();
  });

  test('handles mixed valid and invalid values', async () => {
    const input = screen.getByLabelText(/enter transaction values/i);
    const processButton = screen.getByRole('button', { name: /process values/i });

    await userEvent.type(input, '10, invalid, 20, another_invalid, 5');
    await userEvent.click(processButton);

    await waitFor(() => {
      expect(screen.getByText(/validation errors/i)).toBeInTheDocument();
      expect(screen.getByText(/"invalid" at position 2 is not a valid number/i)).toBeInTheDocument();
      expect(screen.getByText(/"another_invalid" at position 4 is not a valid number/i)).toBeInTheDocument();
    });
  });

  test('displays summary information correctly', async () => {
    const input = screen.getByLabelText(/enter transaction values/i);
    const processButton = screen.getByRole('button', { name: /process values/i });

    await userEvent.type(input, '100, 50, 75');
    await userEvent.click(processButton);

    await waitFor(() => {
      expect(screen.getByText(/total values: 3/i)).toBeInTheDocument();
      expect(screen.getByText(/order: ascending/i)).toBeInTheDocument();
      expect(screen.getByText(/range: 50 to 100/i)).toBeInTheDocument();
    });
  });
});