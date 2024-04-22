jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
window.HTMLElement.prototype.scrollIntoView = jest.fn();
import { reduxRender } from '../../../../utils/test-utils';
import RefereeSchemeDetailModal from '..';

const component = (params = {}) => {
  const props = {};

  return <RefereeSchemeDetailModal {...Object.assign({}, props, params)} />;
};

describe('RefereeSchemeDetailModal', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
