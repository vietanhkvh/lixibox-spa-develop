jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import DeliveryList from '../component';

const component = (params = {}) => {
  const props = {};

  return <DeliveryList {...Object.assign({}, props, params)} />;
};

describe('DeliveryList', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
