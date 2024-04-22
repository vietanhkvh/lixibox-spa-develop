import { reduxRender } from 'utils/test-utils';
import CheckoutFastTrack from '..';

const component = (params = {}) => {
  const props = {};

  return <CheckoutFastTrack {...Object.assign({}, props, params)} />;
};

describe('CheckoutFastTrack', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
