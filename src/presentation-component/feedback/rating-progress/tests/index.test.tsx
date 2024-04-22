import { reduxRender } from 'utils/test-utils';
import RatingWithProgress from '..';

const component = (params = {}) => {
  const props = {
    rating: 4.5
  };

  return <RatingWithProgress {...Object.assign({}, props, params)} />;
};

describe('RatingWithProgress', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
