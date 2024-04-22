jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import ReferralDetail from '..';

const referee = {
  minimum_order_value: 1000,
  rewards: [],
  require_purchases: [],
  conditional_message: 'Conditional message',
  reward_message: 'Reward message'
};

const referrer = {
  rewards: [],
  reward_message: 'Reward message'
};

const scheme = {
  id: 1,
  banner: { url: 'https://example.com/url', width: 0, height: 0 },
  start_at: new Date().getTime() / 1000,
  end_at: new Date().getTime() / 1000 + 1000,
  name: 'Scheme 1',
  notes: [{ content: 'Note 1' }, { content: 'Note 2' }],
  platform: 'web',
  status: 'available' as const,
  referee,
  referrer
};

const component = (params = {}) => {
  const props = {
    code: 'ABCDEF',
    scheme,
    button: {
      title: 'Title',
      disabled: false,
      loading: false,
      color: 'pink',
      onClick: jest.fn()
    },
    onCopy: jest.fn()
  } as any;

  return <ReferralDetail {...Object.assign({}, props, params)} />;
};

describe('ReferralDetail', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
