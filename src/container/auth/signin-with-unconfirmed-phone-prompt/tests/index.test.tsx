import { reduxRender } from 'utils/test-utils';
import SigninWithUnconfirmedPhonePrompt from '..';

const component = (params = {}) => {
  const props = {};

  return <SigninWithUnconfirmedPhonePrompt {...Object.assign({}, props, params)} />;
};

describe('SigninWithUnconfirmedPhonePrompt', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
