import * as VARIABLE from '../../../../../style/variable';

export default {
  quantity: {
    opacity: 1
  },

  quantityHidden: {
    opacity: 0,
    pointerEvents: 'none'
  },

  trash: {
    width: 40,
    height: 40,
    color: VARIABLE.colorCC
  },

  trashOuter: {
    width: 40,
    height: 40,
    position: 'absolute',
    bottom: 0,
    right: 0,
    cursor: 'pointer',
    transition: VARIABLE.transitionNormal
  },

  icon: {
    width: 12,
    height: 12,
    color: VARIABLE.color8A,
    cursor: 'pointer'
  },

  compactCloseIcon: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 17,
    width: 'calc(12+17*2)',
    height: 'calc(12+17*2)',
    color: VARIABLE.color8A,
    cursor: 'pointer'
  },

  iconInner: {
    width: 12,
    height: 'auto'
  },

  purchaseLaterIcon: {
    color: VARIABLE.color20
  },

  wishlistOuter: {
    fontSize: 10,

    height: 24,
    lineHeight: '24px',
    position: 'absolute',
    bottom: 8,
    right: 40,
    padding: '0 7px',
    textTransform: 'uppercase',
    background: VARIABLE.colorF7,
    border: `1px solid ${VARIABLE.colorF0}`,
    color: VARIABLE.color75,
    borderRadius: 5,
    cursor: 'pointer',
    transition: VARIABLE.transitionNormal
  },

  trashInner: {
    width: 16,
    height: 'auto'
  },

  confirmation: {
    cancelIcon: {
      width: 12,
      height: 12
    }
  },

  iconHeartBuyLater: { width: 16, height: 16, color: VARIABLE.colorWhite },
  iconTrashRemove: { width: 16, height: 16, color: VARIABLE.colorWhite }
} as any;
