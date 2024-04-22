import { withRouter } from 'react-router-dom';
import { reduxRender } from '../../../../utils/test-utils';
import NavigationCategory from '..';

jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));

const listMenu = {
  browse_nodes: [
    {
      id: 847,
      cover_image: {
        large_url: '/images/large/missing.png'
      },
      icon: {
        large_url: '/icons/large/missing.png',
        medium_url: '/icons/medium/missing.png'
      },
      menu_column: 0,
      name: 'Beauty Box',
      parent_id: null,
      slug: 'beauty-box',
      vn_name: null,
      sub_nodes: [
        {
          id: 848,
          cover_image: {
            large_url: '/images/large/missing.png'
          },
          icon: {
            large_url: '/icons/large/missing.png',
            medium_url: '/icons/medium/missing.png'
          },
          menu_column: 0,
          name: 'New Beauty Box',
          parent_id: 847,
          slug: 'new-beauty-box',
          vn_name: 'Box mới nhất',
          sub_nodes: [],
          activeMenu: false
        },
        {
          id: 849,
          cover_image: {
            large_url: '/images/large/missing.png'
          },
          icon: {
            large_url: '/icons/large/missing.png',
            medium_url: '/icons/medium/missing.png'
          },
          menu_column: 0,
          name: 'Bestsellers Beauty Box',
          parent_id: 847,
          slug: 'best-selling-beauty-box',
          vn_name: 'Box bán chạy nhất',
          sub_nodes: [],
          activeMenu: false
        }
      ],
      activeMenu: true,
      hover: false,
      sub: [
        {
          id: 840,
          cover_image: {
            large_url: '/images/large/missing.png'
          },
          icon: {
            large_url: '/icons/large/missing.png',
            medium_url: '/icons/medium/missing.png'
          },
          menu_column: 0,
          name: 'Beauty',
          parent_id: null,
          slug: 'beauty',
          vn_name: 'Mua lẻ',
          sub_nodes: [
            {
              id: 841,
              cover_image: {
                large_url: '/images/large/missing.png'
              },
              icon: {
                large_url: '/icons/large/missing.png',
                medium_url: '/icons/medium/missing.png'
              },
              menu_column: 9,
              name: 'Best Sellers',
              parent_id: 840,
              slug: 'bestsellers',
              vn_name: 'Hàng hot nhất',
              sub_nodes: [],
              activeMenu: false
            }
          ],
          activeMenu: false
        }
      ]
    }
  ]
};
const component = (params = {}) => {
  const props = {
    listMenu,
    title: 'Test title'
  };

  return withRouter((routerProps) => <NavigationCategory {...Object.assign({}, props, routerProps, params)} />);
};

describe('NavigationCategory', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
