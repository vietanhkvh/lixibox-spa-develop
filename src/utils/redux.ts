export const observeStore = (store, select, onChange) => {
  let currentValue = select(store.getState());

  function handleChange() {
    let previousValue = currentValue;
    currentValue = select(store.getState());

    if (previousValue !== currentValue) {
      onChange(currentValue, previousValue);
    }
  }

  return store.subscribe(handleChange);
};
