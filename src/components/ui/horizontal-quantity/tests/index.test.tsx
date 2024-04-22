jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import HorizontalQuantity from '../component';

const component = (params = {}) => {
  const props = {
    value: 5,
    type: 'small' as const,
    action: jest.fn(),
    color: { color: '#000000' },
    onDecreaseBelowMinimum: jest.fn(),
    disabled: false
  };

  return <HorizontalQuantity {...Object.assign({}, props, params)} />;
};

describe('HorizontalQuantity', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
