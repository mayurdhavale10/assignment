'use client';

import { useState } from 'react';
import Link from 'next/link';
import InputField from '@/components/ui/input-field/InputField';
import DataTable, { type Column } from '@/components/ui/data-table/DataTable';

type User = { id: number; name: string; email: string; age: number };

export default function ExamplesPage() {
  const [email, setEmail] = useState('');

  const rows: User[] = [
    { id: 1, name: 'Asha', email: 'asha@example.com', age: 24 },
    { id: 2, name: 'Ben', email: 'ben@example.com', age: 30 },
    { id: 3, name: 'Chen', email: 'chen@example.com', age: 28 },
  ];

  const columns: Column<User>[] = [
    { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
    { key: 'email', title: 'Email', dataIndex: 'email', sortable: true },
    { key: 'age', title: 'Age', dataIndex: 'age', sortable: true },
  ];

  return (
    <main className="p-8 space-y-10">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Examples</h1>
        <Link href="/" className="text-blue-600 underline">Home</Link>
      </header>

      <section className="max-w-sm space-y-2">
        <h2 className="text-xl font-semibold">InputField</h2>
        <InputField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          helperText="We never share your email."
          variant="outlined"
          size="md"
          clearable
        />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">DataTable</h2>
        <DataTable<User> data={rows} columns={columns} selectable multiple />
      </section>
    </main>
  );
}
