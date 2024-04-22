import { reduxRender } from 'utils/test-utils';
import { INITIAL_STATE_AUTH } from 'flows/auth/reducer';
import { INITIAL_STATE_SHARED_MODAL } from 'flows/shared-modal/reducer';
import { INITIAL_STATE_CART } from 'flows/cart/reducer';
import AppleSigninBlock from '../component';

const component = (params = {}) => {
  const props = {
    authStore: INITIAL_STATE_AUTH,
    cartStore: INITIAL_STATE_CART,
    sharedModalStore: INITIAL_STATE_SHARED_MODAL,
    className: 'testClass',
    authType: 'sign-in' as const,
    openConfirmationModalAction: jest.fn(),
    closeConfirmationModalAction: jest.fn(),
    setAppleSigninStateAction: jest.fn()
  };

  return <AppleSigninBlock {...Object.assign({}, props, params)} />;
};

describe('AppleSigninBlock', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
