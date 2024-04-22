jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import DiscountCodeBoxCategoryDetailContainer from '../container';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    discountCode: 'LXBCOUPON',
    boxCategory: 'special-addons'
  })
}));

const component = (params = {}) => {
  const props = {};

  return <DiscountCodeBoxCategoryDetailContainer {...Object.assign({}, props, params)} />;
};

describe('DiscountCodeBoxCategoryDetailContainer', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
