jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import { ORDER_TYPE } from '../../../../constants/application/order';
import OrderStatusLabel from '..';

const component = (params = {}) => {
  const props = {
    type: ORDER_TYPE.CONFIRMED
  };

  return <OrderStatusLabel {...Object.assign({}, props, params)} />;
};

describe('OrderStatusLabel', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
