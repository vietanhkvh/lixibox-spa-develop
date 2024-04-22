jest.mock('../../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../../utils/test-utils';
import InlineConfirmation from '..';

const component = (params = {}) => {
  const props = {
    visible: true,
    confirmationAction: { title: 'Confirmation Title', icon: 'lixibox', onClick: jest.fn() },
    cancelAction: { title: 'Cancellation Title', icon: 'lixibox', onClick: jest.fn() },
    promptMessage: 'Test message'
  };

  return <InlineConfirmation {...Object.assign({}, props, params)} />;
};

describe('InlineConfirmation', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
