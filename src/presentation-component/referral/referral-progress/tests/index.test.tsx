jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import ReferralProgress from '..';

const component = (params = {}) => {
  const props = {
    progress: 80
  };

  return <ReferralProgress {...Object.assign({}, props, params)} />;
};

describe('ReferralProgress', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
