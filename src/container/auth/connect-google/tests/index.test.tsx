import { reduxRender } from 'utils/test-utils';
import ConnectGoogle from '..';

const component = (params = {}) => {
  const props = {};

  return <ConnectGoogle {...Object.assign({}, props, params)} />;
};

describe('ConnectGoogle', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
