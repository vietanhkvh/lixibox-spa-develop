import Modal from 'react-modal';
jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { act } from '@testing-library/react';
import { reduxRender } from 'utils/test-utils';
import { INITIAL_STATE_NOTIFICATION } from 'flows/subcribe/reducer';
import userEvent from '@testing-library/user-event';
import { storageKey } from 'constants/application/client-storage';
import SubscribeEmailModal from '../component';

Modal.setAppElement(document.body.appendChild(document.createElement('div')));
const component = (params = {}) => {
  const props = {
    subcribeStore: INITIAL_STATE_NOTIFICATION,
    sendSubcribeInfoAction: jest.fn()
  };
  return <SubscribeEmailModal {...Object.assign({}, props, params)} />;
};
const user = userEvent.setup();

describe('SubscribeEmailModal', () => {
  test(`renders`, async () => {
    expect(async () => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });

  test(`submit input value`, async () => {
    localStorage.removeItem(storageKey.HAS_SHOW_SUBSCRIBE_MODAL);

    const sendSubcribeInfoAction = jest.fn();

    reduxRender(component({ sendSubcribeInfoAction }), { initialState: {} });
    const inputVal = 'test@gmail.com';
    await user.click(document.getElementsByClassName('minimalContainer')[0]);

    const input = document.getElementById('subscribe');
    await user.type(input, inputVal);

    expect(input).toHaveValue(inputVal);
    const btnSubmit = document.getElementsByClassName('btnSubmit')[0];

    await user.click(btnSubmit);

    expect(sendSubcribeInfoAction).toBeCalled();
  });

  test(`fire click event to active modal desktop`, async () => {
    reduxRender(component(), { initialState: {} });
    const eleMini = document.getElementsByClassName('minimalContainer')[0];
    expect(eleMini).toBeInTheDocument();
    await user.click(eleMini);

    const eleFull = document.getElementsByClassName('desktopContainer')[0];
    expect(eleFull).toBeInTheDocument();
  });

  test(`auto maximized ui on desktop`, async () => {
    jest.useFakeTimers();

    reduxRender(component(), { initialState: { auth: { signInStatus: false } } });
    let eleFull = null;

    act(() => {
      jest.runOnlyPendingTimers();
    });
    const timeout = setTimeout(() => {
      eleFull = document.getElementsByClassName('desktopContainer')[0];
      expect(eleFull).toBeInTheDocument();
    }, 5000);
    clearTimeout(timeout);
    jest.useRealTimers();
  });

  test(`auto maximized ui on mobile`, async () => {
    const resizeWindow = (width, height) => {
      global.innerWidth = width;
      global.innerHeight = height;
      expect(window.innerWidth).toBe(width);
      expect(window.innerHeight).toBe(height);
    };

    resizeWindow(390, 844);
    const now = new Date();
    const yesterday = new Date().setDate(now.getDate() - 1);

    localStorage.setItem(storageKey.WELCOME_GIFT_LAST_AUTO_MAXIMIZED_AT, new Date(yesterday).toString());
    reduxRender(component(), { initialState: { auth: { signInStatus: false } } });
    jest.useFakeTimers();
    act(() => {
      jest.runOnlyPendingTimers();
    });

    const timeout = setTimeout(() => {
      const eleFull = document.getElementsByClassName('mobileContainer')[0];
      expect(eleFull).toBeInTheDocument();
    }, 5000);

    clearTimeout(timeout);
    jest.useRealTimers();
  });
});
