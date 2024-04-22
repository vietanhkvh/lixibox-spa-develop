import { reduxRender } from 'utils/test-utils';
import { INITIAL_STATE_AUTH } from 'flows/auth/reducer';
import { INITIAL_STATE_CART } from 'flows/cart/reducer';
import { INITIAL_STATE_USER } from 'flows/user/reducer';
import { Component as TopHeader } from '../component';

const propsDefault = {
  signOut: jest.fn(),
  searchSugestion: jest.fn(),
  filterSuggestionSelected: jest.fn(),
  filterSearchSuggestionSelect: jest.fn(),
  showHideSearchSuggestionMenu: jest.fn(),
  authStore: INITIAL_STATE_AUTH,
  cartStore: INITIAL_STATE_CART,
  userStore: INITIAL_STATE_USER,
  openAlertAction: jest.fn(),
  backToAdminAction: jest.fn(),
  clearCart: jest.fn(),
  fetchUserProfileAction: jest.fn()
};
const component = (params = {}) => {
  const props = propsDefault;
  return <TopHeader {...Object.assign({}, props, params)} />;
};

describe('TopHeader', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
  test(`renders with fullinfor`, () => {
    reduxRender(component(), { initialState: {} });
    const ele = document.getElementsByClassName('line')[0];
    const listNav = document.getElementsByClassName('listNavItemFeature')[0];
    const icon = document.getElementsByClassName('navItemIconFeature')[0];
    expect(ele).toBeInTheDocument();
    expect(listNav).toBeInTheDocument();
    expect(icon).toBeInTheDocument();
  });
});
