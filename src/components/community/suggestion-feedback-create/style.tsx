import * as VARIABLE from '../../../style/variable';
import { combineStyle } from '../../../utils/responsive';

export default {
  container: {
    overflow: 'hidden',
    position: 'relative'
  },

  modalContainer: combineStyle({
    MOBILE: [
      {
        borderRadius: '15px 15px 0 0'
      }
    ] as any,

    DESKTOP: [
      {
        display: 'flex',
        borderRadius: 0
      }
    ] as any,

    GENERAL: [
      {
        boxShadow: 'none'
      }
    ] as any
  }),

  cover: {
    width: '100%',
    height: 'auto'
  },

  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    filter: 'blur(10px)'
  },

  list: {
    padding: '10px 0 0 0',
    position: 'relative'
  },

  modalList: combineStyle({
    MOBILE: [{}] as any,

    DESKTOP: [
      {
        padding: '30px 20px 20px 10px',
        minHeight: 260
      }
    ] as any,

    GENERAL: [{}] as any
  }),

  item: {
    width: '100%',
    position: 'relative',
    display: 'flex',
    background: VARIABLE.colorWhite,
    borderRadius: 8,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 10,
    padding: '0 16px 0 0',
    overflow: 'hidden',
    minHeight: 50,
    cursor: 'pointer'
  },

  itemImage: {
    width: 80,
    height: 80,
    objectFit: 'contain',
    minWidth: 80,
    maxWidth: 80,
    marginRight: 10,
    padding: 5
  },

  heading: {
    container: {
      position: 'relative',
      marginBottom: 5
    },

    modalContainer: combineStyle({
      MOBILE: [{}] as any,

      DESKTOP: [
        {
          width: 310,
          padding: '30px 0',

          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }
      ] as any,

      GENERAL: [{}] as any
    }),

    cover: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      filter: 'blur(5px)',
      backgroundPosition: 'center top',
      backgroundSize: 'cover',
      transform: 'scale(1.3)',
      opacity: 0.2
    },

    title: {
      position: 'relative',
      lineHeight: '30px',
      marginBottom: 5,
      fontSize: 16,
      color: VARIABLE.color20,
      fontWeight: VARIABLE.fontSemiBold,
      display: 'flex',
      justifyContent: 'space-between'
    },

    modalTitle: combineStyle({
      MOBILE: [{}] as any,

      DESKTOP: [
        {
          fontSize: 26,
          padding: '0 25px',
          marginBottom: 10,
          borderLeft: `5px solid ${VARIABLE.colorBlack}`
        }
      ] as any,

      GENERAL: [{}] as any
    }),

    description: {
      position: 'relative',
      fontSize: 14,
      lineHeight: '20px',
      color: VARIABLE.color8A,
      paddingRight: 30,
      fontWeight: VARIABLE.fontRegular
    },

    modalDescription: combineStyle({
      MOBILE: [{}] as any,

      DESKTOP: [{ padding: '0 30px' }] as any,

      GENERAL: [{}] as any
    }),

    highLight: { color: VARIABLE.colorRed },

    link: {
      position: 'relative',
      borderRadius: 5,
      minHeight: '40px',
      cursor: 'pointer',
      margin: '0 30px',
      textAlign: 'center' as const,
      display: 'block',
      height: 40,

      fontSize: 14,
      textTransform: 'uppercase',
      width: 200,
      lineHeight: '38px',
      background: VARIABLE.colorBlack,
      color: VARIABLE.colorWhite
    },

    viewmore: {
      height: 30,
      lineHeight: '30px',
      textDecoration: 'underline',
      color: VARIABLE.color20,
      fontWeight: VARIABLE.fontRegular,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer'
    }
  },

  itemName: {
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2,
    overflow: 'hidden',
    fontSize: 14,
    lineHeight: '20px',
    fontWeight: VARIABLE.fontRegular,
    color: VARIABLE.color20,
    flex: 1
  },

  icon: {
    display: 'block',
    width: 10,
    height: 10,
    minWidth: 10,
    minHeight: 10,
    borderTop: `1px solid ${VARIABLE.colorBlack}`,
    borderRight: `1px solid ${VARIABLE.colorBlack}`,
    transform: 'rotate(45deg)',
    opacity: 0.3,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: '0 !important'
  }
} as any;
