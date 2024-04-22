import { reduxRender } from 'utils/test-utils';
import { INITIAL_STATE_AUTH } from 'flows/auth/reducer';
import { INITIAL_STATE_CART } from 'flows/cart/reducer';
import { INITIAL_STATE_SHARED_MODAL } from 'flows/shared-modal/reducer';
import GoogleSigninBlock from '../component';

const component = (params = {}) => {
  const props = {
    onSubmit: jest.fn(),
    authStore: INITIAL_STATE_AUTH,
    cartStore: INITIAL_STATE_CART,
    sharedModalStore: INITIAL_STATE_SHARED_MODAL,
    classes: { container: 'container', button: 'button' },
    openConfirmationModalAction: jest.fn(),
    closeConfirmationModalAction: jest.fn(),
    setGoogleSigninStateAction: jest.fn()
  };

  return <GoogleSigninBlock {...Object.assign({}, props, params)} />;
};

describe('GoogleSigninBlock', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
