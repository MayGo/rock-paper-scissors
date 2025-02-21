import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

vi.mock('zustand'); // to make it work like Jest (auto-mocking)

// runs a clean after each test case (e.g. clearing jsdom)
afterEach(() => {
    cleanup();
});
