jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import StickyActionButton from '../component';

const component = (params = {}) => {
  const props = {
    info: { title: 'Info Title', content: 'Info Content' },
    action: { text: 'Submit', icon: 'check' },
    nonsticky: false,
    disabled: false,
    loading: false,
    className: 'sticky-action-button',
    buttonClass: 'button-class',
    onClick: jest.fn()
  };

  return <StickyActionButton {...Object.assign({}, props, params)} />;
};

describe('StickyActionButton', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
