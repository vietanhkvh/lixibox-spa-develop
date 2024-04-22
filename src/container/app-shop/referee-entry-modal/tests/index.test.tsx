jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
window.HTMLElement.prototype.scrollIntoView = jest.fn();
import { reduxRender } from '../../../../utils/test-utils';
import RefereeEntryModalContainer from '..';

const component = (params = {}) => {
  const props = {};

  return <RefereeEntryModalContainer {...Object.assign({}, props, params)} />;
};

describe('RefereeEntryModalContainer', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
