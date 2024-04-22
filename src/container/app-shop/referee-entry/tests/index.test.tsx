jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
window.HTMLElement.prototype.scrollIntoView = jest.fn();
import { reduxRender } from '../../../../utils/test-utils';
import RefereeEntryContainer from '..';

const component = (params = {}) => {
  const props = {
    openSharedModalAction: jest.fn()
  };

  return <RefereeEntryContainer {...Object.assign({}, props, params)} />;
};

describe('RefereeEntryContainer', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
