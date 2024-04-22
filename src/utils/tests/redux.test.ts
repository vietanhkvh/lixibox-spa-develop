import { createSlice, configureStore, combineReducers } from '@reduxjs/toolkit';

import { observeStore } from '../redux';

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    incremented: (state) => {
      state.value += 1;
    },
    decremented: (state) => {
      state.value -= 1;
    }
  }
});
const counter2Slice = createSlice({
  name: 'counter2',
  initialState: { value: 0 },
  reducers: {
    incremented: (state) => {
      state.value += 1;
    },
    decremented: (state) => {
      state.value -= 1;
    }
  }
});
const store = configureStore({
  reducer: combineReducers({
    counter: counterSlice.reducer,
    counter2: counter2Slice.reducer
  })
});

describe('observeStore', () => {
  describe(`when selector value is update`, () => {
    test(`callback is invoked with previous and current state`, () => {
      const callback = jest.fn();

      observeStore(store, (state) => state.counter.value, callback);
      store.dispatch(counterSlice.actions.incremented());
      expect(callback).toHaveBeenLastCalledWith(1, 0);
      store.dispatch(counterSlice.actions.incremented());
      expect(callback).toHaveBeenLastCalledWith(2, 1);
      store.dispatch(counterSlice.actions.decremented());
      expect(callback).toHaveBeenLastCalledWith(1, 2);
    });
  });

  describe(`when a non selector value is updated`, () => {
    test(`callback is not invoked`, () => {
      const callback = jest.fn();

      observeStore(store, (state) => state.counter.value, callback);
      store.dispatch(counter2Slice.actions.incremented());
      expect(callback).not.toHaveBeenCalled();
      store.dispatch(counter2Slice.actions.decremented());
      expect(callback).not.toHaveBeenCalled();
    });
  });
});
