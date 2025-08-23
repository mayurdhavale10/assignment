import type { StorybookConfig } from '@storybook/nextjs-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-a11y', '@storybook/addon-themes', '@storybook/addon-docs'],
  framework: {
    name: '@storybook/nextjs-vite',
    options: {}
  },
  async viteFinal(cfg) {
    // Ensure automatic JSX runtime for the stories build
    cfg.esbuild = {
      ...(cfg.esbuild ?? {}),
      jsx: 'automatic'
    };
    return cfg;
  },
};

export default config;
