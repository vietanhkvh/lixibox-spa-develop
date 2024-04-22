import { reduxRender } from 'utils/test-utils';
import ForgotPassword from '..';

const component = (params = {}) => {
  const props = {};

  return <ForgotPassword {...Object.assign({}, props, params)} />;
};

describe('ForgotPassword', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
