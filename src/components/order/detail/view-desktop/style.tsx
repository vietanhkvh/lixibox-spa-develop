import * as VARIABLE from '../../../../style/variable';
import { combineStyle } from '../../../../utils/responsive';

export const main = {
  container: combineStyle({
    MOBILE: [{}] as any,

    DESKTOP: [
      {
        // boxShadow: VARIABLE.shadowBlur,
        padding: '0 10px 0',
        background: VARIABLE.colorWhite
      }
    ] as any,

    GENERAL: [{}] as any
  })
} as any;

export const top = {
  container: combineStyle({
    MOBILE: [
      {
        padding: '10px 12px 10px',
        boxShadow: VARIABLE.shadowBlur,
        borderRadius: 5,
        background: VARIABLE.colorWhite,
        marginBottom: 10
      }
    ] as any,

    DESKTOP: [
      {
        display: 'flex',
        marginBottom: 20,
        justifyContent: 'space-between'
      }
    ] as any,

    GENERAL: [{}] as any
  }),

  left: combineStyle({
    MOBILE: [{}] as any,

    DESKTOP: [
      {
        padding: '10px 15px 10px',
        boxShadow: VARIABLE.shadowBlur,
        borderRadius: 5,
        flex: 1,
        maxWidth: 'calc(50% - 10px)',
        background: VARIABLE.colorWhite
      }
    ] as any,

    GENERAL: [{}] as any
  }),

  right: combineStyle({
    MOBILE: [{}] as any,

    DESKTOP: [
      {
        padding: '10px 15px 10px',
        boxShadow: VARIABLE.shadowBlur,
        borderRadius: 5,
        background: VARIABLE.colorWhite,
        flex: 1,
        maxWidth: 'calc(50% - 10px)'
      }
    ] as any,

    GENERAL: [{}] as any
  })
} as any;

export const bottom = {
  container: combineStyle({
    MOBILE: [
      {
        padding: '7px 16px 10px',
        borderRadius: 5,
        background: VARIABLE.colorWhite,
        marginBottom: 10
      }
    ] as any,

    DESKTOP: [
      {
        padding: '20px 30px',
        background: VARIABLE.colorF7,
        borderRadius: 8,
        flex: 1,
        marginLeft: 10,
        maxWidth: 'calc(100% - 20px)'
      }
    ] as any,

    GENERAL: [{}] as any
  })
} as any;

export const productList = {
  container: combineStyle({
    MOBILE: [
      {
        boxShadow: VARIABLE.shadowBlur,
        borderRadius: 5,
        background: VARIABLE.colorWhite,
        marginBottom: 10,
        width: '100%',
        overflow: 'hidden'
      }
    ] as any,

    DESKTOP: [
      {
        boxShadow: VARIABLE.shadowBlur,
        borderRadius: 5,
        background: VARIABLE.colorWhite,
        width: '100%',
        overflow: 'hidden',
        marginBottom: 20,
        padding: 15
      }
    ] as any,

    GENERAL: [{}] as any
  })
};

