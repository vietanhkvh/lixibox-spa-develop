jest.mock('../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));

import { reduxRender } from '../../../utils/test-utils';
import BoxMessage from '../view';

const message = {
  type: 'HAPPY_BIRTHDAY',
  icon: 'color-birthday-gift',
  title: ['Cập nhật ngày sinh'],
  description: 'Để Lixibox chuẩn bị quà sinh nhật cho bạn nhé!',
  buttonLink: '/user//profile-edit',
  buttonTitle: 'Cập nhật ngay',
  subDescription: ''
};

const component = (params = {}) => {
  const props = {
    message
  };

  return <BoxMessage {...Object.assign({}, props, params)} />;
};

describe('BoxMessage', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
