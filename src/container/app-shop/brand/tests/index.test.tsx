import { withRouter } from 'react-router-dom';
import { reduxRender } from '../../../../utils/test-utils';
import { INITIAL_STATE_BRAND } from '../../../../flows/brand/reducer';
import { INITIAL_STATE_TRACKING } from '../../../../flows/tracking/reducer';
import Brand from '../container';
jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));

const component = (params = {}) => {
  const props = {
    type: 'type', // Unused
    column: 1, // Unused
    perPage: 10,

    brandStore: INITIAL_STATE_BRAND,
    trackingStore: INITIAL_STATE_TRACKING,
    updateMetaInfoAction: jest.fn(),
    trackingViewGroupAction: jest.fn(),
    saveProductTrackingAction: jest.fn(),
    fetchProductByBrandIdAction: jest.fn(),
    clearDataBrandsByIdAction: jest.fn(),

    likedIdList: [], // Unused
    openModalAction: jest.fn(),
    selectGiftAction: jest.fn(),
    likeProductAction: jest.fn(),
    unLikeProductAction: jest.fn(),
    addItemToCartAction: jest.fn()
  };

  return withRouter((routerProps) => <Brand {...Object.assign({}, props, routerProps, params)} />);
};

describe('Brand', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
