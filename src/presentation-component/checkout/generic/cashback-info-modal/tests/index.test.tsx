import Modal from 'react-modal';
import { withRouter } from 'react-router-dom';
import { reduxRender } from 'utils/test-utils';
import CashbackInfoModal from '..';

Modal.setAppElement(document.body.appendChild(document.createElement('div')));

const component = (params = {}) => {
  const props = {
    isOpen: true,
    totalBalance: 1000,
    cashbackRedeemPercentage: 10,
    onRequestClose: jest.fn()
  };

  return withRouter((routerProps) => <CashbackInfoModal {...Object.assign({}, props, routerProps, params)} />);
};

describe('CashbackInfoModal', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
