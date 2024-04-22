jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import LiveList from '..';

const component = (params = {}) => {
  const props = {
    children: [<div>Test node 1</div>, <div>Test node 1</div>]
  };

  return <LiveList {...Object.assign({}, props, params)} />;
};

describe('LiveList', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
