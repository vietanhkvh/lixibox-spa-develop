import { INITIAL_STATE_SHARED_MODAL } from 'flows/shared-modal/reducer';
jest.mock('../../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../../utils/test-utils';
import Confirmation from '../component';

const component = (params = {}) => {
  const props = {
    sharedModalStore: INITIAL_STATE_SHARED_MODAL,
    updateSharedModalAction: jest.fn()
  };

  return <Confirmation {...Object.assign({}, props, params)} />;
};

describe('Confirmation', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
