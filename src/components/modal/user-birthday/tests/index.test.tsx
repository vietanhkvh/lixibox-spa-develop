import Modal from 'react-modal';
import { fireEvent, act } from '@testing-library/react';

import { reduxRender } from '../../../../utils/test-utils';
import UserBirthdayModal from '..';
import { IUserBirthdayProps } from '../model';

Modal.setAppElement(document.body.appendChild(document.createElement('div')));

const storeBoxes = [
  {
    id: 3117,
    price: 1629000,
    stock: 8,
    store: {
      id: 9,
      closing_time: 1612879200,
      district_id: 770,
      embed_map_url:
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.35707200078!2d106.69255031490538!3d10.783939992316414!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f36a7e3f97d%3A0x904c50f7e49a661a!2sLixibox!5e0!3m2!1sen!2s!4v1551341354074',
      full_address: '16 Phạm Ngọc Thạch, Phường 06, Quận 3, Thành Phố Hồ Chí Minh',
      latitude: '10.78394',
      longitude: '106.694739',
      map_url:
        'https://www.google.com/maps/place/Lixibox/@10.78394,106.6925503,17z/data=!3m1!4b1!4m5!3m4!1s0x31752f36a7e3f97d:0x904c50f7e49a661a!8m2!3d10.78394!4d106.694739',
      name: 'Cửa hàng Phạm Ngọc Thạch, TP.HCM',
      opening_time: 1612836000,
      phone: '18002040',
      pickupable: true,
      province_id: 79,
      ward_id: 9218
    }
  },
  {
    id: 5104,
    price: 1629000,
    stock: 8,
    store: {
      id: 30,
      closing_time: 1612879200,
      district_id: 768,
      embed_map_url:
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.165157880262!2d106.68586151524235!3d10.79865959230646!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528d028070859%3A0x4dbcdc8964dd2c08!2zMTYwIFBoYW4gWMOtY2ggTG9uZywgUGjGsOG7nW5nIDcsIFBow7ogTmh14bqtbiwgSOG7kyBDaMOtIE1pbmggNzAwMDAwLCBWaWV0bmFt!5e0!3m2!1sen!2s!4v1593452754439!5m2!1sen!2s',
      full_address: '160 Phan Xích Long, Phường 07, Quận Phú Nhuận, Thành Phố Hồ Chí Minh',
      latitude: '10.79866',
      longitude: '106.685862',
      map_url:
        'https://www.google.com/maps/place/160+Phan+X%C3%ADch+Long,+Ph%C6%B0%E1%BB%9Dng+7,+Ph%C3%BA+Nhu%E1%BA%ADn,+Th%C3%A0nh+ph%E1%BB%91+H%E1%BB%93+Ch%C3%AD+Minh+700000/@10.7974504,106.6912297,21z',
      name: 'Cửa hàng Phan Xích Long, TP.HCM',
      opening_time: 1612836000,
      phone: '18002040',
      pickupable: false,
      province_id: 79,
      ward_id: 9189
    }
  }
];
const component = (params = {}) => {
  const props = {
    data: {
      box: storeBoxes[0],
      setBirthdayAction: jest.fn()
    },
    isSetUserBirthdaySuccess: false
  } as IUserBirthdayProps;

  return <UserBirthdayModal {...Object.assign({}, props, params)} />;
};

describe('UserBirthdayModal', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date(2023, 10, 2)); // December 2, 2023
  });
  afterAll(() => {
    jest.useRealTimers();
  });
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });

  const resizeWindow = (width, height) => {
    global.innerWidth = width;
    global.innerHeight = height;
    expect(window.innerWidth).toBe(width);
    expect(window.innerHeight).toBe(height);
  };

  test(`render setted birthday mobile screen`, async () => {
    resizeWindow(390, 844);

    reduxRender(component(), {
      initialState: { auth: { userInfo: { birthday: 942224509 } } } //December 11, 1999
    });

    const stickyBtn = document.getElementsByClassName('icon giftIcon')[0];
    expect(stickyBtn).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(stickyBtn);
    });
    const messageSettedBirthday = document.getElementsByClassName('message mobile')[0];
    expect(messageSettedBirthday).toBeInTheDocument();
    expect(messageSettedBirthday.innerHTML).toContain(`Bạn sẽ nhận quà tặng kèm theo đơn hàng đầu tiên trong tháng`);
  });

  test(`render submit bithday flow on mobile screen`, async () => {
    resizeWindow(390, 844);
    const setBirthdayAction = jest.fn();
    const { rerender } = reduxRender(
      component({ isSetUserBirthdaySuccess: false, setBirthdayAction: setBirthdayAction })
    );

    const stickyBtn = document.getElementsByClassName('icon giftIcon')[0];
    expect(stickyBtn).toBeInTheDocument();
    fireEvent.click(stickyBtn);

    const inputDate = document.getElementById('birthday');
    fireEvent.change(inputDate, { target: { value: '2020-05-12' } });
    const submitButton = document.getElementsByClassName('submitButton')[0];
    await act(async () => {
      fireEvent.click(submitButton);
    });

    const directLink = document.getElementsByClassName('directLink mobile')[0];
    expect(directLink).toBeInTheDocument();

    rerender(component({ isSetUserBirthdaySuccess: true }));
    fireEvent.click(stickyBtn);

    expect(inputDate).toHaveValue('2020-05-12');
  });
});
