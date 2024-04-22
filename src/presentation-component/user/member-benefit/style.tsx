import { combineStyle } from 'utils/responsive';
import * as VARIABLE from 'style/variable';

export const main = {
  container: {}
};

export const memberLevel = {
  fontSize: 14,

  textTransform: 'uppercase',
  letterSpacing: 1
};

export const memberLevelTitle = {
  list: {
    display: 'flex'
  },

  item: combineStyle({
    MOBILE: [{ paddingLeft: 10 }] as any,

    DESKTOP: [
      {
        paddingLeft: 30
      }
    ] as any,

    GENERAL: [
      {
        fontSize: 9
      }
    ] as any
  })
};

export const benefitItem = {
  container: (index, total) =>
    combineStyle({
      MOBILE: [
        {
          padding: '8px 0 8px 10px'
        }
      ] as any,

      DESKTOP: [
        {
          padding: '14px 0 14px 20px'
        }
      ] as any,

      GENERAL: [
        {
          background: 0 === index % 2 ? VARIABLE.colorF7 : VARIABLE.colorWhite,
          borderBottom: total - 1 !== index && `1px solid ${VARIABLE.colorF0}`,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }
      ] as any
    }),

  title: combineStyle({
    MOBILE: [
      {
        fontSize: 13
      }
    ] as any,

    DESKTOP: [
      {
        fontSize: 14
      }
    ] as any,

    GENERAL: [
      {
        flex: 1,
        lineHeight: '18px',
        color: VARIABLE.color20,
        fontWeight: VARIABLE.fontLight,

        paddingRight: 20
      }
    ] as any
  }),

  text: combineStyle({
    MOBILE: [
      {
        fontSize: 13
      }
    ] as any,

    DESKTOP: [
      {
        fontSize: 14
      }
    ] as any,

    GENERAL: [
      {
        width: '100%',
        textAlign: 'center' as const,
        lineHeight: '18px',
        height: 18,
        whiteSpace: 'nowrap'
      }
    ] as any
  }),

  checkIcon: {
    width: 30,
    height: 30,
    color: VARIABLE.colorBlack
  },

  innerCheckIcon: {
    width: 15
  },

  checkList: combineStyle({
    MOBILE: [{ paddingRight: 10, width: 150, minWidth: 150 }] as any,

    DESKTOP: [
      {
        paddingRight: 20,
        width: 240,
        minWidth: 240
      }
    ] as any,

    GENERAL: [
      {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItem: 'center'
      }
    ] as any
  }),

  checkListSliver: combineStyle({
    MOBILE: [
      {
        width: 46,
        minWidth: 46,
        paddingLeft: 10
      }
    ] as any,

    DESKTOP: [
      {
        width: 66,
        minWidth: 66,
        paddingLeft: 30
      }
    ] as any,

    GENERAL: [
      {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }
    ] as any
  }),

  checkListGold: combineStyle({
    MOBILE: [
      {
        width: 40,
        minWidth: 40,
        paddingLeft: 10
      }
    ] as any,

    DESKTOP: [
      {
        paddingLeft: 30,
        width: 60,
        minWidth: 60
      }
    ] as any,

    GENERAL: [
      {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }
    ] as any
  }),

  checkListDiamond: combineStyle({
    MOBILE: [
      {
        width: 64,
        minWidth: 64,
        paddingLeft: 10
      }
    ] as any,

    DESKTOP: [
      {
        width: 84,
        minWidth: 84,
        paddingLeft: 30
      }
    ] as any,

    GENERAL: [
      {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }
    ] as any
  })
} as any;
