jest.mock('../../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../../utils/test-utils';
import MobileNavMagazine from '../component';

const showHideMobileMagazineMenu = jest.fn();
const showHideMagazineSearch = jest.fn();

const component = (params = {}) => {
  const props = {
    showHideMobileMagazineMenu,
    showHideMagazineSearch
  };

  return <MobileNavMagazine {...Object.assign({}, props, params)} />;
};

describe('MobileNavMagazine', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
