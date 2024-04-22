jest.mock('../../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import DashboardContainer from '../index';
import { reduxRender } from '../../../../../utils/test-utils';

const component = (params = {}) => {
  const props = {};
  return <DashboardContainer {...Object.assign({}, props, params)} />;
};

describe('DashboardContainer', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
