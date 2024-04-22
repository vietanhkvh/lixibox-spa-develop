jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));

import MobileProductCategory from '../';
import { reduxRender } from '../../../../utils/test-utils';

const mockData = [
  {
    id: 1277,
    cover_image: {
      large_url: '/images/large/missing.png'
    },
    icon: {
      large_url: '/icons/large/missing.png',
      medium_url: '/icons/medium/missing.png'
    },
    menu_column: 0,
    name: 'Unique',
    parent_id: null,
    slug: 'shop-gifts',
    sub_nodes: [
      {
        id: 1297,
        cover_image: {
          large_url: '/images/large/missing.png'
        },
        icon: {
          large_url: '/icons/large/missing.png',
          medium_url: '/icons/medium/missing.png'
        },
        menu_column: 0,
        name: 'Bamboo',
        parent_id: null,
        slug: 'shop-gifts-2',
        sub_nodes: [
          {
            id: 1316,
            cover_image: {
              large_url: '/images/large/missing.png'
            },
            icon: {
              large_url: '/icons/large/missing.png',
              medium_url: '/icons/medium/missing.png'
            },
            menu_column: 0,
            name: 'Baby',
            parent_id: null,
            slug: 'shop-gifts-8',
            sub_nodes: []
          }
        ]
      }
    ],
    vn_name: 'Quà Tặng'
  },
  {
    id: 1319,
    cover_image: {
      large_url: '/images/large/missing.png'
    },
    icon: {
      large_url: '/icons/large/missing.png',
      medium_url: '/icons/medium/missing.png'
    },
    menu_column: 0,
    name: 'Unique',
    parent_id: null,
    slug: 'shop-gifts-9',
    sub_nodes: [
      {
        id: 1282,
        cover_image: {
          large_url: '/images/large/missing.png'
        },
        icon: {
          large_url: '/icons/large/missing.png',
          medium_url: '/icons/medium/missing.png'
        },
        menu_column: 1,
        name: 'Beauty',
        parent_id: null,
        slug: 'beauty',
        sub_nodes: [
          {
            id: 1299,
            cover_image: {
              large_url: '/images/large/missing.png'
            },
            icon: {
              large_url: '/icons/large/missing.png',
              medium_url: '/icons/medium/missing.png'
            },
            menu_column: 0,
            name: 'Shop Gifts 3',
            parent_id: null,
            slug: 'shop-gifts-3',
            sub_nodes: [
              {
                id: 1314,
                cover_image: {
                  large_url: '/images/large/missing.png'
                },
                icon: {
                  large_url: '/icons/large/missing.png',
                  medium_url: '/icons/medium/missing.png'
                },
                menu_column: 0,
                name: 'Shop Gifts',
                parent_id: null,
                slug: 'shop-gifts-6',
                sub_nodes: [
                  {
                    id: 1320,
                    cover_image: {
                      large_url: '/images/large/missing.png'
                    },
                    icon: {
                      large_url: '/icons/large/missing.png',
                      medium_url: '/icons/medium/missing.png'
                    },
                    menu_column: 0,
                    name: 'Shop Gifts',
                    parent_id: null,
                    slug: 'shop-gifts-20',
                    sub_nodes: []
                  }
                ]
              }
            ]
          }
        ],
        vn_name: 'Làm Đẹp'
      }
    ]
  }
];

const props = {
  data: mockData,
  handleCloseModal: jest.fn(),
  expandedMode: true,
  isOpenedOnHeader: false
};

describe('MobileProductCategory', () => {
  it('renders the component with provided data', () => {
    expect(() => {
      reduxRender(<MobileProductCategory {...props} />, { initialState: {} });
    }).not.toThrow();
  });

  it('renders loading state when data is not provided', () => {
    const { container } = reduxRender(<MobileProductCategory data={null} />, { initialState: {} });
    expect(container.getElementsByClassName('modalOverlay').length).toBe(1);
  });
});
