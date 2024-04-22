import { reduxRender } from 'utils/test-utils';
import SignupVerifyPhone from '..';

const component = (params = {}) => {
  const props = {};

  return <SignupVerifyPhone {...Object.assign({}, props, params)} />;
};

describe('SignupVerifyPhone', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
