import * as VARIABLE from '../../../style/variable';

export default {
  sizeList: {
    normal: {
      height: 44,
      lineHeight: '44px',
      paddingTop: 0,
      paddingRight: 20,
      paddingBottom: 0,
      paddingLeft: 20
    },
    small: {
      height: 30,
      lineHeight: '30px',
      paddingTop: 0,
      paddingRight: 14,
      paddingBottom: 0,
      paddingLeft: 14
    }
  },

  colorList: {
    pink: {
      backgroundColor: VARIABLE.colorPink,
      color: VARIABLE.colorWhite
    },

    red: {
      backgroundColor: VARIABLE.colorRed,
      color: VARIABLE.colorWhite
    },

    green: {
      backgroundColor: VARIABLE.colorGreen,
      color: VARIABLE.colorWhite
    },

    yellow: {
      backgroundColor: VARIABLE.colorYellow,
      color: VARIABLE.colorWhite
    },

    white: {
      backgroundColor: VARIABLE.colorWhite,
      color: VARIABLE.color2E
    },

    black: {
      backgroundColor: VARIABLE.colorBlack,
      color: VARIABLE.colorWhite
    },

    grey: {
      backgroundColor: VARIABLE.color3E,
      color: VARIABLE.colorWhite
    },

    lightGrey: {
      backgroundColor: VARIABLE.colorF5,
      color: VARIABLE.colorBlack
    },

    borderWhite: {
      backgroundColor: VARIABLE.colorWhite,
      border: `1px solid ${VARIABLE.color97}`,
      color: VARIABLE.color2E
    },

    borderBlack: {
      backgroundColor: VARIABLE.colorWhite,
      border: `1px solid ${VARIABLE.color20}`,
      color: VARIABLE.colorBlack
    },

    borderGrey: {
      backgroundColor: VARIABLE.colorWhite,
      border: `1px solid ${VARIABLE.colorCC}`,
      color: VARIABLE.color2E
    },

    borderLess: {
      backgroundColor: VARIABLE.colorWhite,
      border: `1px solid ${VARIABLE.colorF0}`,
      color: VARIABLE.color2E
    },

    borderPink: {
      backgroundColor: VARIABLE.colorWhite,
      border: `1px solid ${VARIABLE.colorPink}`,
      color: VARIABLE.colorPink
    },

    borderRed: {
      backgroundColor: VARIABLE.colorWhite,
      border: `1px solid ${VARIABLE.colorRed}`,
      color: VARIABLE.colorRed
    },

    borderGreen: {
      backgroundColor: VARIABLE.colorWhite,
      border: `1px solid ${VARIABLE.colorGreen}`,
      color: VARIABLE.colorGreen
    },

    facebook: {
      backgroundColor: VARIABLE.colorSocial.facebook,
      color: VARIABLE.colorWhite
    },

    momo: {
      backgroundColor: VARIABLE.colorSocial.momo,
      color: VARIABLE.colorWhite
    },

    borderMomo: {
      border: `1px solid ${VARIABLE.colorSocial.momo}`,
      backgroundColor: VARIABLE.colorWhite,
      color: VARIABLE.colorSocial.momo
    },

    borderOnepay: {
      border: `1px solid ${VARIABLE.colorSocial.onepay}`,
      backgroundColor: VARIABLE.colorWhite,
      color: VARIABLE.colorSocial.onepay
    }
  },

  isLoading: {
    opacity: 0.9,
    pointerEvents: 'none'
  },

  isDisabled: {
    filter: 'grayscale(1)',
    pointerEvents: 'none'
  },

  container: {
    width: '100%',
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,

    transition: VARIABLE.transitionNormal,
    whiteSpace: 'nowrap',
    cursor: 'pointer',
    position: 'relative',
    zIndex: VARIABLE.zIndex1,
    marginTop: 10,
    marginBottom: 20
  },

  icon: {
    width: 17,
    minWidth: 17,
    height: 17,
    color: VARIABLE.colorBlack,
    marginRight: 10,
    marginLeft: 10
  },

  smallIcon: {
    width: 13,
    minWidth: 13,
    height: 13,
    color: VARIABLE.colorBlack,
    marginRight: 10,
    marginLeft: 10
  },

  align: {
    left: { textAlign: 'left' as const },
    center: { textAlign: 'center' as const },
    right: { textAlign: 'right' as const }
  },

  title: {
    fontSize: 14,
    fontWeight: VARIABLE.fontSemiBold,

    bold: {
      fontWeight: VARIABLE.fontBold
    },

    small: {
      fontSize: 13,
      fontWeight: VARIABLE.fontRegular
    }
  },

  iconLoading: {
    transform: 'scale(.55)',
    height: 50,
    width: 50,
    minWidth: 50,
    opacity: 0.75
  }
} as any;
