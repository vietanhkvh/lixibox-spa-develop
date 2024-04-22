import Modal from 'react-modal';
jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import GeneralModal from '../component';

Modal.setAppElement(document.body.appendChild(document.createElement('div')));

const component = (params = {}) => {
  const props = {
    isShowHeading: true,
    title: 'Test title',
    leftIcon: 'lixibox',
    rightIcon: 'close',
    leftTitle: 'ABC',
    rightTitle: 'DEF',
    onLeftActionClick: jest.fn(),
    onRightActionClick: jest.fn(),
    shouldCloseOnLeftActionClick: true,
    shouldCloseOnRightActionClick: true,
    children: <div>Child node</div>,
    isOpen: true,
    shouldCloseOnOverlayClick: true,
    fullHeight: true,
    closeTimeoutMS: 300,
    onRequestClose: jest.fn(),
    appStore: { mobileappWebviewStatus: false },
    isDisableAnimation: true
  };

  return <GeneralModal {...Object.assign({}, props, params)} />;
};
const resizeWindow = (width, height) => {
  global.innerWidth = width;
  global.innerHeight = height;
  expect(window.innerWidth).toBe(width);
  expect(window.innerHeight).toBe(height);
};
describe('GeneralModal', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });

  test(`render at mobile device`, () => {
    resizeWindow(390, 844);
    reduxRender(component(), { initialState: {} });
    const modalMobile = document.getElementsByClassName('modal-mobile')[0];
    expect(modalMobile).toBeInTheDocument();
  });
});
