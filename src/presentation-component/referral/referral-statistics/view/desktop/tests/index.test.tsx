jest.mock('../../../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../../../utils/test-utils';
import ReferralStatistics from '..';

const component = (params = {}) => {
  const props = {
    lixicoin: 12345,
    balance: 125000
  };

  return <ReferralStatistics {...Object.assign({}, props, params)} />;
};

describe('ReferralStatistics', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
