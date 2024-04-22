import { reduxRender } from 'utils/test-utils';
import SigninAttachPhoneStep2 from '..';

const component = (params = {}) => {
  const props = {};

  return <SigninAttachPhoneStep2 {...Object.assign({}, props, params)} />;
};

describe('SigninAttachPhoneStep2', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
