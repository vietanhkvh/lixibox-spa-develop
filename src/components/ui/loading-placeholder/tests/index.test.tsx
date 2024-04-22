jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import LoadingPlaceholder from '../component';

const component = (params = {}) => {
  const props = {};

  return <LoadingPlaceholder {...Object.assign({}, props, params)} />;
};

describe('LoadingPlaceholder', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
