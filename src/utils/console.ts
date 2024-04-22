export const ignoreSpecificWarnings = (warningTemplates: string[]) => {
  const ignoreWarning = (warning: string) => {
    const isIgnored = warningTemplates.some((template) => warning.includes(template));
    return isIgnored;
  };

  const consoleWarn = console.warn;
  console.warn = (...args: any[]) => {
    if (!ignoreWarning(args[0])) {
      consoleWarn(...args);
    }
  };

  const consoleError = console.error;
  console.error = (...args: any[]) => {
    if (!ignoreWarning(args[0])) {
      consoleError(...args);
    }
  };
};
