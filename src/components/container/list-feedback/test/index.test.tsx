jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
jest.mock('../../../../utils/auth', () => ({
  auth: {
    loggedIn: () => true
  }
}));
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { reduxRender } from 'utils/test-utils';
import ListFeedback from '../index';

const component = (params = {}) => {
  const props = {
    openModal: jest.fn(),
    list: [
      {
        id: 110057,
        comments: [],
        created_at: 1671891765,
        feedbackable_id: 13048,
        feedbackable_image: {
          facebook_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/pictures/files/000/071/863/facebook/1650948149.jpg?t=1687600304',
          large_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/pictures/files/000/071/863/large/1650948149.jpg?t=1687600304',
          medium_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/pictures/files/000/071/863/medium/1650948149.jpg?t=1687600304',
          original_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/pictures/files/000/071/863/original/1650948149.jpg?t=1687600304',
          square_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/pictures/files/000/071/863/square/1650948149.jpg?t=1687600304',
          thumb_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/pictures/files/000/071/863/thumb/1650948149.jpg?t=1687600304',
          vertical_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/pictures/files/000/071/863/vertical/1650948149.jpg?t=1687600304'
        },
        feedbackable_lixibox_id: 'LX84B672D9FF',
        feedbackable_name: 'Halio Facial Cleansing & Massaging Device Hot Pink Limited Edition',
        feedbackable_slug:
          'free-qua-110k-nhap-tuoixinh-may-rua-mat-halio-facial-cleansing-massaging-device-hot-pink-limited-edition',
        feedbackable_type: 'Box',
        parent_id: null,
        pictures: [],
        rate: 5,
        review: 'Tiếp tục ủng hộ các sản phẩm của lixibox',
        status: 'approved',
        user: {
          id: 394126,
          avatar: {
            large_url:
              'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/users/avatars/000/394/126/large/1620622439.jpg',
            medium_url:
              'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/users/avatars/000/394/126/medium/1620622439.jpg',
            original_url:
              'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/users/avatars/000/394/126/original/1620622439.jpg',
            thumb_url:
              'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/users/avatars/000/394/126/thumb/1620622439.jpg'
          },
          avatar_medium_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/users/avatars/000/394/126/medium/1620622439.jpg',
          avatar_thumb_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/users/avatars/000/394/126/thumb/1620622439.jpg',
          email: 'khik0thanh88@gmail.com',
          first_name: 'Đan',
          last_name: 'Ms. Hàn Thảo',
          name: 'Ms. Hàn Thảo Đan',
          referral_code: 'DANF90B',
          uuid: 'ad171fa5-1b7d-11ec-aa2d-02447ca10480'
        }
      },
      {
        id: 109805,
        comments: [],
        created_at: 1670987603,
        feedbackable_id: 13048,
        feedbackable_image: {
          facebook_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/pictures/files/000/071/863/facebook/1650948149.jpg?t=1687600304',
          large_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/pictures/files/000/071/863/large/1650948149.jpg?t=1687600304',
          medium_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/pictures/files/000/071/863/medium/1650948149.jpg?t=1687600304',
          original_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/pictures/files/000/071/863/original/1650948149.jpg?t=1687600304',
          square_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/pictures/files/000/071/863/square/1650948149.jpg?t=1687600304',
          thumb_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/pictures/files/000/071/863/thumb/1650948149.jpg?t=1687600304',
          vertical_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/pictures/files/000/071/863/vertical/1650948149.jpg?t=1687600304'
        },
        feedbackable_lixibox_id: 'LX84B672D9FF',
        feedbackable_name: 'Halio Facial Cleansing & Massaging Device Hot Pink Limited Edition',
        feedbackable_slug:
          'free-qua-110k-nhap-tuoixinh-may-rua-mat-halio-facial-cleansing-massaging-device-hot-pink-limited-edition',
        feedbackable_type: 'Box',
        parent_id: null,
        pictures: [
          {
            id: 79732,
            height: 650,
            url: 'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/pictures/files/000/079/732/large/1670987604.jpg?v=1',
            width: 960
          }
        ],
        rate: 5,
        review: 'Được tặng bình nước cute lắm lun, máy rửa mặt chưa sử dụng nên chưa đánh giá được',
        status: 'approved',
        user: {
          id: 541019,
          avatar: {
            large_url:
              'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/users/avatars/000/541/019/large/1669735275.jpg',
            medium_url:
              'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/users/avatars/000/541/019/medium/1669735275.jpg',
            original_url:
              'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/users/avatars/000/541/019/original/1669735275.jpg',
            thumb_url:
              'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/users/avatars/000/541/019/thumb/1669735275.jpg'
          },
          avatar_medium_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/users/avatars/000/541/019/medium/1669735275.jpg',
          avatar_thumb_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/users/avatars/000/541/019/thumb/1669735275.jpg',
          email: 'lik_slinhle2106@gmail.com',
          first_name: 'Linh',
          last_name: 'Lê Trần Tuấn',
          name: 'Lê Trần Tuấn Linh',
          referral_code: 'LINHD6D95CD',
          uuid: '0c477b3b-1638-4ac4-8e66-342a432ef15f'
        }
      },
      {
        id: 107045,
        comments: [
          {
            id: 22150,
            avatar: {
              large_url:
                'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/users/avatars/000/310/256/large/1641981193.jpeg',
              medium_url:
                'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/users/avatars/000/310/256/medium/1641981193.jpeg',
              original_url:
                'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/users/avatars/000/310/256/original/1641981193.jpeg',
              thumb_url:
                'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/users/avatars/000/310/256/thumb/1641981193.jpeg'
            },
            content:
              'Thớt coi thử có xài gì ko hợp kích ứng ko, trvia mấy nay xài đỡ mụn, cảm giác sạch hơn k xài máy, nhả vía cho thớt  😊',
            created_at: 1663747415,
            user_name: 'Ms Thúy Kiều Yến'
          },
          {
            id: 22166,
            avatar: {
              large_url:
                'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/users/avatars/000/546/897/large/1661077047.jpg',
              medium_url:
                'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/users/avatars/000/546/897/medium/1661077047.jpg',
              original_url:
                'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/users/avatars/000/546/897/original/1661077047.jpg',
              thumb_url:
                'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/users/avatars/000/546/897/thumb/1661077047.jpg'
            },
            content: 'Trộm vía. Dạo này dùng ổn rồi k bị mụn nữa rồi mn ạ 🥰',
            created_at: 1664032425,
            user_name: 'Hàng Dờng Ngọc'
          },
          {
            id: 22177,
            avatar: {
              large_url: 'https://dummyimage.com/600x600/e6e6e6/858585.jpg&text=T',
              medium_url: 'https://dummyimage.com/600x600/e6e6e6/858585.jpg&text=T',
              thumb_url: 'https://dummyimage.com/600x600/e6e6e6/858585.jpg&text=T'
            },
            content: 'Lúc đầu mới xài sẽ lên mụn, nào quen dần hãy nâng tần suất sử dụng là ok',
            created_at: 1664199163,
            user_name: 'Gna Thoa'
          }
        ],
        created_at: 1663300990,
        feedbackable_id: 13048,
        feedbackable_image: {
          facebook_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/pictures/files/000/071/863/facebook/1650948149.jpg?t=1687600304',
          large_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/pictures/files/000/071/863/large/1650948149.jpg?t=1687600304',
          medium_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/pictures/files/000/071/863/medium/1650948149.jpg?t=1687600304',
          original_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/pictures/files/000/071/863/original/1650948149.jpg?t=1687600304',
          square_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/pictures/files/000/071/863/square/1650948149.jpg?t=1687600304',
          thumb_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/pictures/files/000/071/863/thumb/1650948149.jpg?t=1687600304',
          vertical_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/pictures/files/000/071/863/vertical/1650948149.jpg?t=1687600304'
        },
        feedbackable_lixibox_id: 'LX84B672D9FF',
        feedbackable_name: 'Halio Facial Cleansing & Massaging Device Hot Pink Limited Edition',
        feedbackable_slug:
          'free-qua-110k-nhap-tuoixinh-may-rua-mat-halio-facial-cleansing-massaging-device-hot-pink-limited-edition',
        feedbackable_type: 'Box',
        parent_id: null,
        pictures: [],
        rate: 5,
        review:
          'Mình dùng bị lên mụn. Dừng sdung thì thấy da ổn hơn :( mặt nạ bà kem dưỡng tặng kèm dùng khá ok. Dùng thêm 1 thời gian nữa xem sao',
        status: 'approved',
        user: {
          id: 546897,
          avatar: {
            large_url:
              'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/users/avatars/000/546/897/large/1661077047.jpg',
            medium_url:
              'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/users/avatars/000/546/897/medium/1661077047.jpg',
            original_url:
              'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/users/avatars/000/546/897/original/1661077047.jpg',
            thumb_url:
              'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/users/avatars/000/546/897/thumb/1661077047.jpg'
          },
          avatar_medium_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/users/avatars/000/546/897/medium/1661077047.jpg',
          avatar_thumb_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/users/avatars/000/546/897/thumb/1661077047.jpg',
          email: 'hutautt1996@gmail.com',
          first_name: 'Ngọc',
          last_name: 'Hàng Dờng',
          name: 'Hàng Dờng Ngọc',
          referral_code: 'NGOCCD32159',
          uuid: '5235e768-9684-41ee-9228-732134fa09ce'
        }
      },
      {
        id: 102303,
        comments: [],
        created_at: 1649938712,
        feedbackable_id: 13048,
        feedbackable_image: {
          facebook_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/pictures/files/000/071/863/facebook/1650948149.jpg?t=1687600304',
          large_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/pictures/files/000/071/863/large/1650948149.jpg?t=1687600304',
          medium_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/pictures/files/000/071/863/medium/1650948149.jpg?t=1687600304',
          original_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/pictures/files/000/071/863/original/1650948149.jpg?t=1687600304',
          square_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/pictures/files/000/071/863/square/1650948149.jpg?t=1687600304',
          thumb_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/pictures/files/000/071/863/thumb/1650948149.jpg?t=1687600304',
          vertical_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/pictures/files/000/071/863/vertical/1650948149.jpg?t=1687600304'
        },
        feedbackable_lixibox_id: 'LX84B672D9FF',
        feedbackable_name: 'Halio Facial Cleansing & Massaging Device Hot Pink Limited Edition',
        feedbackable_slug:
          'free-qua-110k-nhap-tuoixinh-may-rua-mat-halio-facial-cleansing-massaging-device-hot-pink-limited-edition',
        feedbackable_type: 'Box',
        parent_id: null,
        pictures: [],
        rate: 4,
        review: 'Mới sử dụng chưa biết như thế nào? Nhưng khá thích',
        status: 'approved',
        user: {
          id: 523592,
          avatar: {
            large_url: 'https://dummyimage.com/600x600/e6e6e6/858585.jpg&text=T',
            medium_url: 'https://dummyimage.com/600x600/e6e6e6/858585.jpg&text=T',
            thumb_url: 'https://dummyimage.com/600x600/e6e6e6/858585.jpg&text=T'
          },
          avatar_medium_url: 'https://dummyimage.com/600x600/e6e6e6/858585.jpg&text=T',
          avatar_thumb_url: 'https://dummyimage.com/600x600/e6e6e6/858585.jpg&text=T',
          email: 'minh3n1081994@gmail.com',
          first_name: 'Tuyền',
          last_name: 'Thị Thanh Hòa',
          name: 'Thị Thanh Hòa Tuyền',
          referral_code: 'TUYENFA1C62',
          uuid: '5ee364f9-4af9-43d5-809a-6bc7d28a6a5b'
        }
      },
      {
        id: 100829,
        comments: [],
        created_at: 1647260631,
        feedbackable_id: 13048,
        feedbackable_image: {
          facebook_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/pictures/files/000/071/863/facebook/1650948149.jpg?t=1687600304',
          large_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/pictures/files/000/071/863/large/1650948149.jpg?t=1687600304',
          medium_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/pictures/files/000/071/863/medium/1650948149.jpg?t=1687600304',
          original_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/pictures/files/000/071/863/original/1650948149.jpg?t=1687600304',
          square_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/pictures/files/000/071/863/square/1650948149.jpg?t=1687600304',
          thumb_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/pictures/files/000/071/863/thumb/1650948149.jpg?t=1687600304',
          vertical_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/pictures/files/000/071/863/vertical/1650948149.jpg?t=1687600304'
        },
        feedbackable_lixibox_id: 'LX84B672D9FF',
        feedbackable_name: 'Halio Facial Cleansing & Massaging Device Hot Pink Limited Edition',
        feedbackable_slug:
          'free-qua-110k-nhap-tuoixinh-may-rua-mat-halio-facial-cleansing-massaging-device-hot-pink-limited-edition',
        feedbackable_type: 'Box',
        parent_id: null,
        pictures: [
          {
            id: 70289,
            height: 650,
            url: 'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/pictures/files/000/070/289/large/1647260632.jpg?v=1',
            width: 960
          },
          {
            id: 70290,
            height: 650,
            url: 'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/pictures/files/000/070/290/large/1647260633.jpg?v=1',
            width: 960
          }
        ],
        rate: 5,
        review: 'Sản phẩm rất tốt Nhìn thích lắm Nhưng giao hàng lâu quá',
        status: 'approved',
        user: {
          id: 505363,
          avatar: {
            large_url:
              'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/users/avatars/000/505/363/large/1647308994.jpg',
            medium_url:
              'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/users/avatars/000/505/363/medium/1647308994.jpg',
            original_url:
              'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/users/avatars/000/505/363/original/1647308994.jpg',
            thumb_url:
              'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/users/avatars/000/505/363/thumb/1647308994.jpg'
          },
          avatar_medium_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/users/avatars/000/505/363/medium/1647308994.jpg',
          avatar_thumb_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/users/avatars/000/505/363/thumb/1647308994.jpg',
          email: 'ahn.w2121997@gmail.com',
          first_name: 'Anh',
          last_name: 'NGUYEN LE HOANG THI',
          name: 'Nguyen Le Hoang Thi Anh',
          referral_code: 'HUEBACCFBD4',
          uuid: '74372869-46d2-4afa-91e7-569ac1f27129'
        }
      },
      {
        id: 100825,
        comments: [
          {
            id: 20933,
            avatar: {
              large_url:
                'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/users/avatars/000/519/461/large/1646740557.jpg',
              medium_url:
                'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/users/avatars/000/519/461/medium/1646740557.jpg',
              original_url:
                'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/users/avatars/000/519/461/original/1646740557.jpg',
              thumb_url:
                'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/users/avatars/000/519/461/thumb/1646740557.jpg'
            },
            content: 'Mình đã đc nhân viên gọi hỗ trợ. Cám ơn Lixibox🥰🥰🥰',
            created_at: 1647318368,
            user_name: 'Ms Eri Kim'
          },
          {
            id: 20935,
            avatar: {
              large_url:
                'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/users/avatars/000/310/256/large/1641981193.jpeg',
              medium_url:
                'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/users/avatars/000/310/256/medium/1641981193.jpeg',
              original_url:
                'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/users/avatars/000/310/256/original/1641981193.jpeg',
              thumb_url:
                'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/users/avatars/000/310/256/thumb/1641981193.jpeg'
            },
            content: 'công nhận cskh của lixibox nhanh chóng tận tình thật',
            created_at: 1647333547,
            user_name: 'Ms Thúy Kiều Yến'
          }
        ],
        created_at: 1647258344,
        feedbackable_id: 13048,
        feedbackable_image: {
          facebook_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/pictures/files/000/071/863/facebook/1650948149.jpg?t=1687600304',
          large_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/pictures/files/000/071/863/large/1650948149.jpg?t=1687600304',
          medium_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/pictures/files/000/071/863/medium/1650948149.jpg?t=1687600304',
          original_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/pictures/files/000/071/863/original/1650948149.jpg?t=1687600304',
          square_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/pictures/files/000/071/863/square/1650948149.jpg?t=1687600304',
          thumb_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/pictures/files/000/071/863/thumb/1650948149.jpg?t=1687600304',
          vertical_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/pictures/files/000/071/863/vertical/1650948149.jpg?t=1687600304'
        },
        feedbackable_lixibox_id: 'LX84B672D9FF',
        feedbackable_name: 'Halio Facial Cleansing & Massaging Device Hot Pink Limited Edition',
        feedbackable_slug:
          'free-qua-110k-nhap-tuoixinh-may-rua-mat-halio-facial-cleansing-massaging-device-hot-pink-limited-edition',
        feedbackable_type: 'Box',
        parent_id: null,
        pictures: [],
        rate: 5,
        review:
          'Mình nhận máy được mấy ngày, máy rất đẹp nhưng sơ xuất không kiểm tra giờ mới biết là không gửi kèm dây sạc cho mình...huhuhu giờ không biết hỏi ai luôn hjc..hjc',
        status: 'approved',
        user: {
          id: 519461,
          avatar: {
            large_url:
              'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/users/avatars/000/519/461/large/1646740557.jpg',
            medium_url:
              'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/users/avatars/000/519/461/medium/1646740557.jpg',
            original_url:
              'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/users/avatars/000/519/461/original/1646740557.jpg',
            thumb_url:
              'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/users/avatars/000/519/461/thumb/1646740557.jpg'
          },
          avatar_medium_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/users/avatars/000/519/461/medium/1646740557.jpg',
          avatar_thumb_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/users/avatars/000/519/461/thumb/1646740557.jpg',
          email: 'tbh.btk106@yahoo.com.vn',
          first_name: 'Kim',
          last_name: 'Ms Eri',
          name: 'Ms Eri Kim',
          referral_code: 'KIMF375A545',
          uuid: '9b0c860f-e956-4b04-a3e0-b09f4167251a'
        }
      },
      {
        id: 100738,
        comments: [],
        created_at: 1647102385,
        feedbackable_id: 13048,
        feedbackable_image: {
          facebook_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/pictures/files/000/071/863/facebook/1650948149.jpg?t=1687600304',
          large_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/pictures/files/000/071/863/large/1650948149.jpg?t=1687600304',
          medium_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/pictures/files/000/071/863/medium/1650948149.jpg?t=1687600304',
          original_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/pictures/files/000/071/863/original/1650948149.jpg?t=1687600304',
          square_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/pictures/files/000/071/863/square/1650948149.jpg?t=1687600304',
          thumb_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/pictures/files/000/071/863/thumb/1650948149.jpg?t=1687600304',
          vertical_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/pictures/files/000/071/863/vertical/1650948149.jpg?t=1687600304'
        },
        feedbackable_lixibox_id: 'LX84B672D9FF',
        feedbackable_name: 'Halio Facial Cleansing & Massaging Device Hot Pink Limited Edition',
        feedbackable_slug:
          'free-qua-110k-nhap-tuoixinh-may-rua-mat-halio-facial-cleansing-massaging-device-hot-pink-limited-edition',
        feedbackable_type: 'Box',
        parent_id: null,
        pictures: [],
        rate: 5,
        review: 'Rửa thấy êm và cảm giác da mặt sạch hơn',
        status: 'approved',
        user: {
          id: 512970,
          avatar: {
            large_url: 'https://dummyimage.com/600x600/e6e6e6/858585.jpg&text=M',
            medium_url: 'https://dummyimage.com/600x600/e6e6e6/858585.jpg&text=M',
            thumb_url: 'https://dummyimage.com/600x600/e6e6e6/858585.jpg&text=M'
          },
          avatar_medium_url: 'https://dummyimage.com/600x600/e6e6e6/858585.jpg&text=M',
          avatar_thumb_url: 'https://dummyimage.com/600x600/e6e6e6/858585.jpg&text=M',
          email: 'p3_giy15031994@gmail.com',
          first_name: 'My',
          last_name: 'minh Bạch Vân',
          name: 'Minh Bạch Vân My',
          referral_code: 'MYAA346A627',
          uuid: 'cf3f7339-3852-43e0-bf6f-c9ec52521bcf'
        }
      },
      {
        id: 100737,
        comments: [],
        created_at: 1647101869,
        feedbackable_id: 13048,
        feedbackable_image: {
          facebook_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/pictures/files/000/071/863/facebook/1650948149.jpg?t=1687600304',
          large_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/pictures/files/000/071/863/large/1650948149.jpg?t=1687600304',
          medium_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/pictures/files/000/071/863/medium/1650948149.jpg?t=1687600304',
          original_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/pictures/files/000/071/863/original/1650948149.jpg?t=1687600304',
          square_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/pictures/files/000/071/863/square/1650948149.jpg?t=1687600304',
          thumb_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/pictures/files/000/071/863/thumb/1650948149.jpg?t=1687600304',
          vertical_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/pictures/files/000/071/863/vertical/1650948149.jpg?t=1687600304'
        },
        feedbackable_lixibox_id: 'LX84B672D9FF',
        feedbackable_name: 'Halio Facial Cleansing & Massaging Device Hot Pink Limited Edition',
        feedbackable_slug:
          'free-qua-110k-nhap-tuoixinh-may-rua-mat-halio-facial-cleansing-massaging-device-hot-pink-limited-edition',
        feedbackable_type: 'Box',
        parent_id: null,
        pictures: [],
        rate: 5,
        review: 'Máy ổn mình sài thấy oke sẽ tiếp tục ủng hộ',
        status: 'approved',
        user: {
          id: 389386,
          avatar: {
            large_url:
              'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/users/avatars/000/389/386/large/picture',
            medium_url:
              'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/users/avatars/000/389/386/medium/picture',
            original_url:
              'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/users/avatars/000/389/386/original/picture',
            thumb_url:
              'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/users/avatars/000/389/386/thumb/picture'
          },
          avatar_medium_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/users/avatars/000/389/386/medium/picture',
          avatar_thumb_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/users/avatars/000/389/386/thumb/picture',
          email: 'mayphang0180@gmail.com',
          first_name: 'Hằng',
          last_name: '12Dung',
          name: '12dung Hằng',
          referral_code: 'HANG06B8',
          uuid: 'acf66f01-1b7d-11ec-aa2d-02447ca10480'
        }
      },
      {
        id: 100423,
        comments: [
          {
            id: 20869,
            avatar: {
              large_url:
                'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/users/avatars/000/310/257/large/1648612268.jpeg',
              medium_url:
                'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/users/avatars/000/310/257/medium/1648612268.jpeg',
              original_url:
                'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/users/avatars/000/310/257/original/1648612268.jpeg',
              thumb_url:
                'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/users/avatars/000/310/257/thumb/1648612268.jpeg'
            },
            content: 'công nhận có mrm da sạch với mềm mịn hơn hẳn',
            created_at: 1646821416,
            user_name: 'Đoàn Nguyễn Gia Hà'
          }
        ],
        created_at: 1646742769,
        feedbackable_id: 13048,
        feedbackable_image: {
          facebook_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/pictures/files/000/071/863/facebook/1650948149.jpg?t=1687600304',
          large_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/pictures/files/000/071/863/large/1650948149.jpg?t=1687600304',
          medium_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/pictures/files/000/071/863/medium/1650948149.jpg?t=1687600304',
          original_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/pictures/files/000/071/863/original/1650948149.jpg?t=1687600304',
          square_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/pictures/files/000/071/863/square/1650948149.jpg?t=1687600304',
          thumb_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/pictures/files/000/071/863/thumb/1650948149.jpg?t=1687600304',
          vertical_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/pictures/files/000/071/863/vertical/1650948149.jpg?t=1687600304'
        },
        feedbackable_lixibox_id: 'LX84B672D9FF',
        feedbackable_name: 'Halio Facial Cleansing & Massaging Device Hot Pink Limited Edition',
        feedbackable_slug:
          'free-qua-110k-nhap-tuoixinh-may-rua-mat-halio-facial-cleansing-massaging-device-hot-pink-limited-edition',
        feedbackable_type: 'Box',
        parent_id: null,
        pictures: [],
        rate: 5,
        review:
          'Dùng ok, có nhiều mức để chọn điều chỉnh. Bạn nào mua lần đầu nhập mã của m để được giảm 200k nhớ Mã: *********',
        status: 'approved',
        user: {
          id: 442995,
          avatar: {
            large_url: 'https://dummyimage.com/600x600/e6e6e6/858585.jpg&text=H',
            medium_url: 'https://dummyimage.com/600x600/e6e6e6/858585.jpg&text=H',
            thumb_url: 'https://dummyimage.com/600x600/e6e6e6/858585.jpg&text=H'
          },
          avatar_medium_url: 'https://dummyimage.com/600x600/e6e6e6/858585.jpg&text=H',
          avatar_thumb_url: 'https://dummyimage.com/600x600/e6e6e6/858585.jpg&text=H',
          email: 'sunralue265@gmail.com',
          first_name: 'Hang',
          last_name: 'Âu Thị Hương',
          name: 'Âu Thị Hương Hang',
          referral_code: 'HANGB6A3732',
          uuid: 'ae72db89-1b7d-11ec-aa2d-02447ca10480'
        }
      },
      {
        id: 100422,
        comments: [],
        created_at: 1646742580,
        feedbackable_id: 13048,
        feedbackable_image: {
          facebook_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/pictures/files/000/071/863/facebook/1650948149.jpg?t=1687600304',
          large_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/pictures/files/000/071/863/large/1650948149.jpg?t=1687600304',
          medium_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/pictures/files/000/071/863/medium/1650948149.jpg?t=1687600304',
          original_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/pictures/files/000/071/863/original/1650948149.jpg?t=1687600304',
          square_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/pictures/files/000/071/863/square/1650948149.jpg?t=1687600304',
          thumb_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/pictures/files/000/071/863/thumb/1650948149.jpg?t=1687600304',
          vertical_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/pictures/files/000/071/863/vertical/1650948149.jpg?t=1687600304'
        },
        feedbackable_lixibox_id: 'LX84B672D9FF',
        feedbackable_name: 'Halio Facial Cleansing & Massaging Device Hot Pink Limited Edition',
        feedbackable_slug:
          'free-qua-110k-nhap-tuoixinh-may-rua-mat-halio-facial-cleansing-massaging-device-hot-pink-limited-edition',
        feedbackable_type: 'Box',
        parent_id: null,
        pictures: [],
        rate: 5,
        review: 'mua cái thứ 2 rồi, sp dùng ok',
        status: 'approved',
        user: {
          id: 369825,
          avatar: {
            large_url: 'https://dummyimage.com/600x600/e6e6e6/858585.jpg&text=N',
            medium_url: 'https://dummyimage.com/600x600/e6e6e6/858585.jpg&text=N',
            thumb_url: 'https://dummyimage.com/600x600/e6e6e6/858585.jpg&text=N'
          },
          avatar_medium_url: 'https://dummyimage.com/600x600/e6e6e6/858585.jpg&text=N',
          avatar_thumb_url: 'https://dummyimage.com/600x600/e6e6e6/858585.jpg&text=N',
          email: 'tnatusx2gi@privaterelay.appleid.com',
          first_name: 'Nhi',
          last_name: 'Ms Thúy Kiều',
          name: 'Ms Thúy Kiều Nhi',
          referral_code: 'NHI922E',
          uuid: 'ac74cc94-1b7d-11ec-aa2d-02447ca10480'
        }
      }
    ],
    rating: {
      avg_rate: 4.7,
      count: 4337
    },
    current: 1,
    per: 10,
    total: 434,
    urlList: [
      {
        number: 1,
        title: 1,
        link: '#'
      },
      {
        number: 2,
        title: 2,
        link: '#'
      },
      {
        number: 3,
        title: 3,
        link: '#'
      },
      {
        number: 4,
        title: 4,
        link: '#'
      },
      {
        number: 5,
        title: 5,
        link: '#'
      },
      {
        number: 6,
        title: 6,
        link: '#'
      },
      {
        number: 7,
        title: 7,
        link: '#'
      },
      {
        number: 8,
        title: 8,
        link: '#'
      },
      {
        number: 9,
        title: 9,
        link: '#'
      },
      {
        number: 10,
        title: 10,
        link: '#'
      },
      {
        number: 11,
        title: 11,
        link: '#'
      },
      {
        number: 12,
        title: 12,
        link: '#'
      },
      {
        number: 13,
        title: 13,
        link: '#'
      },
      {
        number: 14,
        title: 14,
        link: '#'
      },
      {
        number: 15,
        title: 15,
        link: '#'
      },
      {
        number: 16,
        title: 16,
        link: '#'
      },
      {
        number: 17,
        title: 17,
        link: '#'
      },
      {
        number: 18,
        title: 18,
        link: '#'
      },
      {
        number: 19,
        title: 19,
        link: '#'
      },
      {
        number: 20,
        title: 20,
        link: '#'
      },
      {
        number: 21,
        title: 21,
        link: '#'
      },
      {
        number: 22,
        title: 22,
        link: '#'
      },
      {
        number: 23,
        title: 23,
        link: '#'
      },
      {
        number: 24,
        title: 24,
        link: '#'
      },
      {
        number: 25,
        title: 25,
        link: '#'
      },
      {
        number: 26,
        title: 26,
        link: '#'
      },
      {
        number: 27,
        title: 27,
        link: '#'
      },
      {
        number: 28,
        title: 28,
        link: '#'
      },
      {
        number: 29,
        title: 29,
        link: '#'
      },
      {
        number: 30,
        title: 30,
        link: '#'
      },
      {
        number: 31,
        title: 31,
        link: '#'
      },
      {
        number: 32,
        title: 32,
        link: '#'
      },
      {
        number: 33,
        title: 33,
        link: '#'
      },
      {
        number: 34,
        title: 34,
        link: '#'
      },
      {
        number: 35,
        title: 35,
        link: '#'
      },
      {
        number: 36,
        title: 36,
        link: '#'
      },
      {
        number: 37,
        title: 37,
        link: '#'
      },
      {
        number: 38,
        title: 38,
        link: '#'
      },
      {
        number: 39,
        title: 39,
        link: '#'
      },
      {
        number: 40,
        title: 40,
        link: '#'
      },
      {
        number: 41,
        title: 41,
        link: '#'
      },
      {
        number: 42,
        title: 42,
        link: '#'
      },
      {
        number: 43,
        title: 43,
        link: '#'
      },
      {
        number: 44,
        title: 44,
        link: '#'
      },
      {
        number: 45,
        title: 45,
        link: '#'
      },
      {
        number: 46,
        title: 46,
        link: '#'
      },
      {
        number: 47,
        title: 47,
        link: '#'
      },
      {
        number: 48,
        title: 48,
        link: '#'
      },
      {
        number: 49,
        title: 49,
        link: '#'
      },
      {
        number: 50,
        title: 50,
        link: '#'
      },
      {
        number: 51,
        title: 51,
        link: '#'
      },
      {
        number: 52,
        title: 52,
        link: '#'
      },
      {
        number: 53,
        title: 53,
        link: '#'
      },
      {
        number: 54,
        title: 54,
        link: '#'
      },
      {
        number: 55,
        title: 55,
        link: '#'
      },
      {
        number: 56,
        title: 56,
        link: '#'
      },
      {
        number: 57,
        title: 57,
        link: '#'
      },
      {
        number: 58,
        title: 58,
        link: '#'
      },
      {
        number: 59,
        title: 59,
        link: '#'
      },
      {
        number: 60,
        title: 60,
        link: '#'
      },
      {
        number: 61,
        title: 61,
        link: '#'
      },
      {
        number: 62,
        title: 62,
        link: '#'
      },
      {
        number: 63,
        title: 63,
        link: '#'
      },
      {
        number: 64,
        title: 64,
        link: '#'
      },
      {
        number: 65,
        title: 65,
        link: '#'
      },
      {
        number: 66,
        title: 66,
        link: '#'
      },
      {
        number: 67,
        title: 67,
        link: '#'
      },
      {
        number: 68,
        title: 68,
        link: '#'
      },
      {
        number: 69,
        title: 69,
        link: '#'
      },
      {
        number: 70,
        title: 70,
        link: '#'
      },
      {
        number: 71,
        title: 71,
        link: '#'
      },
      {
        number: 72,
        title: 72,
        link: '#'
      },
      {
        number: 73,
        title: 73,
        link: '#'
      },
      {
        number: 74,
        title: 74,
        link: '#'
      },
      {
        number: 75,
        title: 75,
        link: '#'
      },
      {
        number: 76,
        title: 76,
        link: '#'
      },
      {
        number: 77,
        title: 77,
        link: '#'
      },
      {
        number: 78,
        title: 78,
        link: '#'
      },
      {
        number: 79,
        title: 79,
        link: '#'
      },
      {
        number: 80,
        title: 80,
        link: '#'
      },
      {
        number: 81,
        title: 81,
        link: '#'
      },
      {
        number: 82,
        title: 82,
        link: '#'
      },
      {
        number: 83,
        title: 83,
        link: '#'
      },
      {
        number: 84,
        title: 84,
        link: '#'
      },
      {
        number: 85,
        title: 85,
        link: '#'
      },
      {
        number: 86,
        title: 86,
        link: '#'
      },
      {
        number: 87,
        title: 87,
        link: '#'
      },
      {
        number: 88,
        title: 88,
        link: '#'
      },
      {
        number: 89,
        title: 89,
        link: '#'
      },
      {
        number: 90,
        title: 90,
        link: '#'
      },
      {
        number: 91,
        title: 91,
        link: '#'
      },
      {
        number: 92,
        title: 92,
        link: '#'
      },
      {
        number: 93,
        title: 93,
        link: '#'
      },
      {
        number: 94,
        title: 94,
        link: '#'
      },
      {
        number: 95,
        title: 95,
        link: '#'
      },
      {
        number: 96,
        title: 96,
        link: '#'
      },
      {
        number: 97,
        title: 97,
        link: '#'
      },
      {
        number: 98,
        title: 98,
        link: '#'
      },
      {
        number: 99,
        title: 99,
        link: '#'
      },
      {
        number: 100,
        title: 100,
        link: '#'
      },
      {
        number: 101,
        title: 101,
        link: '#'
      },
      {
        number: 102,
        title: 102,
        link: '#'
      },
      {
        number: 103,
        title: 103,
        link: '#'
      },
      {
        number: 104,
        title: 104,
        link: '#'
      },
      {
        number: 105,
        title: 105,
        link: '#'
      },
      {
        number: 106,
        title: 106,
        link: '#'
      },
      {
        number: 107,
        title: 107,
        link: '#'
      },
      {
        number: 108,
        title: 108,
        link: '#'
      },
      {
        number: 109,
        title: 109,
        link: '#'
      },
      {
        number: 110,
        title: 110,
        link: '#'
      },
      {
        number: 111,
        title: 111,
        link: '#'
      },
      {
        number: 112,
        title: 112,
        link: '#'
      },
      {
        number: 113,
        title: 113,
        link: '#'
      },
      {
        number: 114,
        title: 114,
        link: '#'
      },
      {
        number: 115,
        title: 115,
        link: '#'
      },
      {
        number: 116,
        title: 116,
        link: '#'
      },
      {
        number: 117,
        title: 117,
        link: '#'
      },
      {
        number: 118,
        title: 118,
        link: '#'
      },
      {
        number: 119,
        title: 119,
        link: '#'
      },
      {
        number: 120,
        title: 120,
        link: '#'
      },
      {
        number: 121,
        title: 121,
        link: '#'
      },
      {
        number: 122,
        title: 122,
        link: '#'
      },
      {
        number: 123,
        title: 123,
        link: '#'
      },
      {
        number: 124,
        title: 124,
        link: '#'
      },
      {
        number: 125,
        title: 125,
        link: '#'
      },
      {
        number: 126,
        title: 126,
        link: '#'
      },
      {
        number: 127,
        title: 127,
        link: '#'
      },
      {
        number: 128,
        title: 128,
        link: '#'
      },
      {
        number: 129,
        title: 129,
        link: '#'
      },
      {
        number: 130,
        title: 130,
        link: '#'
      },
      {
        number: 131,
        title: 131,
        link: '#'
      },
      {
        number: 132,
        title: 132,
        link: '#'
      },
      {
        number: 133,
        title: 133,
        link: '#'
      },
      {
        number: 134,
        title: 134,
        link: '#'
      },
      {
        number: 135,
        title: 135,
        link: '#'
      },
      {
        number: 136,
        title: 136,
        link: '#'
      },
      {
        number: 137,
        title: 137,
        link: '#'
      },
      {
        number: 138,
        title: 138,
        link: '#'
      },
      {
        number: 139,
        title: 139,
        link: '#'
      },
      {
        number: 140,
        title: 140,
        link: '#'
      },
      {
        number: 141,
        title: 141,
        link: '#'
      },
      {
        number: 142,
        title: 142,
        link: '#'
      },
      {
        number: 143,
        title: 143,
        link: '#'
      },
      {
        number: 144,
        title: 144,
        link: '#'
      },
      {
        number: 145,
        title: 145,
        link: '#'
      },
      {
        number: 146,
        title: 146,
        link: '#'
      },
      {
        number: 147,
        title: 147,
        link: '#'
      },
      {
        number: 148,
        title: 148,
        link: '#'
      },
      {
        number: 149,
        title: 149,
        link: '#'
      },
      {
        number: 150,
        title: 150,
        link: '#'
      },
      {
        number: 151,
        title: 151,
        link: '#'
      },
      {
        number: 152,
        title: 152,
        link: '#'
      },
      {
        number: 153,
        title: 153,
        link: '#'
      },
      {
        number: 154,
        title: 154,
        link: '#'
      },
      {
        number: 155,
        title: 155,
        link: '#'
      },
      {
        number: 156,
        title: 156,
        link: '#'
      },
      {
        number: 157,
        title: 157,
        link: '#'
      },
      {
        number: 158,
        title: 158,
        link: '#'
      },
      {
        number: 159,
        title: 159,
        link: '#'
      },
      {
        number: 160,
        title: 160,
        link: '#'
      },
      {
        number: 161,
        title: 161,
        link: '#'
      },
      {
        number: 162,
        title: 162,
        link: '#'
      },
      {
        number: 163,
        title: 163,
        link: '#'
      },
      {
        number: 164,
        title: 164,
        link: '#'
      },
      {
        number: 165,
        title: 165,
        link: '#'
      },
      {
        number: 166,
        title: 166,
        link: '#'
      },
      {
        number: 167,
        title: 167,
        link: '#'
      },
      {
        number: 168,
        title: 168,
        link: '#'
      },
      {
        number: 169,
        title: 169,
        link: '#'
      },
      {
        number: 170,
        title: 170,
        link: '#'
      },
      {
        number: 171,
        title: 171,
        link: '#'
      },
      {
        number: 172,
        title: 172,
        link: '#'
      },
      {
        number: 173,
        title: 173,
        link: '#'
      },
      {
        number: 174,
        title: 174,
        link: '#'
      },
      {
        number: 175,
        title: 175,
        link: '#'
      },
      {
        number: 176,
        title: 176,
        link: '#'
      },
      {
        number: 177,
        title: 177,
        link: '#'
      },
      {
        number: 178,
        title: 178,
        link: '#'
      },
      {
        number: 179,
        title: 179,
        link: '#'
      },
      {
        number: 180,
        title: 180,
        link: '#'
      },
      {
        number: 181,
        title: 181,
        link: '#'
      },
      {
        number: 182,
        title: 182,
        link: '#'
      },
      {
        number: 183,
        title: 183,
        link: '#'
      },
      {
        number: 184,
        title: 184,
        link: '#'
      },
      {
        number: 185,
        title: 185,
        link: '#'
      },
      {
        number: 186,
        title: 186,
        link: '#'
      },
      {
        number: 187,
        title: 187,
        link: '#'
      },
      {
        number: 188,
        title: 188,
        link: '#'
      },
      {
        number: 189,
        title: 189,
        link: '#'
      },
      {
        number: 190,
        title: 190,
        link: '#'
      },
      {
        number: 191,
        title: 191,
        link: '#'
      },
      {
        number: 192,
        title: 192,
        link: '#'
      },
      {
        number: 193,
        title: 193,
        link: '#'
      },
      {
        number: 194,
        title: 194,
        link: '#'
      },
      {
        number: 195,
        title: 195,
        link: '#'
      },
      {
        number: 196,
        title: 196,
        link: '#'
      },
      {
        number: 197,
        title: 197,
        link: '#'
      },
      {
        number: 198,
        title: 198,
        link: '#'
      },
      {
        number: 199,
        title: 199,
        link: '#'
      },
      {
        number: 200,
        title: 200,
        link: '#'
      },
      {
        number: 201,
        title: 201,
        link: '#'
      },
      {
        number: 202,
        title: 202,
        link: '#'
      },
      {
        number: 203,
        title: 203,
        link: '#'
      },
      {
        number: 204,
        title: 204,
        link: '#'
      },
      {
        number: 205,
        title: 205,
        link: '#'
      },
      {
        number: 206,
        title: 206,
        link: '#'
      },
      {
        number: 207,
        title: 207,
        link: '#'
      },
      {
        number: 208,
        title: 208,
        link: '#'
      },
      {
        number: 209,
        title: 209,
        link: '#'
      },
      {
        number: 210,
        title: 210,
        link: '#'
      },
      {
        number: 211,
        title: 211,
        link: '#'
      },
      {
        number: 212,
        title: 212,
        link: '#'
      },
      {
        number: 213,
        title: 213,
        link: '#'
      },
      {
        number: 214,
        title: 214,
        link: '#'
      },
      {
        number: 215,
        title: 215,
        link: '#'
      },
      {
        number: 216,
        title: 216,
        link: '#'
      },
      {
        number: 217,
        title: 217,
        link: '#'
      },
      {
        number: 218,
        title: 218,
        link: '#'
      },
      {
        number: 219,
        title: 219,
        link: '#'
      },
      {
        number: 220,
        title: 220,
        link: '#'
      },
      {
        number: 221,
        title: 221,
        link: '#'
      },
      {
        number: 222,
        title: 222,
        link: '#'
      },
      {
        number: 223,
        title: 223,
        link: '#'
      },
      {
        number: 224,
        title: 224,
        link: '#'
      },
      {
        number: 225,
        title: 225,
        link: '#'
      },
      {
        number: 226,
        title: 226,
        link: '#'
      },
      {
        number: 227,
        title: 227,
        link: '#'
      },
      {
        number: 228,
        title: 228,
        link: '#'
      },
      {
        number: 229,
        title: 229,
        link: '#'
      },
      {
        number: 230,
        title: 230,
        link: '#'
      },
      {
        number: 231,
        title: 231,
        link: '#'
      },
      {
        number: 232,
        title: 232,
        link: '#'
      },
      {
        number: 233,
        title: 233,
        link: '#'
      },
      {
        number: 234,
        title: 234,
        link: '#'
      },
      {
        number: 235,
        title: 235,
        link: '#'
      },
      {
        number: 236,
        title: 236,
        link: '#'
      },
      {
        number: 237,
        title: 237,
        link: '#'
      },
      {
        number: 238,
        title: 238,
        link: '#'
      },
      {
        number: 239,
        title: 239,
        link: '#'
      },
      {
        number: 240,
        title: 240,
        link: '#'
      },
      {
        number: 241,
        title: 241,
        link: '#'
      },
      {
        number: 242,
        title: 242,
        link: '#'
      },
      {
        number: 243,
        title: 243,
        link: '#'
      },
      {
        number: 244,
        title: 244,
        link: '#'
      },
      {
        number: 245,
        title: 245,
        link: '#'
      },
      {
        number: 246,
        title: 246,
        link: '#'
      },
      {
        number: 247,
        title: 247,
        link: '#'
      },
      {
        number: 248,
        title: 248,
        link: '#'
      },
      {
        number: 249,
        title: 249,
        link: '#'
      },
      {
        number: 250,
        title: 250,
        link: '#'
      },
      {
        number: 251,
        title: 251,
        link: '#'
      },
      {
        number: 252,
        title: 252,
        link: '#'
      },
      {
        number: 253,
        title: 253,
        link: '#'
      },
      {
        number: 254,
        title: 254,
        link: '#'
      },
      {
        number: 255,
        title: 255,
        link: '#'
      },
      {
        number: 256,
        title: 256,
        link: '#'
      },
      {
        number: 257,
        title: 257,
        link: '#'
      },
      {
        number: 258,
        title: 258,
        link: '#'
      },
      {
        number: 259,
        title: 259,
        link: '#'
      },
      {
        number: 260,
        title: 260,
        link: '#'
      },
      {
        number: 261,
        title: 261,
        link: '#'
      },
      {
        number: 262,
        title: 262,
        link: '#'
      },
      {
        number: 263,
        title: 263,
        link: '#'
      },
      {
        number: 264,
        title: 264,
        link: '#'
      },
      {
        number: 265,
        title: 265,
        link: '#'
      },
      {
        number: 266,
        title: 266,
        link: '#'
      },
      {
        number: 267,
        title: 267,
        link: '#'
      },
      {
        number: 268,
        title: 268,
        link: '#'
      },
      {
        number: 269,
        title: 269,
        link: '#'
      },
      {
        number: 270,
        title: 270,
        link: '#'
      },
      {
        number: 271,
        title: 271,
        link: '#'
      },
      {
        number: 272,
        title: 272,
        link: '#'
      },
      {
        number: 273,
        title: 273,
        link: '#'
      },
      {
        number: 274,
        title: 274,
        link: '#'
      },
      {
        number: 275,
        title: 275,
        link: '#'
      },
      {
        number: 276,
        title: 276,
        link: '#'
      },
      {
        number: 277,
        title: 277,
        link: '#'
      },
      {
        number: 278,
        title: 278,
        link: '#'
      },
      {
        number: 279,
        title: 279,
        link: '#'
      },
      {
        number: 280,
        title: 280,
        link: '#'
      },
      {
        number: 281,
        title: 281,
        link: '#'
      },
      {
        number: 282,
        title: 282,
        link: '#'
      },
      {
        number: 283,
        title: 283,
        link: '#'
      },
      {
        number: 284,
        title: 284,
        link: '#'
      },
      {
        number: 285,
        title: 285,
        link: '#'
      },
      {
        number: 286,
        title: 286,
        link: '#'
      },
      {
        number: 287,
        title: 287,
        link: '#'
      },
      {
        number: 288,
        title: 288,
        link: '#'
      },
      {
        number: 289,
        title: 289,
        link: '#'
      },
      {
        number: 290,
        title: 290,
        link: '#'
      },
      {
        number: 291,
        title: 291,
        link: '#'
      },
      {
        number: 292,
        title: 292,
        link: '#'
      },
      {
        number: 293,
        title: 293,
        link: '#'
      },
      {
        number: 294,
        title: 294,
        link: '#'
      },
      {
        number: 295,
        title: 295,
        link: '#'
      },
      {
        number: 296,
        title: 296,
        link: '#'
      },
      {
        number: 297,
        title: 297,
        link: '#'
      },
      {
        number: 298,
        title: 298,
        link: '#'
      },
      {
        number: 299,
        title: 299,
        link: '#'
      },
      {
        number: 300,
        title: 300,
        link: '#'
      },
      {
        number: 301,
        title: 301,
        link: '#'
      },
      {
        number: 302,
        title: 302,
        link: '#'
      },
      {
        number: 303,
        title: 303,
        link: '#'
      },
      {
        number: 304,
        title: 304,
        link: '#'
      },
      {
        number: 305,
        title: 305,
        link: '#'
      },
      {
        number: 306,
        title: 306,
        link: '#'
      },
      {
        number: 307,
        title: 307,
        link: '#'
      },
      {
        number: 308,
        title: 308,
        link: '#'
      },
      {
        number: 309,
        title: 309,
        link: '#'
      },
      {
        number: 310,
        title: 310,
        link: '#'
      },
      {
        number: 311,
        title: 311,
        link: '#'
      },
      {
        number: 312,
        title: 312,
        link: '#'
      },
      {
        number: 313,
        title: 313,
        link: '#'
      },
      {
        number: 314,
        title: 314,
        link: '#'
      },
      {
        number: 315,
        title: 315,
        link: '#'
      },
      {
        number: 316,
        title: 316,
        link: '#'
      },
      {
        number: 317,
        title: 317,
        link: '#'
      },
      {
        number: 318,
        title: 318,
        link: '#'
      },
      {
        number: 319,
        title: 319,
        link: '#'
      },
      {
        number: 320,
        title: 320,
        link: '#'
      },
      {
        number: 321,
        title: 321,
        link: '#'
      },
      {
        number: 322,
        title: 322,
        link: '#'
      },
      {
        number: 323,
        title: 323,
        link: '#'
      },
      {
        number: 324,
        title: 324,
        link: '#'
      },
      {
        number: 325,
        title: 325,
        link: '#'
      },
      {
        number: 326,
        title: 326,
        link: '#'
      },
      {
        number: 327,
        title: 327,
        link: '#'
      },
      {
        number: 328,
        title: 328,
        link: '#'
      },
      {
        number: 329,
        title: 329,
        link: '#'
      },
      {
        number: 330,
        title: 330,
        link: '#'
      },
      {
        number: 331,
        title: 331,
        link: '#'
      },
      {
        number: 332,
        title: 332,
        link: '#'
      },
      {
        number: 333,
        title: 333,
        link: '#'
      },
      {
        number: 334,
        title: 334,
        link: '#'
      },
      {
        number: 335,
        title: 335,
        link: '#'
      },
      {
        number: 336,
        title: 336,
        link: '#'
      },
      {
        number: 337,
        title: 337,
        link: '#'
      },
      {
        number: 338,
        title: 338,
        link: '#'
      },
      {
        number: 339,
        title: 339,
        link: '#'
      },
      {
        number: 340,
        title: 340,
        link: '#'
      },
      {
        number: 341,
        title: 341,
        link: '#'
      },
      {
        number: 342,
        title: 342,
        link: '#'
      },
      {
        number: 343,
        title: 343,
        link: '#'
      },
      {
        number: 344,
        title: 344,
        link: '#'
      },
      {
        number: 345,
        title: 345,
        link: '#'
      },
      {
        number: 346,
        title: 346,
        link: '#'
      },
      {
        number: 347,
        title: 347,
        link: '#'
      },
      {
        number: 348,
        title: 348,
        link: '#'
      },
      {
        number: 349,
        title: 349,
        link: '#'
      },
      {
        number: 350,
        title: 350,
        link: '#'
      },
      {
        number: 351,
        title: 351,
        link: '#'
      },
      {
        number: 352,
        title: 352,
        link: '#'
      },
      {
        number: 353,
        title: 353,
        link: '#'
      },
      {
        number: 354,
        title: 354,
        link: '#'
      },
      {
        number: 355,
        title: 355,
        link: '#'
      },
      {
        number: 356,
        title: 356,
        link: '#'
      },
      {
        number: 357,
        title: 357,
        link: '#'
      },
      {
        number: 358,
        title: 358,
        link: '#'
      },
      {
        number: 359,
        title: 359,
        link: '#'
      },
      {
        number: 360,
        title: 360,
        link: '#'
      },
      {
        number: 361,
        title: 361,
        link: '#'
      },
      {
        number: 362,
        title: 362,
        link: '#'
      },
      {
        number: 363,
        title: 363,
        link: '#'
      },
      {
        number: 364,
        title: 364,
        link: '#'
      },
      {
        number: 365,
        title: 365,
        link: '#'
      },
      {
        number: 366,
        title: 366,
        link: '#'
      },
      {
        number: 367,
        title: 367,
        link: '#'
      },
      {
        number: 368,
        title: 368,
        link: '#'
      },
      {
        number: 369,
        title: 369,
        link: '#'
      },
      {
        number: 370,
        title: 370,
        link: '#'
      },
      {
        number: 371,
        title: 371,
        link: '#'
      },
      {
        number: 372,
        title: 372,
        link: '#'
      },
      {
        number: 373,
        title: 373,
        link: '#'
      },
      {
        number: 374,
        title: 374,
        link: '#'
      },
      {
        number: 375,
        title: 375,
        link: '#'
      },
      {
        number: 376,
        title: 376,
        link: '#'
      },
      {
        number: 377,
        title: 377,
        link: '#'
      },
      {
        number: 378,
        title: 378,
        link: '#'
      },
      {
        number: 379,
        title: 379,
        link: '#'
      },
      {
        number: 380,
        title: 380,
        link: '#'
      },
      {
        number: 381,
        title: 381,
        link: '#'
      },
      {
        number: 382,
        title: 382,
        link: '#'
      },
      {
        number: 383,
        title: 383,
        link: '#'
      },
      {
        number: 384,
        title: 384,
        link: '#'
      },
      {
        number: 385,
        title: 385,
        link: '#'
      },
      {
        number: 386,
        title: 386,
        link: '#'
      },
      {
        number: 387,
        title: 387,
        link: '#'
      },
      {
        number: 388,
        title: 388,
        link: '#'
      },
      {
        number: 389,
        title: 389,
        link: '#'
      },
      {
        number: 390,
        title: 390,
        link: '#'
      },
      {
        number: 391,
        title: 391,
        link: '#'
      },
      {
        number: 392,
        title: 392,
        link: '#'
      },
      {
        number: 393,
        title: 393,
        link: '#'
      },
      {
        number: 394,
        title: 394,
        link: '#'
      },
      {
        number: 395,
        title: 395,
        link: '#'
      },
      {
        number: 396,
        title: 396,
        link: '#'
      },
      {
        number: 397,
        title: 397,
        link: '#'
      },
      {
        number: 398,
        title: 398,
        link: '#'
      },
      {
        number: 399,
        title: 399,
        link: '#'
      },
      {
        number: 400,
        title: 400,
        link: '#'
      },
      {
        number: 401,
        title: 401,
        link: '#'
      },
      {
        number: 402,
        title: 402,
        link: '#'
      },
      {
        number: 403,
        title: 403,
        link: '#'
      },
      {
        number: 404,
        title: 404,
        link: '#'
      },
      {
        number: 405,
        title: 405,
        link: '#'
      },
      {
        number: 406,
        title: 406,
        link: '#'
      },
      {
        number: 407,
        title: 407,
        link: '#'
      },
      {
        number: 408,
        title: 408,
        link: '#'
      },
      {
        number: 409,
        title: 409,
        link: '#'
      },
      {
        number: 410,
        title: 410,
        link: '#'
      },
      {
        number: 411,
        title: 411,
        link: '#'
      },
      {
        number: 412,
        title: 412,
        link: '#'
      },
      {
        number: 413,
        title: 413,
        link: '#'
      },
      {
        number: 414,
        title: 414,
        link: '#'
      },
      {
        number: 415,
        title: 415,
        link: '#'
      },
      {
        number: 416,
        title: 416,
        link: '#'
      },
      {
        number: 417,
        title: 417,
        link: '#'
      },
      {
        number: 418,
        title: 418,
        link: '#'
      },
      {
        number: 419,
        title: 419,
        link: '#'
      },
      {
        number: 420,
        title: 420,
        link: '#'
      },
      {
        number: 421,
        title: 421,
        link: '#'
      },
      {
        number: 422,
        title: 422,
        link: '#'
      },
      {
        number: 423,
        title: 423,
        link: '#'
      },
      {
        number: 424,
        title: 424,
        link: '#'
      },
      {
        number: 425,
        title: 425,
        link: '#'
      },
      {
        number: 426,
        title: 426,
        link: '#'
      },
      {
        number: 427,
        title: 427,
        link: '#'
      },
      {
        number: 428,
        title: 428,
        link: '#'
      },
      {
        number: 429,
        title: 429,
        link: '#'
      },
      {
        number: 430,
        title: 430,
        link: '#'
      },
      {
        number: 431,
        title: 431,
        link: '#'
      },
      {
        number: 432,
        title: 432,
        link: '#'
      },
      {
        number: 433,
        title: 433,
        link: '#'
      },
      {
        number: 434,
        title: 434,
        link: '#'
      }
    ],
    canScrollToTop: false,
    isLoading: false,
    boxFeedbackPicture: {
      '1652810996': [
        {
          id: 79732,
          height: 2048,
          url: 'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/pictures/files/000/079/732/original/1670987604.jpg?v=1',
          width: 1536
        },
        {
          id: 70290,
          height: 2048,
          url: 'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/pictures/files/000/070/290/original/1647260633.jpg?v=1',
          width: 1536
        },
        {
          id: 70289,
          height: 2048,
          url: 'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/pictures/files/000/070/289/original/1647260632.jpg?v=1',
          width: 1152
        },
        {
          id: 69913,
          height: 1536,
          url: 'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/pictures/files/000/069/913/original/1646568736.jpg?v=1',
          width: 1152
        },
        {
          id: 69907,
          height: 1536,
          url: 'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/pictures/files/000/069/907/original/1646560632.jpg?v=1',
          width: 2048
        },
        {
          id: 69427,
          height: 2048,
          url: 'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/pictures/files/000/069/427/original/1645682368.jpg?v=1',
          width: 1536
        },
        {
          id: 69426,
          height: 2048,
          url: 'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/pictures/files/000/069/426/original/1645682368.jpg?v=1',
          width: 1536
        },
        {
          id: 69425,
          height: 2048,
          url: 'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/pictures/files/000/069/425/original/1645682368.jpg?v=1',
          width: 1536
        },
        {
          id: 69305,
          height: 433,
          url: 'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/pictures/files/000/069/305/original/1645508670.jpeg?v=1',
          width: 650
        },
        {
          id: 68857,
          height: 1536,
          url: 'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/pictures/files/000/068/857/original/1644565104.jpg?v=1',
          width: 1152
        },
        {
          id: 68855,
          height: 535,
          url: 'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/pictures/files/000/068/855/original/1644560164.jpg?v=1',
          width: 742
        },
        {
          id: 68083,
          height: 3024,
          url: 'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/pictures/files/000/068/083/original/1642140299.jpeg?v=1',
          width: 4032
        },
        {
          id: 68082,
          height: 3024,
          url: 'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/pictures/files/000/068/082/original/1642140293.jpeg?v=1',
          width: 4032
        },
        {
          id: 68081,
          height: 3024,
          url: 'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/pictures/files/000/068/081/original/1642140287.jpeg?v=1',
          width: 4032
        },
        {
          id: 67455,
          height: 3456,
          url: 'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/pictures/files/000/067/455/original/1640250140.jpeg?v=1',
          width: 3456
        },
        {
          id: 67328,
          height: 2048,
          url: 'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/pictures/files/000/067/328/original/1639934981.jpg?v=1',
          width: 1152
        },
        {
          id: 67009,
          height: 1536,
          url: 'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/pictures/files/000/067/009/original/1639495562.jpg?v=1',
          width: 1536
        },
        {
          id: 65965,
          height: 2048,
          url: 'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/pictures/files/000/065/965/original/1638265666.jpg?v=1',
          width: 1536
        },
        {
          id: 65756,
          height: 1600,
          url: 'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/pictures/files/000/065/756/original/1637986520.jpeg?v=1',
          width: 1200
        },
        {
          id: 65670,
          height: 2400,
          url: 'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/pictures/files/000/065/670/original/1637829972.jpeg?v=1',
          width: 1080
        },
        {
          id: 65669,
          height: 2400,
          url: 'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/pictures/files/000/065/669/original/1637829969.jpeg?v=1',
          width: 1080
        }
      ]
    },
    boxFeedbackable: {
      canReview: false,
      reviewed: false,
      slug: ''
    },
    idProductHash: '1652810996',
    productId: 13048,
    handleClick: jest.fn(),
    handleSetOpenFeedbackModal: jest.fn(),
    setTypeModal: jest.fn(),
    onOpenImage: jest.fn(),
    isSticky: false,
    elementId: '',
    scrollToElementNum: 1571.4375,
    isOnModal: false
  };

  return <ListFeedback {...Object.assign({}, props, params)} />;
};
const resizeWindow = (width, height) => {
  global.innerWidth = width;
  global.innerHeight = height;
  expect(window.innerWidth).toBe(width);
  expect(window.innerHeight).toBe(height);
};
describe('ListFeedback mobile', () => {
  const user = userEvent.setup();
  test(`render`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });

  test(`isOnModal`, () => {
    resizeWindow(390, 844);
    const boxFBLixicoin = 10;
    reduxRender(component({ isOnModal: true, lixicoinPerFeedback: boxFBLixicoin }), {
      initialState: {}
    });

    const submitBtn = screen.getByText(`Gửi đánh giá và có thêm ${boxFBLixicoin} Lixicoin`);

    expect(submitBtn).toBeInTheDocument();
  });

  test('click btn review', async () => {
    const handle = jest.fn();
    resizeWindow(390, 844);
    reduxRender(component({ handleSetOpenFeedbackModal: handle, isOnModal: false }), {
      initialState: {}
    });
    const submitBtn = screen.getByText('Gửi đánh giá của bạn');
    expect(submitBtn).toBeInTheDocument();

    await user.click(submitBtn);
    expect(handle).toBeCalledTimes(1);
  });
});

describe('ListFeedback desktop', () => {
  test('empty list', () => {
    resizeWindow(1200, 969);
    reduxRender(component({ list: [] }), {
      initialState: {}
    });
    const empty = screen.getByText('Sử dụng sản phẩm và trở thành người đánh giá đầu tiên bạn nhé');

    expect(empty).toBeInTheDocument();
  });
  test('image from user desktop', () => {
    reduxRender(component(), {
      initialState: {}
    });
    const imgTextContent = screen.getByText('Hình ảnh từ người dùng');
    expect(imgTextContent).toBeInTheDocument();
  });
});
