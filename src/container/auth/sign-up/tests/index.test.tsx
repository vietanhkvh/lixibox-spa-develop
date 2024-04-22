import { reduxRender } from 'utils/test-utils';
import Signup from '..';

const component = (params = {}) => {
  const props = {};

  return <Signup {...Object.assign({}, props, params)} />;
};

describe('Signup', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
