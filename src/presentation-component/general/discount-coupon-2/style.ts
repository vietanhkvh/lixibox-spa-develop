import * as VARIABLE from '../../../style/variable';
import { combineStyle } from '../../../utils/responsive';

export default {
  discountCountCodeList: {
    list: combineStyle({
      MOBILE: [
        {
          overflowX: 'auto',
          padding: '0 16px',
          width: 'calc(100%)',
          transition: VARIABLE.transitionNormal
        }
      ] as any,
      DESKTOP: [
        {
          width: 'calc(100% + 20px)',
          marginLeft: -10,
          paddingTop: 0,
          paddingBottom: 10,
          paddingLeft: 2,
          paddingRight: 2,
          flexWrap: 'wrap',
          display: 'flex'
        }
      ] as any,

      GENERAL: [
        {
          justifyContent: 'space-between'
        }
      ] as any
    }),

    panel: combineStyle({
      MOBILE: [
        {
          overflow: 'hidden',
          height: 94
        }
      ] as any,

      DESKTOP: [
        {
          width: '100%'
        }
      ] as any,

      GENERAL: [{}] as any
    }),

    item: combineStyle({
      MOBILE: [
        {
          scrollSnapAlign: 'center',
          minWidth: 270,
          width: '100%',
          marginTop: 16,
          marginBottom: 16
        }
      ] as any,
      DESKTOP: [{ flex: 1 }] as any,

      GENERAL: [
        {
          display: 'flex',
          overflow: 'hidden'
        }
      ] as any
    }),

    innerItem: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: 50,
      padding: 0
    },

    description: {
      fontSize: 13,
      lineHeight: '20px',
      color: VARIABLE.color20,
      padding: '0 12px',
      fontWeight: VARIABLE.fontRegular,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      display: '-webkit-box',
      WebkitBoxOrient: 'vertical',
      WebkitLineClamp: 2,
      maxHeight: 40,
      position: 'relative',
      flex: 1,
      width: '100%'
    },

    code: {
      fontSize: 14,
      fontWeight: VARIABLE.fontBold,
      color: VARIABLE.colorBlue,
      paddingLeft: 12,
      paddingRight: 12,
      lineHeight: '20px',
      userSelect: 'text',
      textAlign: 'center' as const,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      display: '-webkit-box',
      WebkitBoxOrient: 'vertical',
      WebkitLineClamp: 2,
      textTransform: 'uppercase',
      minWidth: 85,
      maxWidth: 160,
      wordBreak: 'break-all'
    },

    icon: {
      width: 28,
      height: 28,
      color: VARIABLE.color2E
    },

    innerIcon: {
      width: 14
    }
  }
} as any;
