jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import SeparateLine from '..';

const component = (params = {}) => {
  const props = {};

  return <SeparateLine {...Object.assign({}, props, params)} />;
};

describe('SeparateLine', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
