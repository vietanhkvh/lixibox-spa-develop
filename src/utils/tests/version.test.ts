import { initCheckVersion } from '../version';

describe('initCheckVersion', () => {
  test('executes with no error is thrown', () => {
    expect(() => {
      initCheckVersion();
    }).not.toThrow();
  });
});
