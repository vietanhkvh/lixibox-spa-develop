import * as VARIABLE from '../../../style/variable';
import { combineStyle } from '../../../utils/responsive';

export default {
  position: 'relative',
  overflowX: 'hidden',
  overflowY: 'auto',

  heading: {
    marginBottom: 20
  },

  refreshGroup: {
    position: VARIABLE.position.relative,
    right: -4,
    height: 30,
    lineHeight: '30px',
    color: VARIABLE.colorRed,

    fontSize: 12,
    borderRadius: 5,
    cursor: 'pointer'
  },

  brandList: {
    container: combineStyle({
      MOBILE: [
        {
          paddingBottom: 0
        }
      ] as any,
      DESKTOP: [
        {
          maxHeight: 500,
          overflowX: 'hidden',
          overflowY: 'auto'
        }
      ] as any,
      GENERAL: [
        {
          paddingTop: 0
        }
      ] as any
    })
  },

  brandItem: {
    marginBottom: 10,
    width: '100%',
    cursor: 'pointer',
    paddingRight: 10,

    icon: {
      width: 16,
      minWidth: 16,
      height: 16,
      borderRadius: 3,
      border: `1px solid ${VARIABLE.color97}`,
      marginRight: 10,
      transition: VARIABLE.transitionBackground,
      position: 'relative',
      backgroundColor: VARIABLE.colorWhite,

      selected: {
        backgroundColor: VARIABLE.colorPink,
        border: `1px solid ${VARIABLE.colorPink}`
      },

      firstCheck: {
        position: 'absolute',
        width: 6,
        height: 2,
        backgroundColor: VARIABLE.colorWhite,
        borderRadius: 2,
        transform: 'rotate(45deg)',
        top: 8,
        left: 1
      },

      lastCheck: {
        position: 'absolute',
        width: 10,
        height: 2,
        borderRadius: 2,
        backgroundColor: VARIABLE.colorWhite,
        transform: 'rotate(-45deg)',
        top: 6,
        left: 4
      }
    },

    title: {
      selected: {
        color: VARIABLE.colorRed
      }
    }
  },

  mobileVersion: {
    heading: {
      backgroundColor: VARIABLE.colorE5,
      height: 30,
      maxHeight: 30,
      display: VARIABLE.display.flex,
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingLeft: 10,
      paddingRight: 10,
      top: 0,
      zIndex: VARIABLE.zIndexMax,

      title: {
        fontSize: 12,
        color: VARIABLE.color4D,

        fontWeight: VARIABLE.fontBold
      }
    },

    brandItem: {
      width: '100%',
      cursor: 'pointer',
      paddingTop: 10,
      paddingRight: 10,
      paddingBottom: 10,
      paddingLeft: 10,
      borderBottom: `1px solid ${VARIABLE.colorBlack01}`,
      height: 44,
      minHeight: 44,
      alignItems: 'center',

      icon: {
        width: 16,
        minWidth: 16,
        height: 16,
        borderRadius: 3,
        border: `1px solid ${VARIABLE.color97}`,
        marginRight: 10,
        transition: VARIABLE.transitionBackground,
        position: 'relative',
        backgroundColor: VARIABLE.colorWhite,

        selected: {
          backgroundColor: VARIABLE.colorPink,
          border: `1px solid ${VARIABLE.colorPink}`
        },

        firstCheck: {
          position: 'absolute',
          width: 6,
          height: 2,
          backgroundColor: VARIABLE.colorWhite,
          borderRadius: 2,
          transform: 'rotate(45deg)',
          top: 8,
          left: 1
        },

        lastCheck: {
          position: 'absolute',
          width: 10,
          height: 2,
          borderRadius: 2,
          backgroundColor: VARIABLE.colorWhite,
          transform: 'rotate(-45deg)',
          top: 6,
          left: 4
        }
      },

      title: {
        selected: {
          color: VARIABLE.colorRed
        }
      },

      viewMoreText: {
        fontSize: 12,
        color: VARIABLE.colorBlack04,
        transition: VARIABLE.transitionColor,
        fontWeight: VARIABLE.fontBold,
        width: '100%',
        textAlign: 'center' as const
      },

      count: {
        fontSize: 10,
        paddingLeft: 2,
        color: 'inherit'
      }
    }
  }
} as any;
