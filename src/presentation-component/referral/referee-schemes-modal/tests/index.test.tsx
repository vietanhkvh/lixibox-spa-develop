import Modal from 'react-modal';
jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import RefereeSchemesModal from '..';
import { REFEREE_SCHEMES_MODAL_INVOCATION_MODE } from 'constants/application/referral';

Modal.setAppElement(document.body.appendChild(document.createElement('div')));

const schemes = [
  {
    id: 4,
    banner: {
      height: 0,
      url: 'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/referral/schemes/banners/000/000/004/original/open-uri20220308-19627-am3xg7',
      width: 0
    },
    conditions: {
      matched_count: 3,
      count: 4,
      items: [
        {
          description: 'Trong giai đoạn kích hoạt',
          matched: true
        },
        {
          description: 'Đơn hàng đầu tiên',
          matched: true
        },
        {
          description: 'Đạt giá trị tối thiểu',
          matched: false
        },
        {
          description: 'Mua đủ các box chương trình yêu cầu',
          matched: true
        }
      ]
    },
    end_at: 10430496288,
    name: 'Scheme web 2',
    notes: [
      {
        content: 'Note 1'
      },
      {
        content: 'Note 2'
      }
    ],
    platform: 'web',
    referee: {
      minimum_order_value: 5000000,
      rewards: [],
      require_purchases: [],
      conditional_message: 'Mua may tam nuoc cam tay Halio UltraClean Oral Irrigator - Periwinkle',
      reward_message: '60k va may rua mat halio hot and cool'
    },
    referrer: {
      rewards: [],
      reward_message: '50k va may rua mat original'
    },
    start_at: 1644426000,
    status: 'available' as const
  },
  {
    id: 5,
    banner: {
      height: 0,
      url: 'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/referral/schemes/banners/000/000/005/original/open-uri20220308-19627-bt6mxj',
      width: 0
    },
    conditions: {
      matched_count: 4,
      count: 4,
      items: [
        {
          description: 'Trong giai đoạn kích hoạt',
          matched: true
        },
        {
          description: 'Đơn hàng đầu tiên',
          matched: true
        },
        {
          description: 'Đạt giá trị tối thiểu',
          matched: true
        },
        {
          description: 'Mua đủ các box chương trình yêu cầu',
          matched: true
        }
      ]
    },
    end_at: 1675962000,
    name: 'Scheme web 1',
    notes: [],
    platform: 'web',
    referee: {
      minimum_order_value: 500000,
      rewards: [],
      require_purchases: [],
      conditional_message: 'Mua may tam nuoc cam tay Halio UltraClean Oral Irrigator - Periwinkle',
      reward_message: '60k va may rua mat halio hot and cool'
    },
    referrer: {
      rewards: [],
      reward_message: '50k va may rua mat original'
    },
    start_at: 1644426000,
    status: 'available' as const
  },
  {
    id: 6,
    banner: {
      height: 0,
      url: 'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/referral/schemes/banners/000/000/006/original/open-uri20220308-19627-16xpk7b',
      width: 0
    },
    conditions: {
      matched_count: 3,
      count: 4,
      items: [
        {
          description: 'Trong giai đoạn kích hoạt',
          matched: false
        },
        {
          description: 'Đơn hàng đầu tiên',
          matched: true
        },
        {
          description: 'Đạt giá trị tối thiểu',
          matched: true
        },
        {
          description: 'Mua đủ các box chương trình yêu cầu',
          matched: true
        }
      ]
    },
    end_at: 1645164936,
    name: 'Expired web',
    notes: [
      {
        content: 'Note 1'
      },
      {
        content: 'Note 2'
      }
    ],
    platform: 'web',
    referee: {
      minimum_order_value: 500000,
      rewards: [],
      require_purchases: [],
      conditional_message: 'Mua may tam nuoc cam tay Halio UltraClean Oral Irrigator - Periwinkle',
      reward_message: '60k va may rua mat halio hot and cool'
    },
    referrer: {
      rewards: [],
      reward_message: '50k va may rua mat original'
    },
    start_at: 1644426000,
    status: 'expired' as const
  },
  {
    id: 7,
    banner: {
      height: 0,
      url: 'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/referral/schemes/banners/000/000/007/original/open-uri20220308-19627-7ci1v0',
      width: 0
    },
    conditions: {
      matched_count: 3,
      count: 4,
      items: [
        {
          description: 'Trong giai đoạn kích hoạt',
          matched: false
        },
        {
          description: 'Đơn hàng đầu tiên',
          matched: true
        },
        {
          description: 'Đạt giá trị tối thiểu',
          matched: true
        },
        {
          description: 'Mua đủ các box chương trình yêu cầu',
          matched: true
        }
      ]
    },
    end_at: 1645170535,
    name: 'Expired 2',
    notes: [
      {
        content: 'Note 1'
      },
      {
        content: 'Note 2'
      }
    ],
    platform: 'web',
    referee: {
      minimum_order_value: 500000,
      rewards: [],
      require_purchases: [],
      conditional_message: 'Mua may tam nuoc cam tay Halio UltraClean Oral Irrigator - Periwinkle',
      reward_message: '60k va may rua mat halio hot and cool'
    },
    referrer: {
      rewards: [],
      reward_message: '50k va may rua mat original'
    },
    start_at: 1644426000,
    status: 'expired' as const
  }
];

const component = (params = {}) => {
  const props = {
    mode: REFEREE_SCHEMES_MODAL_INVOCATION_MODE.WITH_BUTTON,
    code: 'ABCDEF',
    schemes,
    primaryButton: {
      title: 'PrimaryButton',
      loading: false,
      disabled: false,
      onSubmit: jest.fn()
    },
    appliedScheme: schemes[0],
    applyingId: null,
    isLoaded: true,
    isOpen: true,
    onRequestClose: jest.fn(),
    onSchemeClick: jest.fn(),
    onSchemeApply: jest.fn()
  } as any;

  return <RefereeSchemesModal {...Object.assign({}, props, params)} />;
};

describe('RefereeSchemesModal', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