export const productItem = {
  container: combineStyle({
    MOBILE: [
      {
        padding: '5px 0',
        width: '100%',
        borderBottom: `1px solid ${VARIABLE.colorE4}`
      }
    ] as any,

    DESKTOP: [
      {
        padding: '5px 0',
        width: '100%',
        borderBottom: `1px solid ${VARIABLE.colorE4}`
      }
    ] as any,

    GENERAL: [{}] as any
  }),

  cancelledItem: {
    filter: 'opacity(0.5)'
  },

  lastItem: {},

  innerContainer: combineStyle({
    MOBILE: [
      {
        height: '100%',
        alignItems: 'center'
      }
    ] as any,

    DESKTOP: [{}] as any,

    GENERAL: [{ background: VARIABLE.colorWhite, display: 'flex' }] as any
  }),

  imgOuter: combineStyle({
    MOBILE: [
      {
        width: 60,
        height: 60,
        minWidth: 60,
        maxWidth: 60,
        marginRight: 5
      }
    ] as any,

    DESKTOP: [
      {
        marginRight: 10,
        width: 70,
        minWidth: 70,
        maxWidth: 70,
        padding: 5
      }
    ] as any,

    GENERAL: [{}] as any
  }),

  img: { width: '100%', height: '100%', objectFit: 'contain' },

  outerInfo: combineStyle({
    MOBILE: [
      {
        padding: 10
      }
    ] as any,

    DESKTOP: [
      {
        display: 'flex',
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center'
      }
    ] as any,

    GENERAL: [{}] as any
  }),

  outerInfoContainer: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1
  },

  info: {},

  name: combineStyle({
    MOBILE: [
      {
        fontSize: 13,
        fontWeight: VARIABLE.fontLight,
        color: VARIABLE.color20,
        marginBottom: 5
      }
    ] as any,

    DESKTOP: [
      {
        fontSize: 13,
        fontWeight: VARIABLE.fontLight,
        color: VARIABLE.color20
      }
    ] as any,

    GENERAL: [
      {
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: 2,
        overflow: 'hidden',
        lineHeight: '18px'
      }
    ] as any
  }),

  quantity: {
    color: VARIABLE.color20,
    fontWeight: VARIABLE.fontSemiBold,
    marginRight: 5,
    lineHeight: '18px'
  },

  price: combineStyle({
    MOBILE: [{}] as any,

    DESKTOP: [{}] as any,

    GENERAL: [
      {
        fontSize: 14,
        marginLeft: 10,
        lineHeight: '18px',
        fontWeight: VARIABLE.fontSemiBold,
        flexShrink: 0
      }
    ] as any
  }),

  tags: {
    display: 'flex'
  }
} as any;

export const dataGroup = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: 5,
    paddingBottom: 5,

    withBorder: {
      borderTop: `1px solid ${VARIABLE.colorE5}`
    }
  },

  title: {
    fontWeight: VARIABLE.fontLight,
    fontSize: 14,
    color: VARIABLE.color20,
    lineHeight: '18px'
  },

  bigTitle: {
    fontSize: 14,
    fontWeight: VARIABLE.fontSemiBold,
    lineHeight: '30px'
  },

  redTitle: { color: VARIABLE.colorRed },

  value: {
    fontSize: 14,
    fontWeight: VARIABLE.fontSemiBold,
    textAlign: 'right' as const,
    lineHeight: '18px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },

  bigValue: {
    fontSize: 18,
    textAlign: 'right' as const,
    lineHeight: '30px',
    color: VARIABLE.color20
  },

  valueHighlightBlue: {
    color: VARIABLE.colorBlue
  },

  valueHighlightGreen: {
    color: VARIABLE.colorGreenDark
  },

  noteText: {
    fontSize: 13,
    paddingTop: 10,
    textAlign: 'justify' as const,
    lineHeight: '18px'
  },

  redText: {
    marginRoght: 10,
    color: VARIABLE.colorRed
  },

  icon: (colorIcon) => ({
    background: colorIcon,
    width: 15,
    height: 15,
    display: 'inline-block',
    borderRadius: 5,
    marginRight: 5
  })
} as any;

export const momo = {
  container: combineStyle({
    MOBILE: [{ margin: '0 0 10px' }] as any,

    DESKTOP: [
      {
        margin: '0 0 20px'
      }
    ] as any,

    GENERAL: [
      {
        padding: 30,

        borderRadius: 5,
        background: VARIABLE.colorWhite,
        boxShadow: VARIABLE.shadowBlur
      }
    ] as any
  }),

  icon: {
    width: 100,
    height: 100,
    margin: '0 auto 30px',
    marginBottom: 20
  },

  innerIcon: {
    width: 100
  },

  text: {
    width: '100%',
    maxWidth: 300,
    textAlign: 'center' as const,
    fontSize: 14,
    lineHeight: '20px',
    margin: '0 auto 10px',

    bold: {
      color: VARIABLE.colorSocial.momo,

      fontSize: 16
    }
  },

  button: {
    display: 'block',
    maxWidth: 300,
    margin: '0 auto'
  }
} as any;

export const support = {
  container: combineStyle({
    MOBILE: [{ padding: '16px 16px 0' }] as any,

    DESKTOP: [{ padding: '26px 6px 0', display: 'flex', justifyContent: 'space-between' }] as any,

    GENERAL: [{}] as any
  }),

  link: combineStyle({
    MOBILE: [{ margin: '0 0 16px' }] as any,

    DESKTOP: [{ margin: '0 10px 0' }] as any,

    GENERAL: [{}] as any
  })
};
