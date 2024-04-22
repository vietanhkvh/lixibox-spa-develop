import { isSafeData, isSafeFunction } from '../check-safe-data';

test('[Utils Function] Check is safe data', () => {
  const a = { b: { c: 1 } };

  expect(isSafeData(a, [])).toBe(true);
  expect(isSafeData(a, ['b', 'c'])).toBe(true);

  expect(isSafeData(a, ['b', 'd'])).toBe(false);
  expect(isSafeData(a, ['b', 'd', 'e'])).toBe(false);
});

test('[Utils Function] Check is safe function', () => {
  const a = { b: { c: () => {} } };

  expect(isSafeFunction(a, ['b', 'c'])).toBe(true);

  expect(isSafeFunction(a, [])).toBe(false);
  expect(isSafeFunction(a, ['b'])).toBe(false);
  expect(isSafeFunction(a, ['b', 'd'])).toBe(false);
  expect(isSafeFunction(a, ['b', 'd', 'e'])).toBe(false);
});
