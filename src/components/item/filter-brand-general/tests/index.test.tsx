jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import FilterBrandGeneral from '..';

const component = (params = {}) => {
  const props = {
    brandList: [
      {
        id: 13,
        brand_image_url: '/images/original/missing.png',
        description: null,
        name: "A'Pieu",
        slug: 'a-pieu'
      },
      {
        id: 45,
        brand_image_url: '/images/original/missing.png',
        description: null,
        name: 'Aritaum',
        slug: 'aritaum'
      }
    ],
    onSelectBrand: jest.fn(),
    handleSearch: jest.fn(),
    bids: [45]
  };

  return <FilterBrandGeneral {...Object.assign({}, props, params)} />;
};

describe('FilterBrandGeneral', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
