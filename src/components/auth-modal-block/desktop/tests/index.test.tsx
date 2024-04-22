import { reduxRender } from 'utils/test-utils';
import AuthModalBlock from '..';
import { AUTH_VIEW } from '../constant';

const component = (params = {}) => {
  const props = {
    initialView: AUTH_VIEW.LOGIN,
    isOpen: true,
    onRequestClose: jest.fn(),
    onClose: jest.fn(),
    referrer: '/'
  };

  return <AuthModalBlock {...Object.assign({}, props, params)} />;
};

describe('AuthModalBlock', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
