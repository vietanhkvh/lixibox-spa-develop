jest.mock('../../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import SidePanel from '../index';
import { reduxRender } from '../../../../../utils/test-utils';

const component = (params = {}) => {
  const props = {};
  return <SidePanel {...Object.assign({}, props, params)} />;
};

describe('SidePanel', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
