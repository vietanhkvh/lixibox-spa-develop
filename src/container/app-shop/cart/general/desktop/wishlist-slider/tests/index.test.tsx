import { withRouter } from 'react-router-dom';
jest.mock('../../../../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../../../../utils/test-utils';
import { INITIAL_STATE_CART } from '../../../../../../../flows/cart/reducer';
import AddonSlider from '../container';

const addOnList = [
  {
    id: 12196,
    brand_name: 'Quà Tặng',
    is_individual: true,
    is_saleable: false,
    name: 'Dây cột tóc caro hồng',
    original_price: 20000,
    price: 9000,
    primary_picture: {
      facebook_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/060/303/facebook/1625801725.jpg?t=1628757502',
      large_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/060/303/large/1625801725.jpg?t=1628757502',
      medium_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/060/303/medium/1625801725.jpg?t=1628757502',
      original_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/060/303/original/1625801725.jpg?t=1628757502',
      square_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/060/303/square/1625801725.jpg?t=1628757502',
      thumb_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/060/303/thumb/1625801725.jpg?t=1628757502',
      vertical_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/060/303/vertical/1625801725.jpg?t=1628757502'
    },
    short_description: 'Dây cột tóc caro hồng',
    slug: 'day-cot-toc-caro-hong',
    status: 'approved'
  },
  {
    id: 12133,
    brand_name: 'Quà Tặng',
    is_individual: true,
    is_saleable: true,
    name: 'Bông Tắm Lixibox',
    original_price: 50000,
    price: 15000,
    primary_picture: {
      facebook_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/059/754/facebook/1624865009.jpg?t=1628764328',
      large_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/059/754/large/1624865009.jpg?t=1628764328',
      medium_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/059/754/medium/1624865009.jpg?t=1628764328',
      original_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/059/754/original/1624865009.jpg?t=1628764328',
      square_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/059/754/square/1624865009.jpg?t=1628764328',
      thumb_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/059/754/thumb/1624865009.jpg?t=1628764328',
      vertical_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/pictures/files/000/059/754/vertical/1624865009.jpg?t=1628764328'
    },
    short_description: 'Short description',
    slug: 'bong-tam-lixibox',
    status: 'approved'
  }
];

const component = (params = {}) => {
  const props = {
    cartStore: Object.assign({}, INITIAL_STATE_CART, {
      addOnList
    })
  } as any;

  return withRouter((routerProps) => <AddonSlider {...Object.assign({}, props, routerProps, params)} />);
};

describe('AddonSlider', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
