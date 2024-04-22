jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import RatingStar from '../component';

const component = (params = {}) => {
  const props = {
    view: true,
    isLargerItem: true,
    value: 5,
    className: 'rating-start',
    onClick: jest.fn(),
    onChange: jest.fn()
  };

  return <RatingStar {...Object.assign({}, props, params)} />;
};

describe('RatingStar', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
