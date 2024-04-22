jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import Breadcrumb from '../component';

const component = (params = {}) => {
  const props = {};

  return <Breadcrumb {...Object.assign({}, props, params)} />;
};

describe('Breadcrumb', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
