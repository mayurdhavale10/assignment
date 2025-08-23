import React from 'react';
import { render, screen } from '@testing-library/react';
import DataTable, { type Column } from './DataTable';

type User = { id: number; name: string; email: string; age: number };

const rows: User[] = [
  { id: 1, name: 'Asha', email: 'asha@example.com', age: 24 },
  { id: 2, name: 'Ben', email: 'ben@example.com', age: 30 },
];

const columns: Column<User>[] = [
  { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
  { key: 'email', title: 'Email', dataIndex: 'email', sortable: true },
  { key: 'age', title: 'Age', dataIndex: 'age', sortable: true },
];

describe('DataTable', () => {
  it('renders headers and rows', () => {
    render(<DataTable<User> data={rows} columns={columns} />);
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Age')).toBeInTheDocument();

    expect(screen.getByText('Asha')).toBeInTheDocument();
    expect(screen.getByText('Ben')).toBeInTheDocument();
  });

  it('shows loading state', () => {
    render(<DataTable<User> data={[]} columns={columns} loading />);
    expect(screen.getByText(/Loading…/i)).toBeInTheDocument();
  });

  it('shows empty state', () => {
    render(<DataTable<User> data={[]} columns={columns} />);
    expect(screen.getByText('No data')).toBeInTheDocument();
  });
});
