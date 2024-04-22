jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import CategoryModal from '..';

const browseNodes = [
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
      }
    ],
    activeMenu: false
  },
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
      },
      {
        id: 428,
        cover_image: {
          large_url:
            'https://upload.lixibox.com/system/browse_nodes/cover_images/000/000/428/large/CATEGORY-MAKEUPa.png',
          original_url:
            'https://upload.lixibox.com/system/browse_nodes/cover_images/000/000/428/original/CATEGORY-MAKEUPa.png'
        },
        icon: {
          large_url: 'https://upload.lixibox.com/system/browse_nodes/icons/000/000/428/large/makeup.png',
          medium_url: 'https://upload.lixibox.com/system/browse_nodes/icons/000/000/428/medium/makeup.png',
          original_url: 'https://upload.lixibox.com/system/browse_nodes/icons/000/000/428/original/makeup.png'
        },
        menu_column: 0,
        name: 'Makeup',
        parent_id: 840,
        slug: 'makeup',
        vn_name: 'Trang điểm',
        sub_nodes: [
          {
            id: 455,
            cover_image: {
              large_url: '/images/large/missing.png'
            },
            icon: {
              large_url: '/icons/large/missing.png',
              medium_url: '/icons/medium/missing.png'
            },
            menu_column: 0,
            name: 'Eye Makeup',
            parent_id: 428,
            slug: 'eyes',
            vn_name: 'Mắt',
            sub_nodes: [
              {
                id: 478,
                cover_image: {
                  large_url: '/images/large/missing.png'
                },
                icon: {
                  large_url: '/icons/large/missing.png',
                  medium_url: '/icons/medium/missing.png'
                },
                menu_column: 0,
                name: 'Eye Primer',
                parent_id: 455,
                slug: 'eye-primer',
                vn_name: 'Lót mắt',
                sub_nodes: [],
                activeMenu: false
              },
              {
                id: 479,
                cover_image: {
                  large_url: '/images/large/missing.png'
                },
                icon: {
                  large_url: '/icons/large/missing.png',
                  medium_url: '/icons/medium/missing.png'
                },
                menu_column: 0,
                name: 'Eyeshadow',
                parent_id: 455,
                slug: 'eyeshadow',
                vn_name: 'Phấn mắt',
                sub_nodes: [],
                activeMenu: false
              },
              {
                id: 480,
                cover_image: {
                  large_url: '/images/large/missing.png'
                },
                icon: {
                  large_url: '/icons/large/missing.png',
                  medium_url: '/icons/medium/missing.png'
                },
                menu_column: 0,
                name: 'Mascara',
                parent_id: 455,
                slug: 'mascara',
                vn_name: 'Chuốt mi',
                sub_nodes: [],
                activeMenu: false
              },
              {
                id: 481,
                cover_image: {
                  large_url: '/images/large/missing.png'
                },
                icon: {
                  large_url: '/icons/large/missing.png',
                  medium_url: '/icons/medium/missing.png'
                },
                menu_column: 0,
                name: 'Eyeliner',
                parent_id: 455,
                slug: 'eyeliner',
                vn_name: 'Kẻ mắt',
                sub_nodes: [],
                activeMenu: false
              },
              {
                id: 482,
                cover_image: {
                  large_url: '/images/large/missing.png'
                },
                icon: {
                  large_url: '/icons/large/missing.png',
                  medium_url: '/icons/medium/missing.png'
                },
                menu_column: 0,
                name: 'Eyebrow',
                parent_id: 455,
                slug: 'eyebrow',
                vn_name: 'Chân mày',
                sub_nodes: [],
                activeMenu: false
              },
              {
                id: 497,
                cover_image: {
                  large_url: '/images/large/missing.png'
                },
                icon: {
                  large_url: '/icons/large/missing.png',
                  medium_url: '/icons/medium/missing.png'
                },
                menu_column: 0,
                name: 'Eye makeup remover',
                parent_id: 455,
                slug: 'eye-makeup-remover',
                vn_name: 'Tẩy trang mắt',
                sub_nodes: [],
                activeMenu: false
              }
            ],
            activeMenu: false
          },
          {
            id: 459,
            cover_image: {
              large_url: '/images/large/missing.png'
            },
            icon: {
              large_url: '/icons/large/missing.png',
              medium_url: '/icons/medium/missing.png'
            },
            menu_column: 0,
            name: 'Face Makeup',
            parent_id: 428,
            slug: 'face',
            vn_name: 'Mặt',
            sub_nodes: [
              {
                id: 471,
                cover_image: {
                  large_url: '/images/large/missing.png'
                },
                icon: {
                  large_url: '/icons/large/missing.png',
                  medium_url: '/icons/medium/missing.png'
                },
                menu_column: 0,
                name: 'Primer / Base',
                parent_id: 459,
                slug: 'primer-base',
                vn_name: 'Kem lót',
                sub_nodes: [],
                activeMenu: false
              },
              {
                id: 472,
                cover_image: {
                  large_url: '/images/large/missing.png'
                },
                icon: {
                  large_url: '/icons/large/missing.png',
                  medium_url: '/icons/medium/missing.png'
                },
                menu_column: 0,
                name: 'Foundation/ Cushion',
                parent_id: 459,
                slug: 'foundation',
                vn_name: 'Kem / Phấn nền',
                sub_nodes: [],
                activeMenu: false
              },
              {
                id: 473,
                cover_image: {
                  large_url: '/images/large/missing.png'
                },
                icon: {
                  large_url: '/icons/large/missing.png',
                  medium_url: '/icons/medium/missing.png'
                },
                menu_column: 0,
                name: 'BB Cream &amp; CC Cream',
                parent_id: 459,
                slug: 'bb-cream-cc-cream',
                vn_name: 'Kem đa năng (BB, CC)',
                sub_nodes: [],
                activeMenu: false
              },
              {
                id: 474,
                cover_image: {
                  large_url: '/images/large/missing.png'
                },
                icon: {
                  large_url: '/icons/large/missing.png',
                  medium_url: '/icons/medium/missing.png'
                },
                menu_column: 0,
                name: 'Concealer',
                parent_id: 459,
                slug: 'concealer',
                vn_name: 'Kem che khuyết điểm',
                sub_nodes: [],
                activeMenu: false
              },
              {
                id: 475,
                cover_image: {
                  large_url: '/images/large/missing.png'
                },
                icon: {
                  large_url: '/icons/large/missing.png',
                  medium_url: '/icons/medium/missing.png'
                },
                menu_column: 0,
                name: 'Powder',
                parent_id: 459,
                slug: 'powder',
                vn_name: 'Phấn phủ',
                sub_nodes: [],
                activeMenu: false
              },
              {
                id: 476,
                cover_image: {
                  large_url: '/images/large/missing.png'
                },
                icon: {
                  large_url: '/icons/large/missing.png',
                  medium_url: '/icons/medium/missing.png'
                },
                menu_column: 0,
                name: 'Blush',
                parent_id: 459,
                slug: 'blush',
                vn_name: 'Phấn má',
                sub_nodes: [],
                activeMenu: false
              },
              {
                id: 477,
                cover_image: {
                  large_url: '/images/large/missing.png'
                },
                icon: {
                  large_url: '/icons/large/missing.png',
                  medium_url: '/icons/medium/missing.png'
                },
                menu_column: 0,
                name: 'Highlight / Contour',
                parent_id: 459,
                slug: 'highlight-contour',
                vn_name: 'Tạo khối',
                sub_nodes: [],
                activeMenu: false
              }
            ],
            activeMenu: false
          }
        ],
        activeMenu: true
      }
    ],
    activeMenu: true
  }
];

// menuStore.listMenu.browse_nodes
const component = (params = {}) => {
  const props = {
    title: 'Test title',
    breadCrumbHeading: 'Danh mục',
    browseNodes,
    isDisplaySubTitle: true,
    onRequestClose: jest.fn()
  };

  return <CategoryModal {...Object.assign({}, props, params)} />;
};

describe('CategoryModal', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
