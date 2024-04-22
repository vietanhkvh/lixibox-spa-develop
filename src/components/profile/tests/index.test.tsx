import Modal from 'react-modal';
import { fireEvent } from '@testing-library/react';
jest.mock('../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../utils/test-utils';
import '../../../utils/jest/expectations';
import UserProfile from '..';
import { GENDER_TYPE } from '../../../constants/application/gender';

Modal.setAppElement(document.body.appendChild(document.createElement('div')));

const user = {
  id: 300111,
  email: 'name@lixibox.com',
  first_name: 'Firstname',
  last_name: 'Lastname',
  gender: GENDER_TYPE.FEMALE.id,
  birthday: 631152000,
  balance: null,
  is_expert: false,
  expert_slug: null,
  referral_code: 'ABCDEF95E7',
  coins: 0,
  earned_coins: 0,
  membership_level: 0,
  membership_level_started_at: 0,
  is_admin: true,
  created_at: 1573804491,
  name: 'Lastname Firstname',
  avatar: {
    original_url: 'https://dummyimage.com/600x600/e6e6e6/858585.jpg\u0026text=S',
    large_url: 'https://dummyimage.com/600x600/e6e6e6/858585.jpg\u0026text=S',
    medium_url: 'https://dummyimage.com/600x600/e6e6e6/858585.jpg\u0026text=S',
    thumb_url: 'https://dummyimage.com/600x600/e6e6e6/858585.jpg\u0026text=S',
    blur_url: 'https://dummyimage.com/600x600/e6e6e6/858585.jpg\u0026text=S',
    facebook_url: 'https://dummyimage.com/600x600/e6e6e6/858585.jpg\u0026text=S'
  },
  number_of_boxes: 0,
  orders_count: 1,
  mobile_referral_code: 'ABCDEF023D',
  phone: '0342658900',
  address: '11 Pham Hung',
  full_address: '11 Pham Hung, Phường An Phú, Quận 2, Thành Phố Hồ Chí Minh',
  province_id: 79,
  district_id: 769,
  ward_id: 9202,
  ward: {
    id: 9202,
    created_at: '2018-05-28T11:37:03.000+07:00',
    updated_at: '2018-05-28T11:37:03.000+07:00',
    name: 'An Phú',
    unit: 'Phường',
    district_id: 769,
    position: 2,
    latitude: null,
    longitude: null
  },
  discount_code_ids: [],
  social_accounts: [],
  addresses: [
    {
      id: 397131,
      first_name: '31',
      last_name: 'Bfwf, fewfewf, edowqdw',
      full_name: 'Bfwf, Fewfewf, Edowqdw 31',
      phone: '0453843333',
      address: '13dw, dwo2w2, e2owdowqd',
      full_address: '13dw, dwo2w2, e2owdowqd, Phường An Phú, Quận 2, Thành Phố Hồ Chí Minh',
      province_id: 79,
      district_id: 769,
      ward: {
        id: 9202,
        created_at: '2018-05-28T11:37:03.000+07:00',
        updated_at: '2018-05-28T11:37:03.000+07:00',
        name: 'An Phú',
        unit: 'Phường',
        district_id: 769,
        position: 2,
        latitude: null,
        longitude: null
      },
      ward_id: 9202,
      is_primary_address: true,
      is_usable: true,
      created_at: 1578573027
    },
    {
      id: 397132,
      first_name: 'Ho',
      last_name: 'Viet Tuan',
      full_name: 'Viet Tuan Ho',
      phone: '0342658000',
      address: '2 Pham Hung',
      full_address: '2 Pham Hung, Phường An Phú, Quận 2, Thành Phố Hồ Chí Minh',
      province_id: 79,
      district_id: 769,
      ward: {
        id: 9202,
        created_at: '2018-05-28T11:37:03.000+07:00',
        updated_at: '2018-05-28T11:37:03.000+07:00',
        name: 'An Phú',
        unit: 'Phường',
        district_id: 769,
        position: 2,
        latitude: null,
        longitude: null
      },
      ward_id: 9202,
      is_primary_address: false,
      is_usable: true,
      created_at: 1578574177
    }
  ]
};

const showHeader = false;
const openAlertAction = jest.fn();
const editUserProfileForm = jest.fn();
const changePasswordForm = jest.fn();
const isChangedProfileSuccess = false;
const isChangedPasswordSuccess = false;
const component = (params = {}) => {
  const props = {
    openAlertAction,
    showHeader,
    user,
    editUserProfileForm,
    changePasswordForm,
    isChangedPasswordSuccess,
    isChangedProfileSuccess
  };

  return <UserProfile {...Object.assign({}, props, params)} />;
};

afterEach(() => {
  jest.resetAllMocks();
});

// TODO: Component should be renamed to `ProfileEdit` or something that closely reflects the context
// TODO: Refactor tests by utilizing `toBeVisible`, once <FadeIn> component has been refactored
describe('PriceFilterDesktop', () => {
  describe(`user information update form`, () => {
    describe(`validation`, () => {
      describe(`user name field`, () => {
        test(`validates length`, () => {
          const { getByTestId, queryByText, queryByDisplayValue } = reduxRender(component(), { initialState: {} });

          // initially no error is displayed and displays full user name
          expect(queryByText(`Họ và tên`)).not.toBeNull();
          expect(queryByText(user.last_name + ' ' + user.first_name)).not.toBeNull();
          expect(queryByText(`Thay đổi họ và tên`)).toBeNull();

          // onClick, a modal appears
          fireEvent.click(queryByText(user.last_name + ' ' + user.first_name));
          expect(queryByText(`Thay đổi họ và tên`)).not.toBeNull();
          expect(queryByDisplayValue(user.last_name + ' ' + user.first_name)).not.toBeNull();

          // where, the field value can be edited
          fireEvent.change(getByTestId('full-name-field'), { target: { value: 'ab c' } });

          // An empty value raises error
          fireEvent.change(getByTestId('full-name-field'), { target: { value: '' } });
          expect(queryByText(`Vui lòng nhập thông tin`)).not.toBeNull();

          // A value with insufficient length also raises error
          fireEvent.change(getByTestId('full-name-field'), { target: { value: 'ab c' } });
          expect(queryByText(`Yêu cầu nhập tối thiểu 5 ký tự`)).not.toBeNull();
        });
      });

      describe(`phone number field`, () => {
        test(`validates length and character type 'number'`, () => {
          const { queryByText } = reduxRender(component(), { initialState: {} });

          // initially no error is displayed and displays full user name
          expect(queryByText(`Số điện thoại`)).not.toBeNull();
          expect(queryByText(user.phone)).not.toBeNull();
          expect(queryByText(`Thay đổi số điện thoại`)).toBeNull();

          // onClick, a modal appears
          fireEvent.click(queryByText(user.phone));
          // expect(queryByText(`Thay đổi số điện thoại`)).not.toBeNull();
          // expect(queryByDisplayValue(user.phone)).not.toBeNull();
          // expect(queryByText('Cập nhật')).not.toBeNull();
        });
      });

      describe(`gender field`, () => {
        test(`user can change entry`, () => {
          const { queryByText } = reduxRender(component({ user: { gender: null } }), { initialState: {} });

          // initially no error is displayed and displays full user name
          expect(queryByText(`Giới tính`)).not.toBeNull();
          expect(queryByText(`Nam`)).toBeNull();
          expect(queryByText(`Nữ`)).toBeNull();
          expect(queryByText(`Thay đổi giới tính`)).toBeNull();
        });
      });

      describe(`date of birth field`, () => {
        test(`user can change entry`, () => {
          const { queryByText } = reduxRender(component({ user: { birthday: 0 } }), { initialState: {} });

          expect(queryByText(`Ngày sinh`)).not.toBeNull();
          expect(queryByText(`Thay đổi ngày sinh`)).toBeNull();

          fireEvent.click(queryByText(`Ngày sinh`));
          expect(queryByText(`Thay đổi ngày sinh`)).not.toBeNull();
        });
      });
    });
  });
});
