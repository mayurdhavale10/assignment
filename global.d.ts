// Shims to satisfy Next’s generated .next/types/validator.ts

// The validator imports a synthetic routes file. Use a wildcard (NOT relative).
declare module '*routes.js' {
  export type AppRoutes = any;
  export type LayoutRoutes = any;
  export type ParamMap = Record<string, any>;
}

// The validator sometimes imports a synthetic ".jsxs" artifact for page modules.
declare module '*.jsxs' {
  const anyExport: any;
  export = anyExport;
}

// The validator references LayoutProps in a generic constraint.
type LayoutProps<T = any> = any;
