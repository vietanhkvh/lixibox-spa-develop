jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import Quantity from '../component';

const component = (params = {}) => {
  const props = {
    value: 5,
    type: 'small' as const,
    action: jest.fn(),
    color: { color: '#000000' },
    openAlertAction: jest.fn(),
    disabled: false
  };

  return <Quantity {...Object.assign({}, props, params)} />;
};

describe('Quantity', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
