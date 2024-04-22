import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
/**
 * WARNING:
 * - Verify usage of useParams from react-router-dom-v5-compat or v6 package before releasing to production.
 *   Some edge cases are found where useParams returns undefined for some route parameters.
 */
import { CompatRouter } from 'react-router-dom-v5-compat';
import { PersistGate } from 'redux-persist/integration/react';
import { HelmetProvider } from 'react-helmet-async';

import '../constants/application/intrinsicElements';
import { AppRootSwitchRouting } from '../routings/router';
import MetaConfig from '../container/app/meta-config';
import configureStore from '../flows/store.config';
import { initMomentLocale } from '../utils/date-time';

const { store, persistor } = configureStore();

initMomentLocale();

const RootApp = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <CompatRouter>
          <HelmetProvider>
            <MetaConfig />
          </HelmetProvider>
          <AppRootSwitchRouting />
        </CompatRouter>
      </BrowserRouter>
    </PersistGate>
  </Provider>
);

export { store };
export default RootApp;
