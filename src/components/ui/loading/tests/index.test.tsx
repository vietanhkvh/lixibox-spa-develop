jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import Loading from '../component';

const component = (params = {}) => {
  const props = {};

  return <Loading {...Object.assign({}, props, params)} />;
};

describe('Loading', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
