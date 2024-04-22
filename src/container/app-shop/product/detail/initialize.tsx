import { IProductDetailContainerProps, IProductDetailContainerState } from './model';
import { stringToHash } from '../../../../utils/encode';
import { CDN_ASSETS_PREFIX } from '../../../../utils/uri';

export const DEFAULT_PROPS = {
  feedbackPerPage: 10,
  isExclusiveBrand: false
} as IProductDetailContainerProps;

export const INITIAL_STATE = (idProduct) => {
  const extractedNumber = parseInt(idProduct);
  const isSlugWithNumber = !isNaN(extractedNumber) && extractedNumber + '' === idProduct;

  if (!!isSlugWithNumber) return { isFetchProductDetailFail: true } as IProductDetailContainerState;

  return {
    isOpenSavingBoxModal: false,
    isOpenDiscountCodeModal: false,
    isOpenSizeGuideModal: false,
    isOpenStoreModal: false,
    isOpenStoreMapModal: false,
    isOpenCitySelectionModal: false,
    isOpenCashbackInfoModal: false,
    storeMapUrl: '',
    idProduct,
    idProductHash: stringToHash(idProduct),
    isFixedToolbar: false,
    isFetchProductDetailFail: false,
    isLoadingFeedback: true,
    likedIdList: [],

    trackingCode: '',
    expTrackingCode: '',
    referrerObjectType: '',
    referrerObjectId: '',
    feedbackUrlList: [],
    discussionUrlList: [],
    feedbackPage: 1,
    discussionPage: 1,
    isPriceBtnOnTop: false,
    heightPriceBtnToTop: 0,
    feedbackPosition: 0,
    discussionPosition: 0,
    isFetchListFeedback: false,
    isFetchLoveBox: false,
    isFetchMagazineForBox: false,
    isFetchSavingBox: false,
    isFetchRelatedBox: false,
    isFetchWatchedList: false,
    isFetchShopTheLook: false,
    isPriorotyBlock: true,
    isOpenFeedbackModal: false,
    isOpenDiscussionModal: false,
    nextVariantId: ''
  } as IProductDetailContainerState;
};

const productShopTheLook001 = CDN_ASSETS_PREFIX('/landing-page/lustre-makeup/product-shop-the-look-001.jpg');
const productShopTheLook002 = CDN_ASSETS_PREFIX('/landing-page/lustre-makeup/product-shop-the-look-002.jpg');
const productShopTheLook003 = CDN_ASSETS_PREFIX('/landing-page/lustre-makeup/product-shop-the-look-003.jpg');

export const shopTheLooks = [
  {
    id: 1,
    bgImg: productShopTheLook001,
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
  },
  {
    id: 2,
    bgImg: productShopTheLook002,
    productList: [
      {
        id: 1,
        name: 'Lustre Brow Pomade Professional Line - Urbane Bronze',
        img: 'https://upload.lixibox.com/system/pictures/files/000/032/088/large/1525971021.png',
        url: 'https://www.lixibox.com/shop/lustre-dip-brow'
      },
      {
        id: 2,
        name: 'Lustre Liquid Eyeliner Professional Line - Jet Black',
        img: 'https://upload.lixibox.com/system/pictures/files/000/023/682/large/1503313649.jpg',
        url: 'https://www.lixibox.com/shop/lustre-liquid-eyeliner-professional-line-jet-black'
      },
      {
        id: 3,
        name: 'Lustre PRO Pressed Shadow - X-Tina Taupe (Matte)',
        img: 'https://upload.lixibox.com/system/pictures/files/000/032/081/large/1525970104.jpg',
        url: 'https://www.lixibox.com/shop/lustre-pro-pressed-shadow-x-tina-taupe'
      },
      {
        id: 4,
        name: 'Lustre PRO Pressed Shadow - Selena Umber (Matte)',
        img: 'https://upload.lixibox.com/system/pictures/files/000/032/067/large/1525969565.jpg',
        url: 'https://www.lixibox.com/shop/lustre-pro-pressed-shadow-selena-umber'
      },
      {
        id: 5,
        name: 'Lustre PRO Pressed Highlighter - Sun Kissed',
        img: 'https://upload.lixibox.com/system/pictures/files/000/032/070/large/1525969700.jpg',
        url: 'https://www.lixibox.com/shop/lustre-pro-bronzer-powder-sun-kissed'
      },
      {
        id: 6,
        name: 'Lustre PRO Pressed Bronzer - Salsa',
        img: 'https://upload.lixibox.com/system/pictures/files/000/032/071/large/1525969735.jpg',
        url: 'https://www.lixibox.com/shop/lustre-pro-bronzer-powder'
      },
      {
        id: 7,
        name: 'Lustre PRO Flawless Matte Foundation SPF 22 PA++ - Rosy Beige',
        img: 'https://upload.lixibox.com/system/pictures/files/000/035/074/large/1537428439.png',
        url: 'https://www.lixibox.com/shop/lustre-pro-flawless-matte-foundation-spf-22-pa-rosy-be'
      }
    ]
  },
  {
    id: 3,
    bgImg: productShopTheLook003,
    productList: [
      {
        id: 1,
        name: 'Lustre Brow Defining Professional Line - Dark Taupe',
        img: 'https://upload.lixibox.com/system/pictures/files/000/023/717/large/1503394523.jpg',
        url: 'https://www.lixibox.com/shop/lustre-brow-defining-professional-line-dark-taupe'
      },
      {
        id: 2,
        name: 'Lustre Liquid Eyeliner Professional Line - Jet Black',
        img: 'https://upload.lixibox.com/system/pictures/files/000/023/682/large/1503313649.jpg',
        url: 'https://www.lixibox.com/shop/lustre-liquid-eyeliner-professional-line-jet-black'
      },
      {
        id: 3,
        name: 'Lustre PRO Pressed Shadow - Miranda Milli (Shimmer)',
        img: 'https://upload.lixibox.com/system/pictures/files/000/032/083/large/1525970149.jpg',
        url: 'https://www.lixibox.com/shop/lustre-pro-pressed-shadow-miranda-milli'
      },
      {
        id: 4,
        name: 'Lustre PRO Pressed Shadow - Charlotte Russet (Matte)',
        img: 'https://upload.lixibox.com/system/pictures/files/000/032/078/large/1525970039.jpg',
        url: 'https://www.lixibox.com/shop/lustre-pro-pressed-shadow-charlotte-russet'
      },
      {
        id: 5,
        name: 'Lustre PRO Pressed Blush - Shading Red',
        img: 'https://upload.lixibox.com/system/pictures/files/000/034/610/large/1535892372.jpg',
        url: 'https://www.lixibox.com/shop/lustre-pro-pressed-blush-shading-red'
      },
      {
        id: 6,
        name: 'Lustre PRO Pressed Bronzer - Salsa',
        img: 'https://upload.lixibox.com/system/pictures/files/000/032/071/large/1525969735.jpg',
        url: 'https://www.lixibox.com/shop/lustre-pro-bronzer-powder'
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
