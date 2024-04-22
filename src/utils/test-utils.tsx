import { render as rtlRender } from '@testing-library/react';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { CompatRouter } from 'react-router-dom-v5-compat';
import createRootReducer from '../flows/reducer.root';
import { slugify } from './string';

interface ReduxRenderOptions {
  initialState?: { [key: string]: any };
  store?: any;
  /**
   * @default BrowserRouter
   */
  router?: any;
  /**
   * Route for BrowserRouter
   * @default '/'
   */
  route?: string;
  /**
   * Route history entries for MemoryRouter
   * @default ['/']
   */
  routes?: Array<string>;
  [key: string]: any;
}
export const reduxRender = (ui, options?: ReduxRenderOptions) => {
  const {
    initialState: _initialState,
    store: _store,
    router: _router,
    route: _route,
    routes: _routes,
    ...renderOptions
  } = options || {};
  const defaultOptions = { initialState: {}, store: null, router: BrowserRouter, route: '/', routes: ['/'] };
  const initialState = _initialState || defaultOptions.initialState;
  let store = _store || defaultOptions.store;
  const Router = _router || defaultOptions.router;
  const route = _route || defaultOptions.route;
  const routes = _routes || defaultOptions.routes;

  if (route && Router === BrowserRouter) {
    window.history.pushState({}, 'Test page', route);
  }

  if (!store) {
    const reducer = createRootReducer();
    store = createStore(reducer, initialState, compose(applyMiddleware(thunk)));
  }

  const routerProps = Router === MemoryRouter ? { initialEntries: routes } : {};

  const Wrapper = ({ children }) => (
    <Provider store={store}>
      <Router {...routerProps}>
        <CompatRouter>{children}</CompatRouter>
      </Router>
    </Provider>
  );
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
};

interface GenerateTestIdParams {
  name: string;
  id?: string | number;
}
export const generateTestId = (params?: GenerateTestIdParams) => {
  const props = {};

  if (!params) return props;

  const { name, id } = params;
  if (process.env.REACT_APP_ENV !== 'production' && name) {
    Object.assign(props, { 'data-testid': slugify(`${name}${id ? ` ${id}` : ''}`) });
  }

  return props;
};
