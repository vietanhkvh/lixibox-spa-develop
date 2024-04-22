jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import DesktopNavigation from '../component';
import { INITIAL_STATE_MENU } from '../../../../flows/menu/reducer';
import { INITIAL_STATE_BANNER } from '../../../../flows/banner/reducer';
import { INITIAL_STATE_BRAND } from '../../../../flows/brand/reducer';
import { INITIAL_STATE_MAGAZINE } from '../../../../flows/magazine/reducer';
import { INITIAL_STATE_ACTIVITY_FEED } from '../../../../flows/activity-feed/reducer';

const menuStore = INITIAL_STATE_MENU;
const themeListStore = INITIAL_STATE_BANNER.theme.list;
const bannerStore = INITIAL_STATE_BANNER;
const brandStore = INITIAL_STATE_BRAND;
const magazineStore = INITIAL_STATE_MAGAZINE;
const activityFeedStore = INITIAL_STATE_ACTIVITY_FEED;
const openModal = jest.fn();
const fetchMagazineListAction = jest.fn();
const fetchBrandListAction = jest.fn();
const fetchListMenuAction = jest.fn();
const fetchThemeAction = jest.fn();
const fecthActivityFeedListNavigationAction = jest.fn();
const fetchMagazineDashboardAction = jest.fn();

const component = (params = {}) => {
  const props = {
    menuStore,
    themeListStore,
    bannerStore,
    brandStore,
    magazineStore,
    activityFeedStore,
    openModal,
    fetchMagazineListAction,
    fetchBrandListAction,
    fetchListMenuAction,
    fetchThemeAction,
    fecthActivityFeedListNavigationAction,
    fetchMagazineDashboardAction
  };

  return <DesktopNavigation {...Object.assign({}, props, params)} />;
};

describe('DesktopNavigation', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
