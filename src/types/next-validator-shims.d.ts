// Shims for Next's generated .next/types/validator.ts so editors stop complaining.

// The validator imports a synthetic "./routes.js"
declare module './routes.js' {
  export type AppRoutes = string;
  export type LayoutRoutes = string;
  export type ParamMap = Record<string, Record<string, unknown>>;
}

// The validator may import a synthetic ".jsxs" artifact for pages
declare module '*.jsxs' {
  const mod: unknown;
  export = mod;
}

// The validator references LayoutProps in a generic constraint.
// Keep it minimal and avoid React types to prevent extra imports.
type LayoutProps<TParam = Record<string, unknown>> = {
  params?: TParam;
  children?: unknown;
};
