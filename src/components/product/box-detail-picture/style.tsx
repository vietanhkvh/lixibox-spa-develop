import * as VARIABLE from '../../../style/variable';
import { combineStyle } from '../../../utils/responsive';

export default {
  container: combineStyle({
    MOBILE: [
      {
        background: VARIABLE.colorBlack
      }
    ] as any,

    DESKTOP: [{}] as any,

    GENERAL: [
      {
        display: 'block',
        width: '100%',
        height: '100%',
        paddingTop: 0,
        paddingRight: 0,
        paddingBottom: 0,
        paddingLeft: 0,
        overflow: 'hidden'
      }
    ] as any
  }),

  mainImageWrap: combineStyle({
    MOBILE: [{ padding: '10px 0' }] as any,

    DESKTOP: [{ padding: '10px 10px 0' }] as any,

    GENERAL: [
      {
        height: 'calc(100% - 90px)',
        display: 'flex',
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center'
      }
    ] as any
  }),

  mainImage: {
    maxHeight: 'calc(100% - 50px)',
    maxWidth: '100%',
    display: 'block',
    width: 'auto',
    height: 'auto',
    margin: '0 auto'
  },

  list: combineStyle({
    MOBILE: [
      {
        height: '100%',
        scrollSnapType: 'x mandatory',
        overflowX: 'scroll',
        overflowY: 'hidden'
      }
    ] as any,

    DESKTOP: [
      {
        height: 90,
        paddingLeft: 50,
        paddingRight: 50,
        overflowX: 'auto',
        overflowY: 'hidden'
      }
    ] as any,

    GENERAL: [
      {
        display: 'block',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center' as const,
        whiteSpace: 'nowrap'
      }
    ] as any
  }),

  item: {
    mobileDescription: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      background: VARIABLE.colorWhite,
      height: 50,
      lineHeight: '50px'
    },

    container: combineStyle({
      MOBILE: [
        {
          display: 'inline-block',
          width: '100%',
          height: '100%',
          scrollSnapAlign: 'start',
          background: VARIABLE.colorBlack,
          position: 'relative',
          verticalAlign: 'top'
        }
      ] as any,

      DESKTOP: [
        {
          overflow: 'hidden',
          display: 'inline-block',
          height: 60,
          width: 'auto',
          borderRadius: 10,
          margin: 10,
          cursor: 'pointer',
          background: VARIABLE.colorWhite,
          border: `2px solid ${VARIABLE.colorWhite}`
        }
      ] as any,

      GENERAL: [{}] as any
    }),

    selected: { border: `2px solid ${VARIABLE.colorRed}` },

    img: combineStyle({
      MOBILE: [
        {
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          position: 'absolute',
          top: 0,
          left: 0
        }
      ] as any,

      DESKTOP: [
        {
          height: 60,
          width: 60,
          objectFit: 'contain',
          display: 'block'
        }
      ] as any,

      GENERAL: [{}] as any
    }),

    video: combineStyle({
      MOBILE: [
        {
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0
        }
      ] as any,

      DESKTOP: [
        {
          height: 60,
          width: 'auto',
          display: 'block'
        }
      ] as any,

      GENERAL: [{}] as any
    }),

    innerIcon: {
      width: 20
    }
  },

  close: {
    icon: combineStyle({
      MOBILE: [
        {
          top: 10,
          right: 10
        }
      ] as any,

      DESKTOP: [{ top: 30, right: 30 }] as any,

      GENERAL: [
        {
          width: 40,
          height: 40,
          cursor: 'pointer',
          color: VARIABLE.colorWhite,
          position: 'absolute',
          zIndex: VARIABLE.zIndex9
        }
      ] as any
    }),

    innerIcon: {
      width: 20
    }
  },

  description: {
    position: 'absolute',
    bottom: 5,
    display: 'flex',

    text: {
      color: VARIABLE.colorWhite,
      height: 24,
      lineHeight: '24px',
      padding: '0 15px',
      borderRadius: 14,
      cursor: 'pointer'
    },

    active: {
      background: VARIABLE.colorE5,
      color: VARIABLE.colorBlack,
      height: 24,
      lineHeight: '24px',
      padding: '0 15px',
      borderRadius: 14,
      pointerEvents: 'none'
    }
  },

  currIndex: {
    position: 'absolute',
    bottom: 10,
    background: VARIABLE.colorWhite,
    width: 80,
    textAlign: 'center' as const,
    border: `1px solid ${VARIABLE.colorE5}`,
    left: '50%',
    marginLeft: -40,
    height: 30,
    lineHeight: '30px',
    borderRadius: 15
  },

  statusNumber: {
    height: 20,
    lineHeight: '20px',
    background: VARIABLE.colorBlack07,
    borderRadius: 4,
    fontSize: 12,
    color: VARIABLE.colorWhite,
    fontWeight: VARIABLE.fontLight,
    position: 'absolute',
    bottom: 26,
    left: '50%',
    transform: 'translateX(-50%)',
    padding: '0 6px'
  }
} as any;
