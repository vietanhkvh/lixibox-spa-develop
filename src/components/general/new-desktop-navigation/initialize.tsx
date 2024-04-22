import classnames from 'classnames';
import {
  ROUTING_COMMUNITY_PATH,
  ROUTING_MAGAZINE,
  ROUTING_USER_INVITE,
  ROUTING_SHOP_GIFT_CATEGORY,
  ROUTING_SHOP_BEAUTY_CATEGORY,
  ROUTING_STORE_INDEX,
  ROUTING_ORDERS_TRACKINGS_PATH,
  ROUTING_LIXI_COIN,
  ROUTING_BALANCE,
  ROUTING_BRAND_DETAIL_PATH
} from '../../../routings/path';
import { CDN_ASSETS_PREFIX } from '../../../utils/uri';
import Image from 'presentation-component/ui/image';
import { DOWNLOAD_APP_URL } from '../../../constants/application/social';

import tracking from './tracking';
import style from './style.module.scss';
import { ICategory } from './model';

const iosDownload = CDN_ASSETS_PREFIX('/app-icon/ios-app.png');
const androidDownload = CDN_ASSETS_PREFIX('/app-icon/android-app.png');
const QR_CODE = CDN_ASSETS_PREFIX('/footer/lixibox-app-qr.png');

export const DEFAULT_PROPS = {
  fixHeader: false,
  listMenu: []
};

export const INITIAL_STATE = {
  alphaBetBrandSelected: '',
  idShoppingCat: 'menu-product-0',
  subMenuDesktop: {
    show: false,
    id: ''
  },
  listCategoryReject: [841, 992, 844],
  isActiveMenu: false,
  listRootNavigation: [
    {
      id: 'gift',
      link: `${ROUTING_SHOP_GIFT_CATEGORY}`,
      title: 'SHOP GIFTS',
      isHighLight: true
    },
    {
      id: 'category',
      link: `${ROUTING_SHOP_BEAUTY_CATEGORY}`,
      title: 'SHOP BEAUTY',
      tracking: (type) => 'function' === typeof tracking[type] && tracking[type](1),
      isHighLight: false
    },
    {
      id: 'special',
      link: '#',
      title: 'ƯU ĐÃI',
      isHighLight: false
    },
    {
      id: 'brand',
      link: '#',
      title: 'THƯƠNG HIỆU',
      isHighLight: false
    },
    {
      id: 'invite',
      link: `${ROUTING_USER_INVITE}`,
      title: 'GIỚI THIỆU BẠN BÈ',
      isHighLight: true
    },
    // {
    //   id: 'service',
    //   link: '#',
    //   title: 'STORE & SERVICE'
    // },
    {
      id: 'magazine',
      link: `${ROUTING_MAGAZINE}`,
      title: 'MAGAZINE',
      isHighLight: false
    },
    {
      id: 'community',
      link: `${ROUTING_COMMUNITY_PATH}`,
      title: 'FEED',
      isHighLight: true,
      icon: 'youtube'
    }
  ]
};

export const fixedDataRaw: ICategory[] = [
  {
    id: 'category',
    icon: {
      name: 'menu',
      className: style.iconCategory
    },
    title: 'Danh mục sản phẩm'
  },
  {
    id: 'divide',
    title: '|',
    hoverable: false
  }
];
export const leffDataRaw: ICategory[] = [
  {
    id: 'special',
    icon: {
      name: 'gift'
      //   className: style.smaller
    },
    title: 'Hot Deals', // NOTE: Default title: "Hot Deals", will be setted to another value if there is a value from api response
    posIcon: {
      name: 'angle-down',
      className: style.iconDropdown
    }
  },
  // NOTE: Temporarily removed as per request from the e-com team
  // {
  //   id: 'gift',
  //   title: 'Quà tặng',
  //   url: `${ROUTING_SHOP_GIFT_CATEGORY}`
  // },
  // TODO: Restore the following link after brands page is revamped
  {
    id: 'brand',
    title: 'Thương hiệu',
    url: `${ROUTING_BRAND_DETAIL_PATH}`
  },
  {
    id: 'invite',
    title: 'Giới thiệu bạn bè',
    url: `${ROUTING_USER_INVITE}`
  },
  {
    id: 'download-app',
    icon: { name: 'qr-code' },
    title: 'Tải ứng dụng - Nhận voucher 500k',
    className: style.downloadApp,
    dropDownContent: (
      <div className={classnames(style.dropdown, style.qr)}>
        <div className={style.download}>
          <div className={style.left}>
            <Image src={QR_CODE} className={style.qr} alt={''} />
          </div>
          <div className={style.right}>
            <a
              className={style.item}
              target={'_blank'}
              rel="noreferrer"
              href={DOWNLOAD_APP_URL.shopping.ios}
              onClick={(e) => e.stopPropagation()}
            >
              <Image alt={''} src={iosDownload} className={style.image} />
            </a>
            <a
              className={style.item}
              target={'_blank'}
              rel="noreferrer"
              href={DOWNLOAD_APP_URL.shopping.android}
              onClick={(e) => e.stopPropagation()}
            >
              <Image src={androidDownload} className={style.image} alt={''} />
            </a>
          </div>
        </div>
      </div>
    )
  }
];
export const rightDataRaw: ICategory[] = [
  {
    id: 'cashback',
    icon: {
      name: 'dollar-time'
    },
    title: 'Hoàn tiền',
    isHighlighted: true,
    url: `${ROUTING_BALANCE}`,
    className: style.itemRight
  },
  {
    id: 'lixicoin',
    icon: {
      name: 'dollar'
    },
    title: 'Lixicoin',
    url: `${ROUTING_LIXI_COIN}`,
    className: style.itemRight
  },
  {
    id: 'store',
    icon: {
      name: 'store'
    },
    title: 'Cửa hàng',
    url: `${ROUTING_STORE_INDEX}`,
    className: style.itemRight
  },
  {
    id: 'delivery',
    icon: {
      name: 'delivery',
      className: style.iconDelivery
    },
    title: 'Đơn hàng',
    url: `${ROUTING_ORDERS_TRACKINGS_PATH}`,
    className: style.itemRight
  }
];
export const optionalDataRaw = {
  data: null,
  size: 'small',
  icon: { position: 'left', name: { main: 'flash', divide: 'divide' } },
  enable: {
    day: {
      block: false
    },
    hour: {
      block: true,
      text: false
    },
    minute: {
      block: true,
      text: false
    },
    second: {
      block: true,
      text: false
    }
  }
};
