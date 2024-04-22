jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import FooterNavigation from '../component';

const component = (params = {}) => {
  const props = {};

  return <FooterNavigation {...Object.assign({}, props, params)} />;
};

describe('FooterNavigation', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
