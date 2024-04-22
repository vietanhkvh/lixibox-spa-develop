jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
window.HTMLElement.prototype.scrollIntoView = jest.fn();
import { reduxRender } from '../../../../utils/test-utils';
import ReferralSchemes from '..';

const component = (params = {}) => {
  const props = {};

  return <ReferralSchemes {...Object.assign({}, props, params)} />;
};

describe('ReferralSchemes', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
