import { reduxRender } from 'utils/test-utils';
import Signin from '..';

const component = (params = {}) => {
  const props = {};

  return <Signin {...Object.assign({}, props, params)} />;
};

describe('Signin', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
