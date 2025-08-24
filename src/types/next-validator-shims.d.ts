// Shims for Next’s generated .next/types/validator.ts so editors stop complaining.

/* eslint-disable @typescript-eslint/no-empty-interface */

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
type LayoutProps<T = unknown> = unknown;
