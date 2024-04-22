jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
window.HTMLElement.prototype.scrollIntoView = jest.fn();
import { reduxRender } from '../../../../utils/test-utils';
import ReferralStatisticsAndHistory from '..';

const component = (params = {}) => {
  const props = {};

  return <ReferralStatisticsAndHistory {...Object.assign({}, props, params)} />;
};

describe('ReferralStatisticsAndHistory', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
