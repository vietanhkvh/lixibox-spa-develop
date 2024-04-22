jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import LandingPageRating from '..';

const boxFeedback = {
  '1390071224': {
    success: true,
    feedbacks: [
      {
        id: 91018,
        comments: [],
        created_at: 1631264503,
        feedbackable_id: 3301,
        feedbackable_image: {
          facebook_url:
            'https://upload.lixibox.com/system/pictures/files/000/023/620/facebook/1502351590.png?t=1631350329',
          large_url: 'https://upload.lixibox.com/system/pictures/files/000/023/620/large/1502351590.png?t=1631350329',
          medium_url: 'https://upload.lixibox.com/system/pictures/files/000/023/620/medium/1502351590.png?t=1631350329',
          original_url:
            'https://upload.lixibox.com/system/pictures/files/000/023/620/original/1502351590.png?t=1631350329',
          square_url: 'https://upload.lixibox.com/system/pictures/files/000/023/620/square/1502351590.png?t=1631350329',
          thumb_url: 'https://upload.lixibox.com/system/pictures/files/000/023/620/thumb/1502351590.png?t=1631350329',
          vertical_url:
            'https://upload.lixibox.com/system/pictures/files/000/023/620/vertical/1502351590.png?t=1631350329'
        },
        feedbackable_name:
          '[Nhập HOGIFT - FREE Quà 135K] Máy Rửa Mặt Halio Facial Cleansing & Massaging Device - Baby Pink',
        feedbackable_slug: 'halio-facial-cleansing-massaging-device-baby-pink',
        feedbackable_type: 'Box',
        parent_id: null,
        pictures: [],
        rate: 4,
        review: 'Đã dùng 1 thời gian. Sản phẩm OK trong tầm giá',
        status: 'approved',
        user: {
          id: 431357,
          avatar: {
            large_url: 'https://upload.lixibox.com/system/users/avatars/000/431/357/large/1631264347.jpg',
            medium_url: 'https://upload.lixibox.com/system/users/avatars/000/431/357/medium/1631264347.jpg',
            original_url: 'https://upload.lixibox.com/system/users/avatars/000/431/357/original/1631264347.jpg',
            thumb_url: 'https://upload.lixibox.com/system/users/avatars/000/431/357/thumb/1631264347.jpg'
          },
          avatar_medium_url: 'https://upload.lixibox.com/system/users/avatars/000/431/357/medium/1631264347.jpg',
          avatar_thumb_url: 'https://upload.lixibox.com/system/users/avatars/000/431/357/thumb/1631264347.jpg',
          email: 'hoanghuong.bvlb@gmail.com',
          first_name: 'Hoàng',
          last_name: 'Hương',
          name: 'Hương Hoàng'
        }
      },
      {
        id: 91006,
        comments: [],
        created_at: 1631242549,
        feedbackable_id: 3301,
        feedbackable_image: {
          facebook_url:
            'https://upload.lixibox.com/system/pictures/files/000/023/620/facebook/1502351590.png?t=1631350329',
          large_url: 'https://upload.lixibox.com/system/pictures/files/000/023/620/large/1502351590.png?t=1631350329',
          medium_url: 'https://upload.lixibox.com/system/pictures/files/000/023/620/medium/1502351590.png?t=1631350329',
          original_url:
            'https://upload.lixibox.com/system/pictures/files/000/023/620/original/1502351590.png?t=1631350329',
          square_url: 'https://upload.lixibox.com/system/pictures/files/000/023/620/square/1502351590.png?t=1631350329',
          thumb_url: 'https://upload.lixibox.com/system/pictures/files/000/023/620/thumb/1502351590.png?t=1631350329',
          vertical_url:
            'https://upload.lixibox.com/system/pictures/files/000/023/620/vertical/1502351590.png?t=1631350329'
        },
        feedbackable_name:
          '[Nhập HOGIFT - FREE Quà 135K] Máy Rửa Mặt Halio Facial Cleansing & Massaging Device - Baby Pink',
        feedbackable_slug: 'halio-facial-cleansing-massaging-device-baby-pink',
        feedbackable_type: 'Box',
        parent_id: null,
        pictures: [
          {
            id: 62353,
            height: 650,
            url: 'https://upload.lixibox.com/system/pictures/files/000/062/353/large/1631242550.jpg?v=1',
            width: 960
          }
        ],
        rate: 5,
        review: 'Máy xài okie, pin rất trâu luôn. Mua lâu lắm rồi mà xài vẫn xịn',
        status: 'approved',
        user: {
          id: 362248,
          avatar: {
            large_url: 'https://upload.lixibox.com/system/users/avatars/000/362/248/large/1630301392.jpg',
            medium_url: 'https://upload.lixibox.com/system/users/avatars/000/362/248/medium/1630301392.jpg',
            original_url: 'https://upload.lixibox.com/system/users/avatars/000/362/248/original/1630301392.jpg',
            thumb_url: 'https://upload.lixibox.com/system/users/avatars/000/362/248/thumb/1630301392.jpg'
          },
          avatar_medium_url: 'https://upload.lixibox.com/system/users/avatars/000/362/248/medium/1630301392.jpg',
          avatar_thumb_url: 'https://upload.lixibox.com/system/users/avatars/000/362/248/thumb/1630301392.jpg',
          email: 'quynhnhutran.dl@gmail.com',
          first_name: 'Như',
          last_name: 'Quỳnh',
          name: 'Quỳnh Như'
        }
      },
      {
        id: 90941,
        comments: [],
        created_at: 1630770195,
        feedbackable_id: 3301,
        feedbackable_image: {
          facebook_url:
            'https://upload.lixibox.com/system/pictures/files/000/023/620/facebook/1502351590.png?t=1631350329',
          large_url: 'https://upload.lixibox.com/system/pictures/files/000/023/620/large/1502351590.png?t=1631350329',
          medium_url: 'https://upload.lixibox.com/system/pictures/files/000/023/620/medium/1502351590.png?t=1631350329',
          original_url:
            'https://upload.lixibox.com/system/pictures/files/000/023/620/original/1502351590.png?t=1631350329',
          square_url: 'https://upload.lixibox.com/system/pictures/files/000/023/620/square/1502351590.png?t=1631350329',
          thumb_url: 'https://upload.lixibox.com/system/pictures/files/000/023/620/thumb/1502351590.png?t=1631350329',
          vertical_url:
            'https://upload.lixibox.com/system/pictures/files/000/023/620/vertical/1502351590.png?t=1631350329'
        },
        feedbackable_name:
          '[Nhập HOGIFT - FREE Quà 135K] Máy Rửa Mặt Halio Facial Cleansing & Massaging Device - Baby Pink',
        feedbackable_slug: 'halio-facial-cleansing-massaging-device-baby-pink',
        feedbackable_type: 'Box',
        parent_id: null,
        pictures: [],
        rate: 5,
        review: 'Máy dùng ok phù hợp với túi tiền',
        status: 'approved',
        user: {
          id: 475927,
          avatar: {
            large_url: 'https://dummyimage.com/600x600/e6e6e6/858585.jpg&text=M',
            medium_url: 'https://dummyimage.com/600x600/e6e6e6/858585.jpg&text=M',
            thumb_url: 'https://dummyimage.com/600x600/e6e6e6/858585.jpg&text=M'
          },
          avatar_medium_url: 'https://dummyimage.com/600x600/e6e6e6/858585.jpg&text=M',
          avatar_thumb_url: 'https://dummyimage.com/600x600/e6e6e6/858585.jpg&text=M',
          email: 'truonggiamy0201@gmail.com',
          first_name: 'Mỹ',
          last_name: 'Trương Gia',
          name: 'Trương Gia Mỹ'
        }
      },
      {
        id: 90900,
        comments: [
          {
            id: 18228,
            avatar: {
              large_url: 'https://upload.lixibox.com/system/users/avatars/000/310/269/large/avatar-20190805104939.jpeg',
              medium_url:
                'https://upload.lixibox.com/system/users/avatars/000/310/269/medium/avatar-20190805104939.jpeg',
              original_url:
                'https://upload.lixibox.com/system/users/avatars/000/310/269/original/avatar-20190805104939.jpeg',
              thumb_url: 'https://upload.lixibox.com/system/users/avatars/000/310/269/thumb/avatar-20190805104939.jpeg'
            },
            content:
              'Dùng máy rửa mặt rồi là tui ko bao giờ muốn rửa mặt bàn tay nữa lun í, vừa sạch, vừa tiện, mà em Halio này có giá phải chăng nữa',
            created_at: 1630904367,
            user_name: 'Anh Hải'
          }
        ],
        created_at: 1630562967,
        feedbackable_id: 3301,
        feedbackable_image: {
          facebook_url:
            'https://upload.lixibox.com/system/pictures/files/000/023/620/facebook/1502351590.png?t=1631350329',
          large_url: 'https://upload.lixibox.com/system/pictures/files/000/023/620/large/1502351590.png?t=1631350329',
          medium_url: 'https://upload.lixibox.com/system/pictures/files/000/023/620/medium/1502351590.png?t=1631350329',
          original_url:
            'https://upload.lixibox.com/system/pictures/files/000/023/620/original/1502351590.png?t=1631350329',
          square_url: 'https://upload.lixibox.com/system/pictures/files/000/023/620/square/1502351590.png?t=1631350329',
          thumb_url: 'https://upload.lixibox.com/system/pictures/files/000/023/620/thumb/1502351590.png?t=1631350329',
          vertical_url:
            'https://upload.lixibox.com/system/pictures/files/000/023/620/vertical/1502351590.png?t=1631350329'
        },
        feedbackable_name:
          '[Nhập HOGIFT - FREE Quà 135K] Máy Rửa Mặt Halio Facial Cleansing & Massaging Device - Baby Pink',
        feedbackable_slug: 'halio-facial-cleansing-massaging-device-baby-pink',
        feedbackable_type: 'Box',
        parent_id: null,
        pictures: [],
        rate: 5,
        review: 'Mình dùng máy đc hơn 1 tuần rồi, dùng máy thích cực. Da sạch và mịn hắn, mụn cũng thấy giảm hơn rồi',
        status: 'approved',
        user: {
          id: 475812,
          avatar: {
            large_url: 'https://upload.lixibox.com/system/users/avatars/000/475/812/large/1628326816.jpg',
            medium_url: 'https://upload.lixibox.com/system/users/avatars/000/475/812/medium/1628326816.jpg',
            original_url: 'https://upload.lixibox.com/system/users/avatars/000/475/812/original/1628326816.jpg',
            thumb_url: 'https://upload.lixibox.com/system/users/avatars/000/475/812/thumb/1628326816.jpg'
          },
          avatar_medium_url: 'https://upload.lixibox.com/system/users/avatars/000/475/812/medium/1628326816.jpg',
          avatar_thumb_url: 'https://upload.lixibox.com/system/users/avatars/000/475/812/thumb/1628326816.jpg',
          email: 'yenoanh2209@gmail.com',
          first_name: 'Oanh',
          last_name: 'Yến',
          name: 'Yến Oanh'
        }
      },
      {
        id: 90899,
        comments: [],
        created_at: 1630561390,
        feedbackable_id: 3301,
        feedbackable_image: {
          facebook_url:
            'https://upload.lixibox.com/system/pictures/files/000/023/620/facebook/1502351590.png?t=1631350329',
          large_url: 'https://upload.lixibox.com/system/pictures/files/000/023/620/large/1502351590.png?t=1631350329',
          medium_url: 'https://upload.lixibox.com/system/pictures/files/000/023/620/medium/1502351590.png?t=1631350329',
          original_url:
            'https://upload.lixibox.com/system/pictures/files/000/023/620/original/1502351590.png?t=1631350329',
          square_url: 'https://upload.lixibox.com/system/pictures/files/000/023/620/square/1502351590.png?t=1631350329',
          thumb_url: 'https://upload.lixibox.com/system/pictures/files/000/023/620/thumb/1502351590.png?t=1631350329',
          vertical_url:
            'https://upload.lixibox.com/system/pictures/files/000/023/620/vertical/1502351590.png?t=1631350329'
        },
        feedbackable_name:
          '[Nhập HOGIFT - FREE Quà 135K] Máy Rửa Mặt Halio Facial Cleansing & Massaging Device - Baby Pink',
        feedbackable_slug: 'halio-facial-cleansing-massaging-device-baby-pink',
        feedbackable_type: 'Box',
        parent_id: null,
        pictures: [
          {
            id: 62257,
            height: 650,
            url: 'https://upload.lixibox.com/system/pictures/files/000/062/257/large/1630561390.jpg?v=1',
            width: 960
          }
        ],
        rate: 5,
        review: 'Máy này mình xài đc 3 năm rồi mà vẫn còn thấy ok lắm….',
        status: 'approved',
        user: {
          id: 230490,
          avatar: {
            large_url: 'https://dummyimage.com/600x600/e6e6e6/858585.jpg&text=N',
            medium_url: 'https://dummyimage.com/600x600/e6e6e6/858585.jpg&text=N',
            thumb_url: 'https://dummyimage.com/600x600/e6e6e6/858585.jpg&text=N'
          },
          avatar_medium_url: 'https://dummyimage.com/600x600/e6e6e6/858585.jpg&text=N',
          avatar_thumb_url: 'https://dummyimage.com/600x600/e6e6e6/858585.jpg&text=N',
          email: 'vy_uyen2002@yahoo.com',
          first_name: 'Nguyễn',
          last_name: 'Vy',
          name: 'Vy Nguyễn'
        }
      },
      {
        id: 90871,
        comments: [
          {
            id: 18224,
            avatar: {
              large_url: 'https://upload.lixibox.com/system/users/avatars/000/310/265/large/avatar-20190729121711.jpeg',
              medium_url:
                'https://upload.lixibox.com/system/users/avatars/000/310/265/medium/avatar-20190729121711.jpeg',
              original_url:
                'https://upload.lixibox.com/system/users/avatars/000/310/265/original/avatar-20190729121711.jpeg',
              thumb_url: 'https://upload.lixibox.com/system/users/avatars/000/310/265/thumb/avatar-20190729121711.jpeg'
            },
            content:
              'Máy rửa mặt của Halio dùng hiệu quả mà giá còn rất là phải chăng nữa, tui chung thủy với em này suốt mấy năm nay lun đóa',
            created_at: 1630902700,
            user_name: 'Nguyễn Ngọc'
          }
        ],
        created_at: 1630401433,
        feedbackable_id: 3301,
        feedbackable_image: {
          facebook_url:
            'https://upload.lixibox.com/system/pictures/files/000/023/620/facebook/1502351590.png?t=1631350329',
          large_url: 'https://upload.lixibox.com/system/pictures/files/000/023/620/large/1502351590.png?t=1631350329',
          medium_url: 'https://upload.lixibox.com/system/pictures/files/000/023/620/medium/1502351590.png?t=1631350329',
          original_url:
            'https://upload.lixibox.com/system/pictures/files/000/023/620/original/1502351590.png?t=1631350329',
          square_url: 'https://upload.lixibox.com/system/pictures/files/000/023/620/square/1502351590.png?t=1631350329',
          thumb_url: 'https://upload.lixibox.com/system/pictures/files/000/023/620/thumb/1502351590.png?t=1631350329',
          vertical_url:
            'https://upload.lixibox.com/system/pictures/files/000/023/620/vertical/1502351590.png?t=1631350329'
        },
        feedbackable_name:
          '[Nhập HOGIFT - FREE Quà 135K] Máy Rửa Mặt Halio Facial Cleansing & Massaging Device - Baby Pink',
        feedbackable_slug: 'halio-facial-cleansing-massaging-device-baby-pink',
        feedbackable_type: 'Box',
        parent_id: null,
        pictures: [],
        rate: 5,
        review:
          'Máy xài tốt, sạch mụn cám ở vùng cánh mũi và dưới cằm. Lỗ chân lông cũng thông thoáng nên có vẻ nhỏ bớt.',
        status: 'approved',
        user: {
          id: 121884,
          avatar: {
            large_url: 'https://upload.lixibox.com/system/users/avatars/000/121/884/large/picture',
            medium_url: 'https://upload.lixibox.com/system/users/avatars/000/121/884/medium/picture',
            original_url: 'https://upload.lixibox.com/system/users/avatars/000/121/884/original/picture',
            thumb_url: 'https://upload.lixibox.com/system/users/avatars/000/121/884/thumb/picture'
          },
          avatar_medium_url: 'https://upload.lixibox.com/system/users/avatars/000/121/884/medium/picture',
          avatar_thumb_url: 'https://upload.lixibox.com/system/users/avatars/000/121/884/thumb/picture',
          email: 'dangkha.xhnv@gmail.com',
          first_name: 'Kha',
          last_name: 'Nguyễn',
          name: 'Nguyễn Kha'
        }
      },
      {
        id: 90829,
        comments: [],
        created_at: 1630308661,
        feedbackable_id: 3301,
        feedbackable_image: {
          facebook_url:
            'https://upload.lixibox.com/system/pictures/files/000/023/620/facebook/1502351590.png?t=1631350329',
          large_url: 'https://upload.lixibox.com/system/pictures/files/000/023/620/large/1502351590.png?t=1631350329',
          medium_url: 'https://upload.lixibox.com/system/pictures/files/000/023/620/medium/1502351590.png?t=1631350329',
          original_url:
            'https://upload.lixibox.com/system/pictures/files/000/023/620/original/1502351590.png?t=1631350329',
          square_url: 'https://upload.lixibox.com/system/pictures/files/000/023/620/square/1502351590.png?t=1631350329',
          thumb_url: 'https://upload.lixibox.com/system/pictures/files/000/023/620/thumb/1502351590.png?t=1631350329',
          vertical_url:
            'https://upload.lixibox.com/system/pictures/files/000/023/620/vertical/1502351590.png?t=1631350329'
        },
        feedbackable_name:
          '[Nhập HOGIFT - FREE Quà 135K] Máy Rửa Mặt Halio Facial Cleansing & Massaging Device - Baby Pink',
        feedbackable_slug: 'halio-facial-cleansing-massaging-device-baby-pink',
        feedbackable_type: 'Box',
        parent_id: null,
        pictures: [],
        rate: 5,
        review: 'Máy xài ok, pin dùng lâu, hài lòng',
        status: 'approved',
        user: {
          id: 437051,
          avatar: {
            large_url: 'https://upload.lixibox.com/system/users/avatars/000/437/051/large/1612499651.jpg',
            medium_url: 'https://upload.lixibox.com/system/users/avatars/000/437/051/medium/1612499651.jpg',
            original_url: 'https://upload.lixibox.com/system/users/avatars/000/437/051/original/1612499651.jpg',
            thumb_url: 'https://upload.lixibox.com/system/users/avatars/000/437/051/thumb/1612499651.jpg'
          },
          avatar_medium_url: 'https://upload.lixibox.com/system/users/avatars/000/437/051/medium/1612499651.jpg',
          avatar_thumb_url: 'https://upload.lixibox.com/system/users/avatars/000/437/051/thumb/1612499651.jpg',
          email: 'thuytien.gts175298@gmail.com',
          first_name: 'Tiên',
          last_name: 'Trần Thị Thủy',
          name: 'Trần Thị Thủy Tiên'
        }
      },
      {
        id: 90757,
        comments: [],
        created_at: 1630032715,
        feedbackable_id: 3301,
        feedbackable_image: {
          facebook_url:
            'https://upload.lixibox.com/system/pictures/files/000/023/620/facebook/1502351590.png?t=1631350329',
          large_url: 'https://upload.lixibox.com/system/pictures/files/000/023/620/large/1502351590.png?t=1631350329',
          medium_url: 'https://upload.lixibox.com/system/pictures/files/000/023/620/medium/1502351590.png?t=1631350329',
          original_url:
            'https://upload.lixibox.com/system/pictures/files/000/023/620/original/1502351590.png?t=1631350329',
          square_url: 'https://upload.lixibox.com/system/pictures/files/000/023/620/square/1502351590.png?t=1631350329',
          thumb_url: 'https://upload.lixibox.com/system/pictures/files/000/023/620/thumb/1502351590.png?t=1631350329',
          vertical_url:
            'https://upload.lixibox.com/system/pictures/files/000/023/620/vertical/1502351590.png?t=1631350329'
        },
        feedbackable_name:
          '[Nhập HOGIFT - FREE Quà 135K] Máy Rửa Mặt Halio Facial Cleansing & Massaging Device - Baby Pink',
        feedbackable_slug: 'halio-facial-cleansing-massaging-device-baby-pink',
        feedbackable_type: 'Box',
        parent_id: null,
        pictures: [],
        rate: 5,
        review: 'Sản phẩm chất lượng Đóng gói rất đẹp',
        status: 'approved',
        user: {
          id: 395656,
          avatar: {
            large_url: 'https://upload.lixibox.com/system/users/avatars/000/395/656/large/picture',
            medium_url: 'https://upload.lixibox.com/system/users/avatars/000/395/656/medium/picture',
            original_url: 'https://upload.lixibox.com/system/users/avatars/000/395/656/original/picture',
            thumb_url: 'https://upload.lixibox.com/system/users/avatars/000/395/656/thumb/picture'
          },
          avatar_medium_url: 'https://upload.lixibox.com/system/users/avatars/000/395/656/medium/picture',
          avatar_thumb_url: 'https://upload.lixibox.com/system/users/avatars/000/395/656/thumb/picture',
          email: 'user+5169c1a43e9c@facebook.com',
          first_name: 'Uyển',
          last_name: 'Nhi',
          name: 'Nhi Uyển'
        }
      },
      {
        id: 90739,
        comments: [],
        created_at: 1629912593,
        feedbackable_id: 3301,
        feedbackable_image: {
          facebook_url:
            'https://upload.lixibox.com/system/pictures/files/000/023/620/facebook/1502351590.png?t=1631350329',
          large_url: 'https://upload.lixibox.com/system/pictures/files/000/023/620/large/1502351590.png?t=1631350329',
          medium_url: 'https://upload.lixibox.com/system/pictures/files/000/023/620/medium/1502351590.png?t=1631350329',
          original_url:
            'https://upload.lixibox.com/system/pictures/files/000/023/620/original/1502351590.png?t=1631350329',
          square_url: 'https://upload.lixibox.com/system/pictures/files/000/023/620/square/1502351590.png?t=1631350329',
          thumb_url: 'https://upload.lixibox.com/system/pictures/files/000/023/620/thumb/1502351590.png?t=1631350329',
          vertical_url:
            'https://upload.lixibox.com/system/pictures/files/000/023/620/vertical/1502351590.png?t=1631350329'
        },
        feedbackable_name:
          '[Nhập HOGIFT - FREE Quà 135K] Máy Rửa Mặt Halio Facial Cleansing & Massaging Device - Baby Pink',
        feedbackable_slug: 'halio-facial-cleansing-massaging-device-baby-pink',
        feedbackable_type: 'Box',
        parent_id: null,
        pictures: [
          {
            id: 62163,
            height: 650,
            url: 'https://upload.lixibox.com/system/pictures/files/000/062/163/large/1629912594.jpg?v=1',
            width: 960
          }
        ],
        rate: 5,
        review: 'Lông mềm mịn,rửa sạch..nói chung mua tới cái thứ2 rồi nên không còn gì để chê nữa',
        status: 'approved',
        user: {
          id: 450861,
          avatar: {
            large_url: 'https://upload.lixibox.com/system/users/avatars/000/450/861/large/1622647256.jpg',
            medium_url: 'https://upload.lixibox.com/system/users/avatars/000/450/861/medium/1622647256.jpg',
            original_url: 'https://upload.lixibox.com/system/users/avatars/000/450/861/original/1622647256.jpg',
            thumb_url: 'https://upload.lixibox.com/system/users/avatars/000/450/861/thumb/1622647256.jpg'
          },
          avatar_medium_url: 'https://upload.lixibox.com/system/users/avatars/000/450/861/medium/1622647256.jpg',
          avatar_thumb_url: 'https://upload.lixibox.com/system/users/avatars/000/450/861/thumb/1622647256.jpg',
          email: 'qtbichtrang98@gmail.com',
          first_name: 'Bích',
          last_name: 'Trang',
          name: 'Trang Bích'
        }
      },
      {
        id: 90683,
        comments: [],
        created_at: 1629698468,
        feedbackable_id: 3301,
        feedbackable_image: {
          facebook_url:
            'https://upload.lixibox.com/system/pictures/files/000/023/620/facebook/1502351590.png?t=1631350329',
          large_url: 'https://upload.lixibox.com/system/pictures/files/000/023/620/large/1502351590.png?t=1631350329',
          medium_url: 'https://upload.lixibox.com/system/pictures/files/000/023/620/medium/1502351590.png?t=1631350329',
          original_url:
            'https://upload.lixibox.com/system/pictures/files/000/023/620/original/1502351590.png?t=1631350329',
          square_url: 'https://upload.lixibox.com/system/pictures/files/000/023/620/square/1502351590.png?t=1631350329',
          thumb_url: 'https://upload.lixibox.com/system/pictures/files/000/023/620/thumb/1502351590.png?t=1631350329',
          vertical_url:
            'https://upload.lixibox.com/system/pictures/files/000/023/620/vertical/1502351590.png?t=1631350329'
        },
        feedbackable_name:
          '[Nhập HOGIFT - FREE Quà 135K] Máy Rửa Mặt Halio Facial Cleansing & Massaging Device - Baby Pink',
        feedbackable_slug: 'halio-facial-cleansing-massaging-device-baby-pink',
        feedbackable_type: 'Box',
        parent_id: null,
        pictures: [],
        rate: 5,
        review: 'Máy chạy rất tốt mình đã mua 4 máy rồi',
        status: 'approved',
        user: {
          id: 234333,
          avatar: {
            large_url: 'https://upload.lixibox.com/system/users/avatars/000/234/333/large/picture',
            medium_url: 'https://upload.lixibox.com/system/users/avatars/000/234/333/medium/picture',
            original_url: 'https://upload.lixibox.com/system/users/avatars/000/234/333/original/picture',
            thumb_url: 'https://upload.lixibox.com/system/users/avatars/000/234/333/thumb/picture'
          },
          avatar_medium_url: 'https://upload.lixibox.com/system/users/avatars/000/234/333/medium/picture',
          avatar_thumb_url: 'https://upload.lixibox.com/system/users/avatars/000/234/333/thumb/picture',
          email: 'tien.nguyen.hyhi@gmail.com',
          first_name: 'Tiên',
          last_name: 'Nguyễn',
          name: 'Nguyễn Tiên'
        }
      }
    ],
    paging: {
      current_page: 1,
      per_page: 10,
      total_pages: 315
    }
  }
};

const component = (params = {}) => {
  const props = {
    rating: boxFeedback['1390071224'].feedbacks
  };

  return <LandingPageRating {...Object.assign({}, props, params)} />;
};

describe('LandingPageRating', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
