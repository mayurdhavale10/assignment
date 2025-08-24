import type { Meta, StoryObj } from '@storybook/nextjs';
import { useState } from 'react';
import InputField, { type InputFieldProps } from './InputField';
import * as React from 'react';

const meta: Meta<typeof InputField> = {
  title: 'UI/InputField',
  component: InputField,
  parameters: { layout: 'centered' },
};
export default meta;

type Story = StoryObj<typeof InputField>;

export const Playground: Story = {
  render: (args: InputFieldProps) => {
    const [val, setVal] = useState('');
    return (
      <div style={{ width: 320 }}>
        <InputField
          {...args}
          value={val}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setVal(e.target.value)}
          label="Email"
          placeholder="you@example.com"
          helperText="We never share your email."
        />
      </div>
    );
  },
  args: { variant: 'outlined', size: 'md' },
};

export const ErrorState: Story = {
  args: {
    label: 'Username',
    placeholder: 'your username',
    invalid: true,
    errorMessage: 'Username is required',
  },
};

export const Password: Story = {
  render: () => {
    const [val, setVal] = useState('');
    return (
      <div style={{ width: 320 }}>
        <InputField
          label="Password"
          type="password"
          passwordToggle
          value={val}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setVal(e.target.value)}
          variant="filled"
          size="md"
        />
      </div>
    );
  },
};

export const LoadingState: Story = {
  args: {
    label: 'Searching',
    placeholder: 'Type to search…',
    loading: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled',
    placeholder: 'Unavailable',
    disabled: true,
  },
};
