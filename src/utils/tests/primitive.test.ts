import { areDifferentPrimitiveArrays } from '../primitive';

describe('areDifferentPrimitiveArrays', () => {
  it('should return true if number only arrays are different', () => {
    expect(areDifferentPrimitiveArrays([1, 2, 3], [1, 2, 4])).toBe(true);
  });

  it('should return true if string only arrays are different', () => {
    expect(areDifferentPrimitiveArrays(['a', 'b', 'c'], ['a', 'b', 'd'])).toBe(true);
  });

  it('should return true if mixed arrays are different', () => {
    expect(areDifferentPrimitiveArrays([1, 'b', 3], [1, 'b', 4])).toBe(true);
  });

  it('should return true if arrays are different lengths', () => {
    expect(areDifferentPrimitiveArrays([1, 2, 3], [1, 2, 3, 4])).toBe(true);
  });

  it('should return false if arrays are the same', () => {
    expect(areDifferentPrimitiveArrays([1, 2, 3], [1, 2, 3])).toBe(false);
  });
});
