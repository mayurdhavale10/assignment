// Extend Vitest's expect with jest-dom matchers
import '@testing-library/jest-dom';

// (Optional) — you can also add other global setups here, e.g. mock server, cleanup, etc.
// Example: auto-cleanup between tests
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

afterEach(() => {
  cleanup();
});
