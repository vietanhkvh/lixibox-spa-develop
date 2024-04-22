import { combineStyle } from '../utils/responsive';

import * as VARIABLE from './variable';

/* BUTTON */
export const buttonIcon = {
  width: '12px',
  height: 'inherit',
  lineHeight: 'inherit',
  textAlign: 'center' as const,
  color: 'inherit',
  display: 'inline-block',
  verticalAlign: 'middle',
  whiteSpace: 'nowrap',
  marginLeft: '5px',
  fontSize: '11px'
};

const buttonBase = {
  display: 'inline-block',
  textTransform: 'capitalize',
  height: 36,
  lineHeight: '36px',
  paddingTop: 0,
  paddingRight: 15,
  paddingBottom: 0,
  paddingLeft: 15,
  fontSize: 15,

  transition: VARIABLE.transitionNormal,
  whiteSpace: 'nowrap',
  borderRadius: 3,
  cursor: 'pointer'
};

export const button = Object.assign({}, buttonBase, {
  backgroundColor: VARIABLE.colorBlack,
  color: VARIABLE.colorWhite
});

/**  BLOCK */
export const block = {
  display: 'block',

  heading: {
    alignLeft: {
      textAlign: 'left' as const
    },

    headingWithoutViewMore: {
      height: 50
    },

    multiLine: {
      height: 'auto',
      minHeight: 50
    },

    line: {
      height: 1,
      width: '100%',
      backgroundColor: VARIABLE.color75,
      position: VARIABLE.position.absolute,
      top: 25
    } as any,

    lineSmall: {
      width: 1,
      height: 30,
      transform: 'rotate(45deg)',
      position: VARIABLE.position.absolute,
      background: VARIABLE.colorPink04,
      top: 4,
      left: 17
    },

    lineFirst: {
      width: 1,
      height: 70,
      transform: 'rotate(45deg)',
      position: VARIABLE.position.absolute,
      background: VARIABLE.colorPink03,
      top: -12,
      right: 7
    },

    lineLast: {
      width: 1,
      height: 70,
      transform: 'rotate(45deg)',
      position: VARIABLE.position.absolute,
      background: VARIABLE.colorPink03,
      top: -3,
      right: 20
    },

    title: {
      height: 40,
      display: VARIABLE.display.block,
      textAlign: 'left' as const,
      position: 'relative',
      zIndex: VARIABLE.zIndex2,
      paddingTop: 0,
      paddingBottom: 0,
      paddingRight: 10,
      paddingLeft: 10,

      multiLine: {
        maxWidth: '100%',
        paddingTop: 10,
        paddingBottom: 10,
        height: 'auto',
        minHeight: 50
      },

      text: {
        letterSpacing: 1,
        display: VARIABLE.display.inlineBlock,
        maxWidth: '100%',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        color: VARIABLE.colorBlack,
        fontSize: 18,
        fontWeight: VARIABLE.fontSemiBold,
        lineHeight: '40px',
        height: 40,

        multiLine: {
          whiteSpace: 'wrap',
          overflow: 'visible',
          textOverflow: 'unset',
          lineHeight: '30px',
          height: 'auto'
        }
      }
    } as any,

    description: combineStyle({
      MOBILE: [{ textAlign: 'left' as const }],
      DESKTOP: [{ textAlign: 'center' as const }],
      GENERAL: [
        {
          lineHeight: '20px',
          display: 'inline-block',
          fontSize: 14,
          position: 'relative',
          iIndex: VARIABLE.zIndex2,
          backgroundColor: VARIABLE.colorWhite,
          color: VARIABLE.colorBlack08,

          paddingTop: 0,
          paddingRight: 32,
          paddingBottom: 0,
          paddingLeft: 12,
          width: '100%'
        }
      ]
    }),

    closeButton: {
      height: 50,
      width: 50,
      color: VARIABLE.color4D,
      position: VARIABLE.position.absolute,
      background: VARIABLE.colorWhite,
      top: 0,
      right: 0,
      cursor: 'pointer',

      inner: {
        width: 20
      }
    },

    viewMore: {
      whiteSpace: 'nowrap',
      fontSize: 13,
      height: 16,
      lineHeight: '16px',
      background: VARIABLE.colorWhite,

      color: VARIABLE.color4D,
      display: 'block',
      cursor: 'pointer',
      paddingTop: 0,
      paddingRight: 10,
      paddingBottom: 0,
      paddingLeft: 5,
      position: VARIABLE.position.absolute,
      transition: VARIABLE.transitionColor,
      right: 0,
      bottom: 0,

      icon: {
        width: 10,
        height: 10,
        color: VARIABLE.colorBlack,
        display: 'inline-block',
        marginLeft: 5,
        paddingRight: 5
      }
    }
  },

  content: {
    paddingTop: 20,
    paddingRight: 0,
    paddingBottom: 10,
    paddingLeft: 0,
    position: VARIABLE.position.relative
  }
};

/** DOT DOT DOT SLIDE PAGINATION */
export const slidePagination = {
  position: VARIABLE.position.absolute,
  zIndex: VARIABLE.zIndex9,
  left: 0,
  bottom: 20,
  width: '100%',

  item: {
    display: 'block',
    minWidth: 12,
    width: 12,
    height: 12,
    borderRadius: '50%',
    marginTop: 0,
    marginRight: 5,
    marginBottom: 0,
    marginLeft: 5,
    background: VARIABLE.colorBlack,
    cursor: 'pointer'
  },

  itemActive: {
    background: VARIABLE.colorWhite,
    boxShadow: `0 0 0 1px ${VARIABLE.colorBlack} inset`
  }
} as any;

