import { reduxRender } from '../../../../utils/test-utils';
import NewWrap from '../component';
jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));

const component = (params = {}) => {
  const props = {};
  return <NewWrap {...Object.assign({}, props, params)} />;
};
describe('NewWrap', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
