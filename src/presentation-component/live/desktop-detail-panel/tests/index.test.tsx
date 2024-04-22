jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import LiveDesktopDetailPanel from '..';

const component = (params = {}) => {
  const props = {
    video: <div>Video node</div>,
    message: 'Test message',
    discountCode: 'discount123',
    product: <div>Test product</div>,
    numberOfItem: 1
  };

  return <LiveDesktopDetailPanel {...Object.assign({}, props, params)} />;
};

describe('LiveDesktopDetailPanel', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
