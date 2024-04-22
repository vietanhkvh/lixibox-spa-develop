import { withRouter } from 'react-router-dom';
jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import { CDN_ASSETS_PREFIX } from '../../../../utils/uri';
import ProductShopToLook from '..';

const itemImage1 = CDN_ASSETS_PREFIX('/landing-page/lustre-makeup/product-shop-the-look-001.jpg');
const shopTheLooks = [
  {
    id: 1,
    bgImg: itemImage1,
    productList: [
      {
        id: 1,
        name: 'Lustre Micro Brow Professional Line Dark Taupe',
        img: 'https://upload.lixibox.com/system/pictures/files/000/023/624/large/1502356637.jpg',
        url: 'https://www.lixibox.com/shop/lustre-micro-brow-professional-line-dark-taupe'
      },
      {
        id: 2,
        name: 'Lustre Liquid Eyeliner Professional Line - Jet Black',
        img: 'https://upload.lixibox.com/system/pictures/files/000/023/682/large/1503313649.jpg',
        url: 'https://www.lixibox.com/shop/lustre-liquid-eyeliner-professional-line-jet-black'
      },
      {
        id: 3,
        name: 'Lustre PRO Pressed Bronzer - Salsa',
        img: 'https://upload.lixibox.com/system/pictures/files/000/032/071/large/1525969735.jpg',
        url: 'https://www.lixibox.com/shop/lustre-pro-bronzer-powder'
      },
      {
        id: 4,
        name: 'Lustre Micro Brow Professional Line Dark Taupe',
        img: 'https://upload.lixibox.com/system/pictures/files/000/032/070/large/1525969700.jpg',
        url: 'https://www.lixibox.com/shop/lustre-pro-bronzer-powder-sun-kissed'
      },
      {
        id: 5,
        name: 'Lustre PRO Pressed Shadow - Taylor Garnet (Shimmer)',
        img: 'https://upload.lixibox.com/system/pictures/files/000/032/084/large/1525970176.jpg',
        url: 'https://www.lixibox.com/shop/lustre-pro-pressed-shadow-taylor-garnet'
      },
      {
        id: 6,
        name: 'Lustre PRO Pressed Shadow - Paris Champagne (Shimmer)',
        img: 'https://upload.lixibox.com/system/pictures/files/000/032/076/large/1525969986.jpg',
        url: 'https://www.lixibox.com/shop/lustre-pro-pressed-shadow-paris-champagne'
      },
      {
        id: 7,
        name: 'Lustre PRO Flawless Matte Foundation SPF 22 PA++ - Rosy Beige',
        img: 'https://upload.lixibox.com/system/pictures/files/000/035/074/large/1537428439.png',
        url: 'https://www.lixibox.com/shop/lustre-pro-flawless-matte-foundation-spf-22-pa-rosy-be'
      }
    ]
  }
];

const component = (params = {}) => {
  const props = {
    shopTheLooks,
    openModal: jest.fn()
  };

  return withRouter((routerProps) => <ProductShopToLook {...Object.assign({}, props, routerProps, params)} />);
};

describe('ProductShopToLook', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
