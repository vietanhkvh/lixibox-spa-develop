import { withRouter } from 'react-router-dom';
jest.mock('../../../../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../../../../utils/test-utils';
import RecommendationSlider from '../container';

const component = (params = {}) => {
  const props = {} as any;

  return withRouter((routerProps) => <RecommendationSlider {...Object.assign({}, props, routerProps, params)} />);
};

describe('RecommendationSlider', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
