import { render, screen } from '@testing-library/react';
import { useState } from 'react';
import Modal from 'react-modal';
import { reduxRender } from '../../../../utils/test-utils';
import Popover from '../component';
import userEvent from '@testing-library/user-event';
jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
const handleCloseJest = jest.fn();
const handleOpenJest = jest.fn();
Modal.setAppElement(document.body.appendChild(document.createElement('div')));
const anchorEl = { current: document.body.appendChild(document.createElement('div')) };

const component = (params: any = {}) => {
  const props = {
    anchorEl,
    children: params?.children || <div>Content</div>,
    isOpen: params?.isOpen || true,
    onRequestClose: params?.handleClose || jest.fn()
  };

  return <Popover {...Object.assign({}, props, params)} />;
};

describe('Popover', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
  test(`renders with not isOpen: false`, () => {
    render(component({ isOpen: false }));
    const e = document.getElementsByClassName('ReactModalPortal')[0];
    expect(e).not.toContainHTML('<div>Content</div>');
  });

  test(`renders with not isOpen: true`, () => {
    render(component({ isOpen: true }));
    const e = document.getElementsByClassName('popover')[0];
    expect(e).toBeVisible();
  });

  const Wrapper = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const handleOpen = () => {
      setIsOpen(true);
      handleOpenJest();
    };
    const handleClose = () => {
      setIsOpen(false);
      handleCloseJest();
    };
    const children = (
      <div>
        <button onClick={handleClose}>Close modal</button>
        <span>Content</span>
      </div>
    );
    return (
      <>
        <button onClick={handleOpen}>Open modal</button>
        {component({
          children: children,
          isOpen: isOpen,
          handleClose: handleClose
        })}
      </>
    );
  };
  test(`renders with close function`, async () => {
    render(<Wrapper />);
    await userEvent.click(screen.getByText('Open modal'));
    let e = document.getElementsByClassName('popover')[0];
    expect(handleOpenJest).toBeCalledTimes(1);
    expect(e).toBeVisible();

    e = document.getElementsByClassName('ReactModalPortal')[0];
    await userEvent.click(screen.getByText('Close modal'));
    expect(handleCloseJest).toBeCalledTimes(1);
    expect(e).not.toContainHTML('<span>Content</span>');
  });
});
