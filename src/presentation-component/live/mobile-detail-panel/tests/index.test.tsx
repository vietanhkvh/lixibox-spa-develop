jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
window.HTMLElement.prototype.scrollIntoView = jest.fn();
import { reduxRender } from '../../../../utils/test-utils';
import LiveMobileDetailPanel from '..';

const component = (params = {}) => {
  const props = {
    video: <div>Test video node</div>,
    videoRatioType: '1:1',
    message: 'Test message',
    discountCode: 'ABCDEF',
    product: <div>Test product node</div>,
    highLightInfo: 'Test highlight info',
    isShowMobileTabModal: true,
    onChangeMobileTabModal: jest.fn(),
    numberOfItem: 1
  };

  return <LiveMobileDetailPanel {...Object.assign({}, props, params)} />;
};

describe('LiveMobileDetailPanel', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
