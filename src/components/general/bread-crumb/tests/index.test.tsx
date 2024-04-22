jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import Breadcrumb from '../component';

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
        },
        {
          id: 850,
          cover_image: {
            large_url: '/images/large/missing.png'
          },
          icon: {
            large_url: '/icons/large/missing.png',
            medium_url: '/icons/medium/missing.png'
          },
          menu_column: 0,
          name: 'Makeup box',
          parent_id: 847,
          slug: 'makeup-beauty-box',
          vn_name: 'Box trang điểm',
          sub_nodes: [
            {
              id: 853,
              cover_image: {
                large_url: '/images/large/missing.png'
              },
              icon: {
                large_url: '/icons/large/missing.png',
                medium_url: '/icons/medium/missing.png'
              },
              menu_column: 0,
              name: 'New Makeup Box',
              parent_id: 850,
              slug: 'new-makeup-beauty-box',
              vn_name: 'Box trang điểm mới nhất',
              sub_nodes: [],
              activeMenu: false
            },
            {
              id: 856,
              cover_image: {
                large_url: '/images/large/missing.png'
              },
              icon: {
                large_url: '/icons/large/missing.png',
                medium_url: '/icons/medium/missing.png'
              },
              menu_column: 0,
              name: 'Bestsellers Makeup Box',
              parent_id: 850,
              slug: 'best-selling-makeup-beauty-box',
              vn_name: 'Box trang điểm bán chạy nhất',
              sub_nodes: [],
              activeMenu: false
            }
          ],
          activeMenu: false
        },
        {
          id: 851,
          cover_image: {
            large_url: '/images/large/missing.png'
          },
          icon: {
            large_url: '/icons/large/missing.png',
            medium_url: '/icons/medium/missing.png'
          },
          menu_column: 0,
          name: 'Skin Care Box',
          parent_id: 847,
          slug: 'skin-care-beauty-box',
          vn_name: 'Box dưỡng da',
          sub_nodes: [
            {
              id: 854,
              cover_image: {
                large_url: '/images/large/missing.png'
              },
              icon: {
                large_url: '/icons/large/missing.png',
                medium_url: '/icons/medium/missing.png'
              },
              menu_column: 0,
              name: 'New Skincare Box',
              parent_id: 851,
              slug: 'new-skin-care-beauty-box',
              vn_name: 'Box dưỡng da mới nhất',
              sub_nodes: [],
              activeMenu: false
            },
            {
              id: 857,
              cover_image: {
                large_url: '/images/large/missing.png'
              },
              icon: {
                large_url: '/icons/large/missing.png',
                medium_url: '/icons/medium/missing.png'
              },
              menu_column: 0,
              name: 'Bestsellers Skincare Box',
              parent_id: 851,
              slug: 'best-selling-skin-care-beauty-box',
              vn_name: 'Box dưỡng da bán chạy nhất',
              sub_nodes: [],
              activeMenu: false
            }
          ],
          activeMenu: false
        },
        {
          id: 852,
          cover_image: {
            large_url: '/images/large/missing.png'
          },
          icon: {
            large_url: '/icons/large/missing.png',
            medium_url: '/icons/medium/missing.png'
          },
          menu_column: 0,
          name: 'Acne Box',
          parent_id: 847,
          slug: 'acne-beauty-box',
          vn_name: 'Box trị mụn',
          sub_nodes: [
            {
              id: 855,
              cover_image: {
                large_url: '/images/large/missing.png'
              },
              icon: {
                large_url: '/icons/large/missing.png',
                medium_url: '/icons/medium/missing.png'
              },
              menu_column: 0,
              name: 'New Acne Box',
              parent_id: 852,
              slug: 'new-acne-beauty-box',
              vn_name: 'Box trị mụn mới nhất',
              sub_nodes: [],
              activeMenu: false
            },
            {
              id: 858,
              cover_image: {
                large_url: '/images/large/missing.png'
              },
              icon: {
                large_url: '/icons/large/missing.png',
                medium_url: '/icons/medium/missing.png'
              },
              menu_column: 0,
              name: 'Bestsellers Acne Box',
              parent_id: 852,
              slug: 'best-selling-acne-beauty-box',
              vn_name: 'Box trị mụn bán chạy nhất',
              sub_nodes: [],
              activeMenu: false
            }
          ],
          activeMenu: false
        },
        {
          id: 1173,
          cover_image: {
            large_url: '/images/large/missing.png'
          },
          icon: {
            large_url: '/icons/large/missing.png',
            medium_url: '/icons/medium/missing.png'
          },
          menu_column: 0,
          name: 'Mom & Baby Box',
          parent_id: 847,
          slug: 'mom-and-baby-box',
          vn_name: 'Box Mẹ & Bé ',
          sub_nodes: [],
          activeMenu: false
        }
      ],
      activeMenu: false
    }
  ]
};
const isFinalList = false;
const updateMetaInfoAction = jest.fn();

const component = (params = {}) => {
  const props = {
    listMenu,
    isFinalList,
    updateMetaInfoAction
  };

  return <Breadcrumb {...Object.assign({}, props, params)} />;
};

describe('Breadcrumb', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
