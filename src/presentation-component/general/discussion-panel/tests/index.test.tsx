jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import DesktopFilterToolbar from '..';

jest.mock('../../../../utils/scroll', () => ({
  ...jest.requireActual('../../../../utils/scroll'),
  scrollElement: jest.fn()
}));

const component = (params = {}) => {
  const props = {
    id: 'abc',
    children: <div>Test node</div>,
    receiveNewComment: 1,
    replyPanel: <div>Reply panel</div>
  };

  return <DesktopFilterToolbar {...Object.assign({}, props, params)} />;
};

describe('DesktopFilterToolbar', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
