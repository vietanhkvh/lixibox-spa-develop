export const areDifferentPrimitiveArrays = (a: any[], b: any[]): boolean => {
  if (a.length !== b.length) {
    return true;
  }

  // shallow compare
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      return true;
    }
  }

  return false;
};
