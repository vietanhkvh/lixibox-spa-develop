import Modal from 'react-modal';
import { withRouter } from 'react-router-dom';
jest.mock('../../../../../../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../../../../../../utils/test-utils';
import AddonEntry from '..';

Modal.setAppElement(document.body.appendChild(document.createElement('div')));

const accompanies = {
  available: {
    index: [
      {
        id: 3,
        description: 'Khắc tên để quà thêm ấn tượng',
        fee: 20000,
        name: 'Khắc tên lên máy',
        options: [
          {
            id: 3,
            fee: 10000,
            image_url: null,
            name: 'Thủ công',
            type: 'option'
          },
          {
            id: 2,
            fee: 20000,
            image_url: null,
            name: 'Laser thường',
            type: 'option'
          },
          {
            id: 1,
            fee: 30000,
            image_url: null,
            name: 'Laser cao cấp',
            type: 'option'
          }
        ],
        required_note: true,
        type: 'service'
      },
      {
        id: 1,
        description: 'Bao gồm: Hộp quà + Thiệp chúc mừng',
        fee: 30000,
        name: 'Gói quà tặng bạn bè, người thân',
        options: [],
        required_note: true,
        type: 'service'
      },
      {
        id: 2,
        description: 'Trai Đẹp Sẵn Sàng - Chờ Nàng Chốt Đơn',
        fee: 30000,
        name: 'Trai Đẹp Ship Hàng',
        options: [],
        required_note: false,
        type: 'service'
      }
    ],
    fetching: false,
    loaded: true,
    errored: false
  },
  local: [
    {
      serviceId: 3,
      optionId: 3,
      selected: true,
      fee: 0,
      note: 'test message 1',
      isValid: true
    },
    {
      serviceId: 1,
      selected: true,
      fee: 0,
      note: 'test message 2',
      isValid: true
    },
    {
      serviceId: 2,
      selected: true,
      fee: 0,
      note: '',
      isValid: true
    }
  ],
  edited: true,
  update: {
    updating: false,
    errored: false
  }
};

const component = (params = {}) => {
  const props = {
    service: accompanies.available.index[0],
    selection: accompanies.local[0] as any,
    messageWordLimit: 5,
    onAction: jest.fn()
  };

  return withRouter((routerProps) => <AddonEntry {...Object.assign({}, props, routerProps, params)} />);
};

describe('AddonEntry', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
