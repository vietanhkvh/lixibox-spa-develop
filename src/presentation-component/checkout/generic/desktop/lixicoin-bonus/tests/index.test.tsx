jest.mock('../../../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../../../utils/test-utils';
import LixicoinBonus from '..';

const component = (params = {}) => {
  const props = {
    lixicoinBonus: 1000
  };

  return <LixicoinBonus {...Object.assign({}, props, params)} />;
};

describe('LixicoinBonus', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
