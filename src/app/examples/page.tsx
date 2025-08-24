'use client';

import { useMemo, useState, useCallback } from 'react';
import Link from 'next/link';
import InputField from '@/components/ui/input-field/InputField';
import DataTable, { type Column } from '@/components/ui/data-table/DataTable';

type User = { id: number; name: string; email: string; age: number };

export default function ExamplesPage() {
  // ----------------------------
  // demo data
  // ----------------------------
  const [data, setData] = useState<User[]>([
    { id: 1, name: 'Asha', email: 'asha@example.com', age: 24 },
    { id: 2, name: 'Ben', email: 'ben@example.com', age: 30 },
    { id: 3, name: 'Chen', email: 'chen@example.com', age: 28 },
  ]);

  const columns: Column<User>[] = useMemo(
    () => [
      { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
      { key: 'email', title: 'Email', dataIndex: 'email', sortable: true },
      { key: 'age', title: 'Age', dataIndex: 'age', sortable: true },
    ],
    []
  );

  // ----------------------------
  // add user form
  // ----------------------------
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newAge, setNewAge] = useState<number | ''>('');

  const addUser = useCallback(() => {
    if (!newName.trim() || !newEmail.trim() || newAge === '' || Number(newAge) < 0) return;

    const nextId = (data.length ? Math.max(...data.map(d => d.id)) : 0) + 1;
    setData(prev => [
      ...prev,
      { id: nextId, name: newName.trim(), email: newEmail.trim(), age: Number(newAge) },
    ]);
    setNewName('');
    setNewEmail('');
    setNewAge('');
  }, [newName, newEmail, newAge, data.length]);

  // ----------------------------
  // search & filters
  // ----------------------------
  const [search, setSearch] = useState('');
  const [minAge, setMinAge] = useState<number | ''>('');

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return data
      .filter(u => (q ? u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) : true))
      .filter(u => (minAge === '' ? true : u.age >= Number(minAge)));
  }, [data, search, minAge]);

  // ----------------------------
  // selection from DataTable
  // ----------------------------
  const [selected, setSelected] = useState<User[]>([]);
  const handleRowSelect = useCallback((rows: User[]) => {
    setSelected(rows);
  }, []);

  const deleteSelected = useCallback(() => {
    if (!selected.length) return;
    const ids = new Set(selected.map(s => s.id));
    setData(prev => prev.filter(u => !ids.has(u.id)));
    setSelected([]);
  }, [selected]);

  // ----------------------------
  // pagination
  // ----------------------------
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * pageSize;
  const paged = filtered.slice(start, start + pageSize);

  const gotoPrev = useCallback(() => setPage(p => Math.max(1, p - 1)), []);
  const gotoNext = useCallback(() => setPage(p => Math.min(totalPages, p + 1)), [totalPages]);
  const changePageSize = useCallback((n: number) => {
    setPageSize(n);
    setPage(1);
  }, []);

  // ----------------------------
  // CSV export (filtered rows)
  // ----------------------------
  const exportCsv = useCallback(() => {
    const rows = filtered;
    if (!rows.length) return;

    const headers = ['id', 'name', 'email', 'age'];
    const escape = (v: unknown) => {
      const s = String(v ?? '');
      return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
    };
    const csv = [
      headers.join(','),
      ...rows.map(r => [r.id, r.name, r.email, r.age].map(escape).join(',')),
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'users.csv';
    a.click();
    URL.revokeObjectURL(url);
  }, [filtered]);

  return (
    <main className="min-h-screen bg-gray-50 relative overflow-hidden">
      {/* Minimal background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-10 w-32 h-32 bg-gray-100 rounded-full blur-2xl opacity-50"></div>
        <div className="absolute bottom-40 left-20 w-40 h-40 bg-gray-100 rounded-full blur-2xl opacity-30"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-6xl p-8 sm:p-12">
        <header className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gray-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h1 className="text-3xl font-semibold text-gray-900">
              Interactive Examples
            </h1>
          </div>
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-colors duration-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Back to Home</span>
          </Link>
        </header>

        <div className="space-y-8">
          {/* Add user panel - off-white background as requested */}
          <section className="rounded-lg border border-gray-200 bg-[#fafafa] p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-gray-600 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Add a New User</h2>
            </div>
            
            <div className="grid gap-4 sm:grid-cols-4">
              <InputField
                label="Name"
                value={newName}
                onChange={e => setNewName(e.target.value)}
                placeholder="e.g. Alicia"
                variant="outlined"
                size="md"
                clearable
              />
              <InputField
                label="Email"
                value={newEmail}
                onChange={e => setNewEmail(e.target.value)}
                placeholder="you@example.com"
                variant="outlined"
                size="md"
                clearable
              />
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Age</label>
                <input
                  type="number"
                  min={0}
                  value={newAge}
                  onChange={e => setNewAge(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500 transition-colors duration-200"
                  placeholder="e.g. 27"
                />
              </div>
              <div className="flex items-end">
                <button
                  type="button"
                  onClick={addUser}
                  className="w-full rounded-lg bg-gray-900 px-4 py-2.5 text-white font-medium hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                  disabled={!newName.trim() || !newEmail.trim() || newAge === '' || Number(newAge) < 0}
                >
                  Add User
                </button>
              </div>
            </div>
          </section>

          {/* DataTable section - very light gray background as requested */}
          <section className="rounded-lg border border-gray-200 bg-[#f8f9fa] p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-gray-600 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 6h18m-9 8h9m-9 4h9m-9-8V6a2 2 0 012-2h4a2 2 0 012 2v4" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-900">User Data Management</h2>
            </div>

            <div className="space-y-6">
              {/* Controls */}
              <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                {/* Left: search + min age */}
                <div className="flex flex-1 flex-col gap-4 sm:flex-row">
                  <InputField
                    label="Search (name/email)"
                    value={search}
                    onChange={e => {
                      setSearch(e.target.value);
                      setPage(1);
                    }}
                    placeholder="Type to filter…"
                    variant="outlined"
                    size="md"
                    clearable
                  />
                  <div className="min-w-[140px]">
                    <label htmlFor="minAge" className="mb-2 block text-sm font-medium text-gray-700">
                      Minimum Age
                    </label>
                    <input
                      id="minAge"
                      type="number"
                      min={0}
                      value={minAge}
                      onChange={e => {
                        const v = e.target.value;
                        setMinAge(v === '' ? '' : Number(v));
                        setPage(1);
                      }}
                      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500 transition-colors duration-200"
                      placeholder="e.g. 25"
                    />
                  </div>
                </div>

                {/* Right: actions */}
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={exportCsv}
                    className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                    title="Export filtered rows to CSV"
                    disabled={!filtered.length}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Export CSV
                  </button>

                  <button
                    type="button"
                    onClick={deleteSelected}
                    disabled={!selected.length}
                    className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                    aria-disabled={!selected.length}
                    title={selected.length ? `Delete ${selected.length} selected` : 'No rows selected'}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete Selected ({selected.length})
                  </button>
                </div>
              </div>

              {/* Table */}
              <div className="bg-white/60 backdrop-blur-sm rounded-xl border border-slate-200/40 shadow-lg overflow-hidden">
                <DataTable<User>
                  data={paged}
                  columns={columns}
                  selectable
                  multiple
                  onRowSelect={handleRowSelect}
                  emptyText={filtered.length ? 'No rows on this page' : 'No users match the filter'}
                />
              </div>

              {/* Pagination */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 text-sm bg-white/40 backdrop-blur-sm rounded-xl p-4 border border-white/40">
                <div className="text-slate-600 font-medium">
                  Showing <span className="font-bold text-slate-800">{filtered.length ? start + 1 : 0}</span>&ndash;<span className="font-bold text-slate-800">{Math.min(filtered.length, start + pageSize)}</span> of{' '}
                  <span className="font-bold text-slate-800">{filtered.length}</span> users
                </div>
                <div className="flex items-center gap-3">
                  <label className="text-slate-600 font-medium">Rows per page</label>
                  <select
                    value={pageSize}
                    onChange={e => changePageSize(Number(e.target.value))}
                    className="rounded-lg border border-slate-200/60 bg-white/90 backdrop-blur-sm px-3 py-1.5 text-sm shadow-sm focus:border-slate-400/60 focus:outline-none focus:ring-2 focus:ring-slate-200/40 transition-all duration-200"
                  >
                    {[5, 10, 20, 50].map(n => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={gotoPrev}
                      disabled={safePage <= 1}
                      className="rounded-lg border border-slate-200/60 bg-white/90 backdrop-blur-sm px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50/90 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md transition-all duration-200"
                    >
                      Previous
                    </button>
                    <span className="px-2 py-1 text-sm font-medium text-slate-600">
                      Page <span className="font-bold text-slate-800">{safePage}</span> of <span className="font-bold text-slate-800">{totalPages}</span>
                    </span>
                    <button
                      type="button"
                      onClick={gotoNext}
                      disabled={safePage >= totalPages}
                      className="rounded-lg border border-slate-200/60 bg-white/90 backdrop-blur-sm px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50/90 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md transition-all duration-200"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* How to use it */}
          <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-gray-600 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">How to Use These Components</h3>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Sort</h4>
                  <p className="text-gray-600 text-sm">Click on column headers (Name, Email, Age) to sort data.</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Select</h4>
                  <p className="text-gray-600 text-sm">Use checkboxes for multi-select. Header has &ldquo;Select All&rdquo; option.</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Delete</h4>
                  <p className="text-gray-600 text-sm">Select rows and click &ldquo;Delete Selected&rdquo; button.</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Filter</h4>
                  <p className="text-gray-600 text-sm">Set minimum age to filter users by age threshold.</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Search</h4>
                  <p className="text-gray-600 text-sm">Type in search box to filter by name or email.</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Export</h4>
                  <p className="text-gray-600 text-sm">Download current filtered data as CSV file.</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}