/* SLIDE NAVIGATION BUTTON */

export const slideNavigation = {
  position: VARIABLE.position.absolute,
  lineHeight: '100%',
  background: VARIABLE.colorBlack,
  transition: VARIABLE.transitionNormal,
  zIndex: VARIABLE.zIndex9,
  cursor: 'pointer',
  top: '50%',

  black: {
    background: VARIABLE.colorWhite05
  },

  icon: {
    color: VARIABLE.colorWhite,
    width: 14
  },

  left: {
    left: 0
  },

  right: {
    right: 0
  }
};

/** ASIDE BLOCK (FILTER CATEOGRY) */
export const asideBlock = {
  display: block,

  heading: {
    position: 'relative',
    height: 40,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 5,

    text: {
      width: 'auto',
      display: 'inline-block',
      fontSize: 18,
      fontWeight: VARIABLE.fontSemiBold,
      lineHeight: '40px',

      color: VARIABLE.colorBlack,
      whiteSpace: 'nowrap'
    },

    close: {
      height: 40,
      width: 40,
      minWidth: 40,
      textAlign: 'center' as const,
      lineHeight: '40px',
      marginBottom: 4,
      borderRadius: 3,
      cursor: 'pointer'
    }
  },

  content: {
    paddingTop: 5,
    paddingRight: 0,
    paddingBottom: 5,
    paddingLeft: 0
  }
} as any;

/** AUTH SIGN IN / UP COMPONENT */
export const authBlock = {
  relatedLink: {
    container: combineStyle({
      MOBILE: [{ textAlign: 'right' as const }],
      DESKTOP: [{ textAlign: 'center' as const }],

      GENERAL: [
        {
          width: '100%'
        }
      ]
    }),

    text: combineStyle({
      MOBILE: [{ color: VARIABLE.colorWhite, fontSize: 13, fontWeight: VARIABLE.fontSemiBold }],
      DESKTOP: [{ color: VARIABLE.color20, fontSize: 14, fontWeight: VARIABLE.fontRegular }],

      GENERAL: [
        {
          lineHeight: '40px'
        }
      ]
    }),

    link: combineStyle({
      MOBILE: [{ color: VARIABLE.colorWhite, fontSize: 13, fontWeight: VARIABLE.fontSemiBold }],
      DESKTOP: [{ color: VARIABLE.color20, fontSize: 14, fontWeight: VARIABLE.fontRegular }],

      GENERAL: [
        {
          fontWeight: VARIABLE.fontSemiBold,
          lineHeight: '40px',
          cursor: 'pointer',
          marginLeft: 5,
          marginRight: 5,
          textDecoration: 'underline'
        }
      ]
    })
  },

  errorMessage: {
    color: VARIABLE.colorRed,
    fontSize: 13,
    lineHeight: '18px',
    paddingTop: 5,
    paddingBottom: 5,
    textAlign: 'center' as const,
    overflow: VARIABLE.visible.hidden,
    transition: VARIABLE.transitionNormal
  },

  successMessage: {
    color: VARIABLE.colorGreen,
    fontSize: 13,
    lineHeight: '18px',
    paddingTop: 5,
    paddingBottom: 5,
    textAlign: 'center' as const,
    overflow: VARIABLE.visible.hidden,
    transition: VARIABLE.transitionNormal
  }
} as any;

export const emtyText = {
  display: VARIABLE.display.block,
  textAlign: 'center' as const,
  lineHeight: '30px',
  paddingTop: 40,
  paddingBottom: 40,
  fontSize: 30,
  color: VARIABLE.color4D
};

/** Tab Component */
export const tabs = {
  height: '100%',

  heading: {
    width: '100%',
    overflow: 'hidden',
    position: VARIABLE.position.relative,
    zIndex: VARIABLE.zIndex9,

    iconContainer: {
      background: VARIABLE.colorF0,
      display: VARIABLE.display.flex,
      position: VARIABLE.position.relative,
      boxShadow: `0px -1px 1px ${VARIABLE.colorD2} inset`
    },

    container: {
      whiteSpace: 'nowrap',
      background: VARIABLE.colorWhite
    },

    itemIcon: {
      flex: 1,
      position: VARIABLE.position.relative,
      zIndex: VARIABLE.zIndex5,

      icon: {
        height: 40,
        color: VARIABLE.colorBlack06,

        active: {
          color: VARIABLE.colorPink
        },

        inner: {
          width: 18,
          height: 18
        }
      }
    },

    item: {
      height: 50,
      display: VARIABLE.display.inlineBlock,
      lineHeight: '50px',
      fontSize: 15,
      color: VARIABLE.color4D,
      paddingLeft: 20,
      paddingRight: 20
    },

    statusBar: {
      background: VARIABLE.colorWhite,
      position: VARIABLE.position.absolute,
      zIndex: VARIABLE.zIndex1,
      bottom: 0,
      left: 0,
      width: '25%',
      height: 40,
      transition: VARIABLE.transitionNormal,
      boxShadow: VARIABLE.shadowReverse2
    }
  },
  content: {
    height: '100%',
    width: '100%',
    overflow: 'hidden',
    position: VARIABLE.position.relative,
    zIndex: VARIABLE.zIndex1,

    container: {
      height: '100%',
      transition: VARIABLE.transitionNormal,
      display: VARIABLE.display.flex
    },

    tab: {
      height: '100%',
      overflow: 'auto',
      flex: 1
    }
  }
} as any;
