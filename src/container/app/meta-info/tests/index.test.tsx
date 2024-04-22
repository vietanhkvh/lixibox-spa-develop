import { withRouter } from 'react-router';
jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import { INITIAL_STATE_META } from '../../../../flows/meta/reducer';
import MetaInfo from '../container';

const component = (params = {}) => {
  const props = {
    updateMetaInfoAction: jest.fn(),
    url: 'http://www.lixibox.com/halio',
    info: INITIAL_STATE_META.info,
    product: {
      id: '111',
      slug: 'product-1',
      brand: 'lixibox',
      stock: 10,
      condition: 'new',
      priceAmount: 100000,
      priceCurrency: 'VND',
      retailerItemId: '111',
      rating: 4
    },
    structuredData: {
      breadcrumbList: [
        {
          position: 1,
          name: 'Subtype 1',
          item: `https://www.lixibox.com/category/subtype-1`
        },
        {
          position: 2,
          name: 'Subtype 2',
          item: `https://www.lixibox.com/category/subtype-2`
        }
      ]
    }
  };

  return withRouter<any, any>(<MetaInfo {...Object.assign({}, props, params)} />);
};

describe('MetaInfo', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
