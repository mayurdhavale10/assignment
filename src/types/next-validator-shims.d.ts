// Shims for Next's generated .next/types/validator.ts so editors stop complaining.

declare module './routes.js' {
  // Using string/unknown keeps the types minimal yet valid.
  export type AppRoutes = string;
  export type LayoutRoutes = string;
  export type ParamMap = Record<string, unknown>;
}

declare module '*.jsxs' {
  const anyExport: unknown;
  export = anyExport;
}

// Keep the symbol present but non-problematic for eslint.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type LayoutProps<T = unknown> = unknown;