jest.mock('../../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../../utils/test-utils';
import InlineInput from '..';

const component = (params = {}) => {
  const props = {
    value: 5,
    onChange: jest.fn(),
    minQuantity: 1,
    maxQuantity: 100,
    dataTestId: 'example-id'
  };

  return <InlineInput {...Object.assign({}, props, params)} />;
};

describe('InlineInput', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
