// .storybook/preview.ts
import type { Preview } from '@storybook/react';
// Import your app globals (Tailwind etc). Adjust the path if needed:
import '../src/app/globals.css';

// Optional: nice theme toggle that switches a class on <body>
import { withThemeByClassName } from '@storybook/addon-themes';

const preview: Preview = {
  decorators: [
    withThemeByClassName({
      themes: {
        light: 'light',
        dark: 'dark',
      },
      defaultTheme: 'light',
    }),
  ],
  parameters: {
    controls: {
      expanded: true,
      matchers: { color: /(background|color)$/i, date: /Date$/i },
    },
    // Background swatches in the toolbar (independent of the theme toggle)
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#0b0b0b' },
        { name: 'gray', value: '#f4f4f5' },
      ],
    },
    a11y: { manual: false },
    layout: 'padded',
  },
};

export default preview;
