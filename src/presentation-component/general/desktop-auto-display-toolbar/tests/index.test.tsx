jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import DesktopAutoDisplayToolbar from '..';

const component = (params = {}) => {
  const props = {
    children: <div>Test element</div>,
    fixHeight: 100
  };

  return <DesktopAutoDisplayToolbar {...Object.assign({}, props, params)} />;
};

describe('DesktopAutoDisplayToolbar', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
