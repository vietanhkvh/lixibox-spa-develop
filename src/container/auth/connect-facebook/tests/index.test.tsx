import { reduxRender } from 'utils/test-utils';
import ConnectFacebook from '..';

const component = (params = {}) => {
  const props = {};

  return <ConnectFacebook {...Object.assign({}, props, params)} />;
};

describe('ConnectFacebook', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
