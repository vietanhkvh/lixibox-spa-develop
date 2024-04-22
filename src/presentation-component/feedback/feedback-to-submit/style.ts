import * as VARIABLE from '../../../style/variable';

export default {
  renderBoxList: {
    item: {
      background: VARIABLE.colorWhite,
      borderRadius: 8,
      overflow: 'hidden',
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      position: 'relative',
      cursor: 'pointer',
      padding: '16px',
      borderBottom: `1px solid ${VARIABLE.colorF5}`
    },

    itemImage: {
      height: 90,
      width: 90,
      minWidth: 90,
      maxWidth: 90,
      objectFit: 'contain',
      marginRight: 16
    },

    itemInfo: {},

    itemName: {
      maxHeight: 40,
      lineHeight: '20px',
      textOverflow: 'ellipsis',
      display: '-webkit-box',
      WebkitBoxOrient: 'vertical',
      WebkitLineClamp: 2,
      fontSize: 14,
      fontWeight: VARIABLE.fontRegular,
      color: VARIABLE.color20,
      overflow: 'hidden',
      marginBottom: 10,

      selected: {
        color: VARIABLE.colorBlack
      }
    },

    itemIcon: {
      position: 'absolute',
      width: 44,
      height: 44,
      top: 0,
      right: 0,
      color: VARIABLE.colorGreen
    },

    itemInnerIcon: {
      width: 16
    },

    itemButton: {
      width: 170,
      margin: 0
    },

    itemButtonIcon: {
      color: VARIABLE.color20
    }
  }
} as any;
