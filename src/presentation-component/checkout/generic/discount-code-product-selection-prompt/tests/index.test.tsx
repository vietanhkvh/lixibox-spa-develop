jest.mock('../../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../../utils/test-utils';
import DiscountCodeProductSelectionPrompt from '..';

const component = (params = {}) => {
  const props = {
    message: 'Test message',
    actionTitle: 'Test title',
    onClick: jest.fn()
  };

  return <DiscountCodeProductSelectionPrompt {...Object.assign({}, props, params)} />;
};

describe('DiscountCodeProductSelectionPrompt', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
