/**
 * Note:
 * - `react-scripts test` implicitly uses jest configuration `resetMocks: true`
 */

import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import { Crypto } from '@peculiar/webcrypto';

// TODO: Remove all local instances of store mocks as those are no longer needed since we're mocking store globally.
jest.mock('app/init-react-app', () => ({
  store: {
    getState: jest.fn(),
    dispatch: jest.fn()
  }
}));

// eslint-disable-next-line import/first
import { defineYupValidtors } from './utils/validate';

Object.defineProperty(global, 'crypto', { value: new Crypto() });
Object.defineProperty(global, 'TextEncoder', { value: require('util').TextEncoder });

defineYupValidtors();

afterEach(() => {
  localStorage.clear();
  sessionStorage.clear();
});

// FIXME: The following override returns a modified stack track pointing to the patched function instead of the
// erroring source file, which is not ideal. Fix it.
//
// Ignore specific errors
// const ignoreTemplates = [
//   // NOTE: Ignore reason - After upgrading to React 18, the following error was started being thrown
//   //       by the testing library. This is a known issue with React 18 and the testing library.
//   //       This issue is not yet resolved, but the error is not critical and can be ignored until
//   //       the issue is resolved by the testing library.
//   //       See:
//   //         - https://github.com/testing-library/react-testing-library/issues/1051
//   //         - https://github.com/testing-library/react-testing-library/issues/1202
//   // TODO: Remove the following line when the issue is resolved.
//   'Warning: A suspended resource finished loading inside a test, but the event was not wrapped in act(...).',
//   // NOTE: Ignore reason - The following error starts to appear after upgrading to React 18.
//   //       This is a known issue with React 18. This issue is triggered when React 18 encounters
//   //       a component that is using hooks conditionally. While it's not a breaking issue, it needs
//   //       to be fixed. We are leaving this issue as is, since React 18 upgrade PR is already too
//   //       big and we don't want to add more changes to it in order to avoid any potential regressions
//   //       related to the hooks refactoring.
//   //       See: https://github.com/facebook/react/issues/24391
//   // TODO: Remove the following line when all the conditional hooks are refactored.
//   'Warning: Internal React error: Expected static flag was missing. Please notify the React team.'
// ];
// const originalError = console.error.bind(console.error);
// const originalWarning = console.warn.bind(console.warn);
// beforeAll(() => {
//   console.error = function(msg) {
//     if (ignoreTemplates.some((template) => msg.toString().includes(template))) {
//       return;
//     }
//     originalError.apply(console, arguments);
//     // originalError(msg);
//   };
//   console.warn = function(msg) {
//     if (ignoreTemplates.some((template) => msg.toString().includes(template))) {
//       return;
//     }
//     originalWarning.apply(console, arguments);
//     // originalWarning(msg);
//   };
// });
// afterAll(() => {
//   console.error = originalError;
//   console.warn = originalWarning;
// });
// Ignore specific errors
