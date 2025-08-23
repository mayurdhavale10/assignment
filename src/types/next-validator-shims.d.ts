// Shims for Next's generated .next/types/validator.ts so VS Code stops complaining.

// The validator imports a synthetic "./routes.js"
declare module './routes.js' {
  export type AppRoutes = any;
  export type LayoutRoutes = any;
  export type ParamMap = Record<string, any>;
}

// The validator may import a synthetic ".jsxs" artifact for pages
declare module '*.jsxs' {
  const anyExport: any;
  export = anyExport;
}

// The validator references LayoutProps in a generic constraint
type LayoutProps<T = any> = any;
