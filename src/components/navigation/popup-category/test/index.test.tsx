import PopupCategory from '../index';
import { withRouter } from 'react-router-dom';
import { reduxRender } from '../../../../utils/test-utils';
//TODO: enable when show more feature enable
// import UserEvent from '@testing-library/user-event';
// import { render, screen, waitFor } from '@testing-library/react';

jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
const listRaw = {
  browse_nodes: [
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
      name: 'Shop Gifts',
      parent_id: null,
      slug: 'shop-gifts',
      vn_name: 'Quà Tặng',
      sub_nodes: [
        {
          id: 1280,
          cover_image: {
            large_url: '/images/large/missing.png'
          },
          icon: {
            large_url: '/icons/large/missing.png',
            medium_url: '/icons/medium/missing.png'
          },
          menu_column: 0,
          name: 'Gifts For Baby',
          parent_id: 1277,
          slug: 'gifts-for-baby',
          vn_name: 'Quà Cho Bé',
          sub_nodes: [],
          activeMenu: false
        },
        {
          id: 1281,
          cover_image: {
            large_url: '/images/large/missing.png'
          },
          icon: {
            large_url: '/icons/large/missing.png',
            medium_url: '/icons/medium/missing.png'
          },
          menu_column: 0,
          name: 'Gifts For Home',
          parent_id: 1277,
          slug: 'gifts-for-home',
          vn_name: 'Quà Cho Tân Gia',
          sub_nodes: [],
          activeMenu: false
        },
        {
          id: 1278,
          cover_image: {
            large_url: '/images/large/missing.png'
          },
          icon: {
            large_url: '/icons/large/missing.png',
            medium_url: '/icons/medium/missing.png'
          },
          menu_column: 0,
          name: 'Gifts For Her',
          parent_id: 1277,
          slug: 'gifts-for-her',
          vn_name: 'Quà Cho Bạn Gái',
          sub_nodes: [],
          activeMenu: false
        },
        {
          id: 1279,
          cover_image: {
            large_url: '/images/large/missing.png'
          },
          icon: {
            large_url: '/icons/large/missing.png',
            medium_url: '/icons/medium/missing.png'
          },
          menu_column: 0,
          name: 'Gifts For Him',
          parent_id: 1277,
          slug: 'gifts-for-him',
          vn_name: 'Quà Cho Bạn Trai',
          sub_nodes: [],
          activeMenu: false
        }
      ],
      activeMenu: false
    },
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
      vn_name: 'Làm Đẹp',
      sub_nodes: [
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
          parent_id: 1282,
          slug: 'beauty-box',
          vn_name: 'Hộp Làm Đẹp',
          sub_nodes: [
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
              name: 'Skincare Box',
              parent_id: 847,
              slug: 'skin-care-beauty-box',
              vn_name: 'Hộp Dưỡng Da',
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
              menu_column: 1,
              name: 'Makeup box',
              parent_id: 847,
              slug: 'makeup-beauty-box',
              vn_name: 'Hộp Trang Điểm',
              sub_nodes: [],
              activeMenu: false
            },
            {
              id: 1318,
              cover_image: {
                large_url: '/images/large/missing.png'
              },
              icon: {
                large_url: '/icons/large/missing.png',
                medium_url: '/icons/medium/missing.png'
              },
              menu_column: 2,
              name: 'Bodycare Box',
              parent_id: 847,
              slug: 'bodycare-box',
              vn_name: 'Hộp Chăm Sóc Cơ Thể',
              sub_nodes: [],
              activeMenu: false
            },
            {
              id: 1231,
              cover_image: {
                large_url: '/images/large/missing.png'
              },
              icon: {
                large_url: '/icons/large/missing.png',
                medium_url: '/icons/medium/missing.png'
              },
              menu_column: 3,
              name: 'Oral Care Box',
              parent_id: 847,
              slug: 'oral-care-box',
              vn_name: 'Hộp Chăm Sóc Răng Miệng',
              sub_nodes: [],
              activeMenu: false
            },
            {
              id: 848,
              cover_image: {
                large_url: '/images/large/missing.png'
              },
              icon: {
                large_url: '/icons/large/missing.png',
                medium_url: '/icons/medium/missing.png'
              },
              menu_column: 4,
              name: 'New Arrivals',
              parent_id: 847,
              slug: 'new-box',
              vn_name: 'Box Mới Nhất',
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
              menu_column: 5,
              name: 'Bestsellers  Box',
              parent_id: 847,
              slug: 'best-selling-beauty-box',
              vn_name: 'Box Bán Chạy Nhất',
              sub_nodes: [],
              activeMenu: false
            }
          ],
          activeMenu: false
        },
        {
          id: 1288,
          cover_image: {
            large_url: '/images/large/missing.png'
          },
          icon: {
            large_url: '/icons/large/missing.png',
            medium_url: '/icons/medium/missing.png'
          },
          menu_column: 1,
          name: 'Accessories',
          parent_id: 1282,
          slug: 'accessories',
          vn_name: 'Phụ Kiện',
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
              name: 'Bag',
              parent_id: 1288,
              slug: 'bag',
              vn_name: 'Túi',
              sub_nodes: [],
              activeMenu: false
            },
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
              name: 'Sunglasses',
              parent_id: 1288,
              slug: 'sunglasses',
              vn_name: 'Kính Mát',
              sub_nodes: [],
              activeMenu: false
            },
            {
              id: 1317,
              cover_image: {
                large_url: '/images/large/missing.png'
              },
              icon: {
                large_url: '/icons/large/missing.png',
                medium_url: '/icons/medium/missing.png'
              },
              menu_column: 0,
              name: 'Hair Accessories',
              parent_id: 1288,
              slug: 'hair-accessories',
              vn_name: 'Phụ Kiện Tóc',
              sub_nodes: [],
              activeMenu: false
            }
          ],
          activeMenu: false
        },
        {
          id: 1284,
          cover_image: {
            large_url: '/images/large/missing.png'
          },
          icon: {
            large_url: '/icons/large/missing.png',
            medium_url: '/icons/medium/missing.png'
          },
          menu_column: 2,
          name: 'Skin Care',
          parent_id: 1282,
          slug: 'skin-care',
          vn_name: 'Chăm Sóc Da',
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
              name: 'Cleansing',
              parent_id: 1284,
              slug: 'cleansing',
              vn_name: 'Làm Sạch',
              sub_nodes: [],
              activeMenu: false
            },
            {
              id: 1298,
              cover_image: {
                large_url: '/images/large/missing.png'
              },
              icon: {
                large_url: '/icons/large/missing.png',
                medium_url: '/icons/medium/missing.png'
              },
              menu_column: 0,
              name: 'Toner',
              parent_id: 1284,
              slug: 'toner',
              vn_name: 'Nước Hoa Hồng',
              sub_nodes: [],
              activeMenu: false
            },
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
              name: 'Serum',
              parent_id: 1284,
              slug: 'serum',
              vn_name: 'Tinh Chất',
              sub_nodes: [],
              activeMenu: false
            },
            {
              id: 1300,
              cover_image: {
                large_url: '/images/large/missing.png'
              },
              icon: {
                large_url: '/icons/large/missing.png',
                medium_url: '/icons/medium/missing.png'
              },
              menu_column: 0,
              name: 'Treatment',
              parent_id: 1284,
              slug: 'treatment',
              vn_name: 'Đặc Trị',
              sub_nodes: [],
              activeMenu: false
            },
            {
              id: 1301,
              cover_image: {
                large_url: '/images/large/missing.png'
              },
              icon: {
                large_url: '/icons/large/missing.png',
                medium_url: '/icons/medium/missing.png'
              },
              menu_column: 0,
              name: 'Moisturizer',
              parent_id: 1284,
              slug: 'moisturizer',
              vn_name: 'Dưỡng Ẩm',
              sub_nodes: [],
              activeMenu: false
            },
            {
              id: 1302,
              cover_image: {
                large_url: '/images/large/missing.png'
              },
              icon: {
                large_url: '/icons/large/missing.png',
                medium_url: '/icons/medium/missing.png'
              },
              menu_column: 0,
              name: 'Facial Mask',
              parent_id: 1284,
              slug: 'facial-mask',
              vn_name: 'Mặt Nạ',
              sub_nodes: [],
              activeMenu: false
            },
            {
              id: 1303,
              cover_image: {
                large_url: '/images/large/missing.png'
              },
              icon: {
                large_url: '/icons/large/missing.png',
                medium_url: '/icons/medium/missing.png'
              },
              menu_column: 0,
              name: 'Sunscreen',
              parent_id: 1284,
              slug: 'sunscreen',
              vn_name: 'Kem Chống Nắng',
              sub_nodes: [],
              activeMenu: false
            },
            {
              id: 1304,
              cover_image: {
                large_url: '/images/large/missing.png'
              },
              icon: {
                large_url: '/icons/large/missing.png',
                medium_url: '/icons/medium/missing.png'
              },
              menu_column: 0,
              name: 'Beauty Tools',
              parent_id: 1284,
              slug: 'beauty-tools',
              vn_name: 'Thiết Bị Làm Đẹp',
              sub_nodes: [],
              activeMenu: false
            }
          ],
          activeMenu: false
        },
        {
          id: 1285,
          cover_image: {
            large_url: '/images/large/missing.png'
          },
          icon: {
            large_url: '/icons/large/missing.png',
            medium_url: '/icons/medium/missing.png'
          },
          menu_column: 3,
          name: 'Makeup',
          parent_id: 1282,
          slug: 'makeup',
          vn_name: 'Trang Điểm',
          sub_nodes: [
            {
              id: 1305,
              cover_image: {
                large_url: '/images/large/missing.png'
              },
              icon: {
                large_url: '/icons/large/missing.png',
                medium_url: '/icons/medium/missing.png'
              },
              menu_column: 0,
              name: 'Face',
              parent_id: 1285,
              slug: 'face',
              vn_name: 'Mặt',
              sub_nodes: [],
              activeMenu: false
            },
            {
              id: 1306,
              cover_image: {
                large_url: '/images/large/missing.png'
              },
              icon: {
                large_url: '/icons/large/missing.png',
                medium_url: '/icons/medium/missing.png'
              },
              menu_column: 0,
              name: 'Eyes',
              parent_id: 1285,
              slug: 'eyes',
              vn_name: 'Mắt',
              sub_nodes: [],
              activeMenu: false
            },
            {
              id: 1307,
              cover_image: {
                large_url: '/images/large/missing.png'
              },
              icon: {
                large_url: '/icons/large/missing.png',
                medium_url: '/icons/medium/missing.png'
              },
              menu_column: 0,
              name: 'Lipstick',
              parent_id: 1285,
              slug: 'lipstick',
              vn_name: 'Son Môi',
              sub_nodes: [],
              activeMenu: false
            },
            {
              id: 1308,
              cover_image: {
                large_url: '/images/large/missing.png'
              },
              icon: {
                large_url: '/icons/large/missing.png',
                medium_url: '/icons/medium/missing.png'
              },
              menu_column: 0,
              name: 'Makeup Tools',
              parent_id: 1285,
              slug: 'makeup-tools',
              vn_name: 'Dụng Cụ Trang Điểm',
              sub_nodes: [],
              activeMenu: false
            }
          ],
          activeMenu: false
        },
        {
          id: 1283,
          cover_image: {
            large_url: '/images/large/missing.png'
          },
          icon: {
            large_url: '/icons/large/missing.png',
            medium_url: '/icons/medium/missing.png'
          },
          menu_column: 4,
          name: 'Shop by Ingredient',
          parent_id: 1282,
          slug: 'shop-by-ingredient',
          vn_name: 'Thành Phần Nổi Bật',
          sub_nodes: [
            {
              id: 1289,
              cover_image: {
                large_url: '/images/large/missing.png'
              },
              icon: {
                large_url: '/icons/large/missing.png',
                medium_url: '/icons/medium/missing.png'
              },
              menu_column: 0,
              name: 'AHA',
              parent_id: 1283,
              slug: 'aha',
              vn_name: null,
              sub_nodes: [],
              activeMenu: false
            },
            {
              id: 1290,
              cover_image: {
                large_url: '/images/large/missing.png'
              },
              icon: {
                large_url: '/icons/large/missing.png',
                medium_url: '/icons/medium/missing.png'
              },
              menu_column: 0,
              name: 'BHA',
              parent_id: 1283,
              slug: 'bha',
              vn_name: null,
              sub_nodes: [],
              activeMenu: false
            },
            {
              id: 1291,
              cover_image: {
                large_url: '/images/large/missing.png'
              },
              icon: {
                large_url: '/icons/large/missing.png',
                medium_url: '/icons/medium/missing.png'
              },
              menu_column: 0,
              name: 'Retinol',
              parent_id: 1283,
              slug: 'retinol',
              vn_name: null,
              sub_nodes: [],
              activeMenu: false
            },
            {
              id: 1292,
              cover_image: {
                large_url: '/images/large/missing.png'
              },
              icon: {
                large_url: '/icons/large/missing.png',
                medium_url: '/icons/medium/missing.png'
              },
              menu_column: 0,
              name: 'Niacinamide',
              parent_id: 1283,
              slug: 'niacinamide',
              vn_name: null,
              sub_nodes: [],
              activeMenu: false
            },
            {
              id: 1295,
              cover_image: {
                large_url: '/images/large/missing.png'
              },
              icon: {
                large_url: '/icons/large/missing.png',
                medium_url: '/icons/medium/missing.png'
              },
              menu_column: 0,
              name: 'B5',
              parent_id: 1283,
              slug: 'b5',
              vn_name: null,
              sub_nodes: [],
              activeMenu: false
            }
          ],
          activeMenu: false
        },
        {
          id: 1287,
          cover_image: {
            large_url: '/images/large/missing.png'
          },
          icon: {
            large_url: '/icons/large/missing.png',
            medium_url: '/icons/medium/missing.png'
          },
          menu_column: 5,
          name: 'Supplement',
          parent_id: 1282,
          slug: 'supplement',
          vn_name: 'Thực Phẩm Chức Năng',
          sub_nodes: [
            {
              id: 1312,
              cover_image: {
                large_url: '/images/large/missing.png'
              },
              icon: {
                large_url: '/icons/large/missing.png',
                medium_url: '/icons/medium/missing.png'
              },
              menu_column: 0,
              name: 'Health',
              parent_id: 1287,
              slug: 'health',
              vn_name: 'Sức Khỏe',
              sub_nodes: [],
              activeMenu: false
            },
            {
              id: 1313,
              cover_image: {
                large_url: '/images/large/missing.png'
              },
              icon: {
                large_url: '/icons/large/missing.png',
                medium_url: '/icons/medium/missing.png'
              },
              menu_column: 0,
              name: 'Beauty',
              parent_id: 1287,
              slug: 'beauty-supplement',
              vn_name: 'Làm Đẹp',
              sub_nodes: [],
              activeMenu: false
            }
          ],
          activeMenu: false
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
          menu_column: 6,
          name: 'New Arrivals',
          parent_id: 1282,
          slug: 'new-products',
          vn_name: 'Hàng Mới Nhất',
          sub_nodes: [],
          activeMenu: false
        },
        {
          id: 1320,
          cover_image: {
            large_url: '/images/large/missing.png'
          },
          icon: {
            large_url: '/icons/large/missing.png',
            medium_url: '/icons/medium/missing.png'
          },
          menu_column: 7,
          name: 'Best Sellers',
          parent_id: 1282,
          slug: 'bestsellers',
          vn_name: 'Bán Chạy Nhất',
          sub_nodes: [],
          activeMenu: false
        },
        {
          id: 1286,
          cover_image: {
            large_url: '/images/large/missing.png'
          },
          icon: {
            large_url: '/icons/large/missing.png',
            medium_url: '/icons/medium/missing.png'
          },
          menu_column: 8,
          name: 'Personal Care',
          parent_id: 1282,
          slug: 'personal-care',
          vn_name: 'Chăm Sóc Cá Nhân',
          sub_nodes: [
            {
              id: 1309,
              cover_image: {
                large_url: '/images/large/missing.png'
              },
              icon: {
                large_url: '/icons/large/missing.png',
                medium_url: '/icons/medium/missing.png'
              },
              menu_column: 0,
              name: 'Oral Care',
              parent_id: 1286,
              slug: 'oral-care',
              vn_name: 'Chăm Sóc Răng Miệng',
              sub_nodes: [],
              activeMenu: false
            },
            {
              id: 1310,
              cover_image: {
                large_url: '/images/large/missing.png'
              },
              icon: {
                large_url: '/icons/large/missing.png',
                medium_url: '/icons/medium/missing.png'
              },
              menu_column: 0,
              name: 'Body Care',
              parent_id: 1286,
              slug: 'body-care',
              vn_name: 'Chăm Sóc Cơ Thể',
              sub_nodes: [],
              activeMenu: false
            },
            {
              id: 1311,
              cover_image: {
                large_url: '/images/large/missing.png'
              },
              icon: {
                large_url: '/icons/large/missing.png',
                medium_url: '/icons/medium/missing.png'
              },
              menu_column: 0,
              name: 'Hair Care',
              parent_id: 1286,
              slug: 'hair-care',
              vn_name: 'Chăm Sóc Tóc',
              sub_nodes: [],
              activeMenu: false
            }
          ],
          activeMenu: false
        }
      ],
      activeMenu: false
    }
  ]
};
const component = (params = {}) => {
  const props = {
    listMenu: listRaw
  };

  return withRouter((routerProps) => <PopupCategory {...Object.assign({}, props, routerProps, params)} />);
};
// const user = UserEvent.setup();
describe('PopupCategory', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
  // TODO: enable when show more feature enable
  // test(`render more btn`, () => {
  //   render(
  //     <BrowserRouter>
  //       <PopupCategory listMenu={listRaw} classes={{ container: '' }} />
  //     </BrowserRouter>
  //   );
  //   const more = document.getElementsByClassName('catItem btnWrapper')[0];
  //   expect(more).toBeInTheDocument();
  // });
  // TODO: enable when show more feature enable
  // test(`click more btn`, async () => {
  //   render(
  //     <BrowserRouter>
  //       <PopupCategory listMenu={listRaw} classes={{ container: '' }} />
  //     </BrowserRouter>
  //   );
  //   const more = document.getElementsByClassName('categoryItem button')[0];
  //   const valueMore = screen.getByText('Xem thêm');
  //   await waitFor(() => {
  //     user.click(more);
  //     expect(valueMore).not.toBeInTheDocument();
  //     const valueLess = screen.getByText('Thu gọn');
  //     expect(valueLess).toBeInTheDocument();
  //   });
  // });
});
