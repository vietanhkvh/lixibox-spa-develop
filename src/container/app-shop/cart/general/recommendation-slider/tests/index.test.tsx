import { withRouter } from 'react-router-dom';
jest.mock('../../../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../../../utils/test-utils';
import AddonSlider from '../container';

const component = (params = {}) => {
  const props = {} as any;

  return withRouter((routerProps) => <AddonSlider {...Object.assign({}, props, routerProps, params)} />);
};

describe('AddonSlider', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
