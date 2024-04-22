jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import MobileFilterPanel from '..';

const brandList = [
  {
    brand_id: 796,
    brand_slug: 'lixi-baby',
    brand_name: 'Lixi Baby',
    brand_logo:
      'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/brands/brand_images/000/000/796/original/Screen_Shot_2020-07-01_at_3.13.50_PM.png',
    count: 4
  },
  {
    brand_id: 815,
    brand_slug: 'valiantier',
    brand_name: 'Valiantier',
    brand_logo:
      'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/brands/brand_images/000/000/815/original/TB1T3_qq1GSBuNjSspbSuwiipXa.jpg',
    count: 2
  },
  {
    brand_id: 814,
    brand_slug: 'goryeo-baby',
    brand_name: 'Goryeo Baby',
    brand_logo:
      'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/brands/brand_images/000/000/814/original/download.jpeg',
    count: 1
  },
  {
    brand_id: 806,
    brand_slug: 'nip',
    brand_name: 'Nip',
    brand_logo:
      'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/brands/brand_images/000/000/806/original/NIP-logo.png',
    count: 1
  },
  {
    brand_id: 800,
    brand_slug: 'ange',
    brand_name: 'Ange ',
    brand_logo:
      'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/brands/brand_images/000/000/800/original/tai-xuong.png',
    count: 1
  }
];

const component = (params = {}) => {
  const props = {
    brandList,
    bids: brandList
      .slice(0, 2)
      .map((brand) => brand.brand_slug)
      .join(','),
    minPrice: 0,
    maxPrice: 5000,
    pl: 100,
    ph: 500,
    stockStatus: '',
    onSelect: jest.fn(),
    onRequestClose: jest.fn()
  };

  return <MobileFilterPanel {...Object.assign({}, props, params)} />;
};

describe('MobileFilterPanel', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
