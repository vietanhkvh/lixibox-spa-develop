jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import FilterPriceGeneral from '..';

const component = (params = {}) => {
  const props = {
    priceList: [
      {
        name: `Nhỏ hơn 100K`,
        pl: 0,
        ph: 100,
        selected: false
      },
      {
        name: `101K - 200K`,
        pl: 101,
        ph: 200,
        selected: true
      }
    ],
    handleSearch: jest.fn(),
    pl: 1,
    ph: 200,
    maxPrice: 200
  };

  return <FilterPriceGeneral {...Object.assign({}, props, params)} />;
};

describe('FilterPriceGeneral', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
