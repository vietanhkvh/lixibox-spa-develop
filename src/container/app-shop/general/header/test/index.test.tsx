import { reduxRender } from 'utils/test-utils';
import NewHeader from '../component';
import { withRouter } from 'react-router-dom';
jest.mock('app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));

const component = (params = {}) => {
  const props = {};

  return withRouter(() => <NewHeader {...Object.assign({}, props, params)} />);
};

describe('Address', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
