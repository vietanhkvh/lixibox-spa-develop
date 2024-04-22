import { reduxRender } from 'utils/test-utils';
import SigninAttachPhoneStep1 from '..';

const component = (params = {}) => {
  const props = {};

  return <SigninAttachPhoneStep1 {...Object.assign({}, props, params)} />;
};

describe('SigninAttachPhoneStep1', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });

  test(`renders2`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
