jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import { TOP_STAT_NAV } from '../../../../constants/application/community';
import MobileScreenHeaderDropdown from '..';

const component = (params = {}) => {
  const props = {
    isOpen: true,
    list: TOP_STAT_NAV.map((nav, index) => Object.assign({}, nav, { selected: index === 0 })),
    onClick: jest.fn()
  };

  return <MobileScreenHeaderDropdown {...Object.assign({}, props, params)} />;
};

describe('MobileScreenHeaderDropdown', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
