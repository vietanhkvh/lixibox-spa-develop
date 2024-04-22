jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import StarRating from '../component';

const component = (params = {}) => {
  const props = {
    rating: 4 as const
  };

  return <StarRating {...Object.assign({}, props, params)} />;
};

describe('StarRating', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
