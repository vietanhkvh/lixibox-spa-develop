// Switchable validation schema resolver
/* istanbul ignore next */
export const switchResolver = (schemaGenerator) => async (data, context: any) => {
  try {
    const validatedData = await schemaGenerator(context.resolverSwitch).validate(data, {
      abortEarly: false
    });
    return {
      values: validatedData,
      errors: {}
    };
  } catch (err) {
    return {
      values: {},
      errors: err.inner.reduce((acc, error) => {
        acc[error.path] = {
          type: error.type,
          message: error.message
        };
        return acc;
      }, {})
    };
  }
};
