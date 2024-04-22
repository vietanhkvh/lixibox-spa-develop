jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));

import MobileCategory from '../component';
import { reduxRender } from 'utils/test-utils';

const data = [
  {
    iconProps: {
      className: 'style_backIcon__fQSQ1',
      name: 'cosmetics'
    },
    id: 'uniqe-category-id',
    name: 'Danh mục',
    onClick: function onClick() {},
    type: 'popUp'
  },

  {
    icon: {
      default_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/user_interface/shortcuts/icons/000/000/023/default/1682350909.png',
      original_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/user_interface/shortcuts/icons/000/000/023/original/1682350909.png'
    },
    id: 23,
    link: 'https://www.lixibox.com/stores',
    name: 'Cửa hàng',
    shortcutable_id: null,
    shortcutable_type: null,
    slug: null
  },
  {
    icon: {
      default_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/user_interface/shortcuts/icons/000/000/013/default/1599533716.png',
      original_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/user_interface/shortcuts/icons/000/000/013/original/1599533716.png'
    },
    id: 13,
    link: 'https://www.lxb-be.click/category/new-box',
    name: 'Hộp làm đẹp',
    shortcutable_id: 848,
    shortcutable_type: 'BrowseNode',
    slug: 'new-box'
  }
];

const props = {
  isSmallSize: false,
  list: data
};

describe('Item', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(<MobileCategory {...props} />, { initialState: {} });
    }).not.toThrow();
  });
});
