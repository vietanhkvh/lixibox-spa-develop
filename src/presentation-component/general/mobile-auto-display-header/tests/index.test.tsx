jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import MobileAutoDisplayHeader from '..';

const component = (params = {}) => {
  const props = {
    children: <div>Test node</div>,
    row: 1,
    fixHeight: 0,
    onSetDisplay: jest.fn(),
    id: ''
  };

  return <MobileAutoDisplayHeader {...Object.assign({}, props, params)} />;
};

describe('MobileAutoDisplayHeader', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
