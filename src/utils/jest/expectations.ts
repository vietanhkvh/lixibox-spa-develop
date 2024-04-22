declare global {
  namespace jest {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface Matchers<R, T = {}> {
      toHaveComputedStyle(element: any): R;
    }
  }
}

/**
 * toHaveComputedStyle(style: { key[string]: string })
 * Example: `expect(node).toHaveComputedStyle({ cursorEvents: 'none' });`
 */
expect.extend({
  toHaveComputedStyle(received, style) {
    let errorStack: any = [];

    if (!Boolean(received)) {
      return {
        message: () => `Not a valid HTML node`,
        pass: false
      };
    }

    const computed = window.getComputedStyle(received);
    Object.keys(style).forEach((key) => {
      if (computed[key] !== style[key]) {
        errorStack.push({
          message: () => `expected style '${key}' to be '${style[key]}', found '${computed[key]}' instead`,
          pass: false
        });
      }
    });

    if (errorStack.length !== 0) return errorStack[0];

    return {
      message: () => ``,
      pass: true
    };
  }
});

export {};
