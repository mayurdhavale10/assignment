/** @jsxImportSource react */
import type { Meta, StoryObj } from "@storybook/nextjs";
import DataTable, { type DataTableProps } from './DataTable';
import * as React from 'react';


// Bind the generic to a concrete type so Storybook can infer args
type User = { id: number; name: string; email: string; age: number };
const DataTableUser = (props: DataTableProps<User>) => <DataTable<User> {...props} />;

const rows: User[] = [
  { id: 1, name: 'Asha', email: 'asha@example.com', age: 24 },
  { id: 2, name: 'Ben', email: 'ben@example.com', age: 30 },
  { id: 3, name: 'Chen', email: 'chen@example.com', age: 28 },
];

const columns: DataTableProps<User>['columns'] = [
  { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
  { key: 'email', title: 'Email', dataIndex: 'email', sortable: true },
  { key: 'age', title: 'Age', dataIndex: 'age', sortable: true },
];

const meta: Meta<typeof DataTableUser> = {
  title: 'UI/DataTable',
  component: DataTableUser,
  parameters: { layout: 'padded' },
};
export default meta;

type Story = StoryObj<typeof DataTableUser>;

export const Basic: Story = {
  args: { data: rows, columns },
};

export const Loading: Story = {
  args: { data: [], columns, loading: true },
};

export const Selectable: Story = {
  args: { data: rows, columns, selectable: true, multiple: true },
};
