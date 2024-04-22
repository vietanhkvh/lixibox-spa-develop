import { createStore, applyMiddleware, compose } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { createMigrate, persistStore, persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import localForage from 'localforage';

import migrations from './migrations';
import promiseMiddleware from '../middleware/promise';
import trackingMiddleware from '../middleware/tracking';
import gaTrackingMiddleware from '../middleware/ga-tracking';
import createRootReducer from './reducer.root';

const persistConfig = {
  key: 'root',
  storage: localForage,
  version: 23041801,
  migrate: createMigrate(migrations, { debug: 'development' === process.env.REACT_APP_ENV }),
  stateReconciler: autoMergeLevel2,
  whitelist: ['auth']
};

function _configureStore() {
  const rootReducer = createRootReducer();
  type RootState = ReturnType<typeof rootReducer>;
  const persistedRootReducer = persistReducer<RootState>(persistConfig, rootReducer);

  // TODO: Replace `createStore` with `configureStore`, after the store is fully serialized and all asyncDispatch and non-serializable actions are removed.
  const store = createStore(
    persistedRootReducer,
    {},
    compose(
      applyMiddleware(..._getMiddleware()),
      'production' !== process.env.REACT_APP_ENV && window.__REDUX_DEVTOOLS_EXTENSION__
        ? window.__REDUX_DEVTOOLS_EXTENSION__()
        : (f) => f
    )
  );

  // TODO: Replace the above store declaration with the following one, after the store is fully serialized and all asyncDispatch and non-serializable actions are removed.
  // const store = configureStore({
  //   reducer: persistedRootReducer,
  //   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(_getMiddleware()),
  //   devTools: 'production' !== process.env.REACT_APP_ENV
  // });

  const persistor = persistStore(store);

  return { store, persistor };
}

function _getMiddleware() {
  let middleware = [promiseMiddleware, trackingMiddleware, gaTrackingMiddleware, thunk];

  if ('development' === process.env.REACT_APP_ENV) {
    middleware = [...middleware, logger];
  }

  return middleware;
}

export default _configureStore;
