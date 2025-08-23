import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import InputField from './InputField';
import { vi } from 'vitest';

describe('InputField', () => {
  it('renders label and helper text', () => {
    render(
      <InputField
        label="Email"
        helperText="We never share your email."
        placeholder="you@example.com"
      />
    );
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByText('We never share your email.')).toBeInTheDocument();
  });

  it('shows error when invalid with errorMessage', () => {
    render(
      <InputField
        label="Username"
        invalid
        errorMessage="Required"
      />
    );
    expect(screen.getByRole('alert')).toHaveTextContent('Required');
  });

  it('supports clearable', () => {
    const handle = vi.fn((e: React.ChangeEvent<HTMLInputElement>) => e);
    render(<InputField label="Name" value="Alice" clearable onChange={handle} />);
    fireEvent.click(screen.getByRole('button', { name: /clear input/i }));
    expect(handle).toHaveBeenCalled();
  });

  it('toggles password when passwordToggle is true', () => {
    render(
      <InputField
        label="Password"
        type="password"
        passwordToggle
      />
    );
    const toggle = screen.getByRole('button', { name: /show password/i });
    fireEvent.click(toggle);
    // after click, aria-label becomes "Hide password"
    expect(screen.getByRole('button', { name: /hide password/i })).toBeInTheDocument();
  });
});
