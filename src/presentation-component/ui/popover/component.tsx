/* eslint react-hooks/rules-of-hooks: 0 */
// TODO: Refactor component and enable eslint rule

import { RefObject, useEffect, useState, useCallback } from 'react';
import classNames from 'classnames';
import ReactModal from 'react-modal';

import { enableDocumentScroll, disableDocumentScroll } from '../../../utils/scroll';
import { isIOS } from '../../../utils/responsive';
import style from './style.module.scss';
import './popover.css';

const updateCoordinate = (anchor, popoverEl) => {
  const popoverEdgeCompensation = { x: 10, y: 10 };
  const popoverRect = popoverEl.getBoundingClientRect();
  const anchorRect = anchor.getBoundingClientRect();
  const idealPopoverRect = {
    x: anchorRect.left,
    y: anchorRect.bottom,
    left: anchorRect.left,
    top: anchorRect.bottom,
    right: anchorRect.left + popoverRect.width,
    bottom: anchorRect.bottom + popoverRect.height
  };

  let x = idealPopoverRect.x,
    y = idealPopoverRect.y;

  if (idealPopoverRect.right + popoverEdgeCompensation.x > window.innerWidth) {
    x = x - (idealPopoverRect.right + popoverEdgeCompensation.x - window.innerWidth);
  }
  if (idealPopoverRect.bottom + popoverEdgeCompensation.y > window.innerHeight) {
    y = y - (idealPopoverRect.bottom + popoverEdgeCompensation.y - window.innerHeight);
  }

  return { x, y };
};

interface PopoverProps {
  anchorEl: RefObject<any>;
  children: any;
  isOpen: boolean;
  classes?: { container?: string };
  positionAdjustment?: { top: number; left: number };
  onRequestClose?: (param0?: any) => any;
}
const Popover = ({ anchorEl, children, isOpen, classes, positionAdjustment, onRequestClose }: PopoverProps) => {
  const anchor = anchorEl &&
    anchorEl.current && {
      getBoundingClientRect() {
        const rect = anchorEl.current.getBoundingClientRect();
        return {
          x: rect.x + positionAdjustment.left,
          y: rect.y + positionAdjustment.top,
          top: rect.top + positionAdjustment.top,
          left: rect.left + positionAdjustment.left,
          bottom: rect.bottom + positionAdjustment.top,
          right: rect.right + positionAdjustment.left,
          width: rect.width,
          height: rect.height
        };
      }
    };
  if (!anchor) return null;

  const [popoverEl, setPopoverEl] = useState<any>();
  const popoverRef = useCallback(
    (node) => {
      node && setPopoverEl(node);
    },
    [isOpen]
  );
  const anchorRect = anchor.getBoundingClientRect();
  const idealCoord = { x: anchorRect.left, y: anchorRect.top + anchorRect.height };
  const [targetCoord, setTargetCoord] = useState(idealCoord);

  useEffect(() => {
    let scrollLockScheduler: any = null;
    if (popoverEl && isOpen) {
      setTargetCoord(updateCoordinate(anchor, popoverEl));
      if (popoverEl.getBoundingClientRect().bottom - popoverEl.getBoundingClientRect().top > 0) {
        disableDocumentScroll();
        // Prevents an issue on iOS Safari, where the popup opens with a scroll lock, that reduces screen overlay height, therefore
        // rendering the popover outside of the view port. This recalculation mitigates the out of view port rendering issue.
        if (isIOS()) {
          scrollLockScheduler = setTimeout(() => {
            setTargetCoord(updateCoordinate(anchor, popoverEl));
          }, 150);
        }
      } else {
        enableDocumentScroll();
        clearInterval(scrollLockScheduler);
      }
    }

    return () => {
      enableDocumentScroll();
    };
  }, [popoverEl, isOpen]);

  return (
    <ReactModal
      {...{
        isOpen,
        onRequestClose,
        overlayClassName: {
          base: classNames('popoverOverlay'),
          afterOpen: 'popoverOverlayAfterOpen',
          beforeClose: 'popoverOverlayBeforeClose'
        },
        className: {
          base: 'popoverContent',
          afterOpen: 'popoverContentAfterOpen',
          beforeClose: 'popoverContentBeforeClose'
        },
        style: {
          content: {
            left: targetCoord.x,
            top: targetCoord.y
          }
        }
      }}
    >
      <div ref={popoverRef} className={classNames(style.popover, classes && classes.container)}>
        {children}
      </div>
    </ReactModal>
  );
};
Popover.defaultProps = {
  isOpen: false,
  positionAdjustment: { top: 0, left: 0 }
};

export default Popover;
