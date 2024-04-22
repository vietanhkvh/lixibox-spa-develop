jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import DiscountCodeDetailContainer from '../container';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    discountCode: 'LXBCOUPON'
  })
}));

const component = (params = {}) => {
  const props = {};

  return <DiscountCodeDetailContainer {...Object.assign({}, props, params)} />;
};

describe('DiscountCodeDetailContainer', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
