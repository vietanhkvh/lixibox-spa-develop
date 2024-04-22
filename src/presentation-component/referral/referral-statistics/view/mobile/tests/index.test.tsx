jest.mock('../../../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../../../utils/test-utils';
import View from '..';

const component = (params = {}) => {
  const props = {
    lixicoin: 12345,
    balance: 125000
  };

  return <View {...Object.assign({}, props, params)} />;
};

describe('View', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
