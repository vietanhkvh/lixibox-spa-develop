import * as VARIABLE from '../../../style/variable';
import { combineStyle } from '../../../utils/responsive';

export default {
  container: combineStyle({
    MOBILE: [],

    DESKTOP: [
      {
        paddingLeft: 0,
        paddingRight: 0
      }
    ] as any,

    GENERAL: [
      {
        display: 'block',
        width: '100%',
        paddingTop: 0,
        paddingRight: 0,
        paddingBottom: 0,
        paddingLeft: 0,
        marginTop: 15,
        marginBottom: 15
      }
    ] as any
  }),

  ratingLove: {
    marginBottom: 15,
    flexWrap: 'wrap',
    cursor: 'pointer',

    text: {
      fontSize: 14,
      color: VARIABLE.color4D,
      lineHeight: '30px',
      height: 30,
      paddingTop: 0,
      paddingRight: 6,
      paddingBottom: 0,
      paddingLeft: 6,
      whiteSpace: 'nowrap'
    },

    iconHeart: {
      width: 16,
      height: 16,
      color: VARIABLE.colorBlack,
      marginRight: 10,

      inner: {
        width: 14
      }
    }
  },

  promotionWrap: {
    borderBottom: `1px solid ${VARIABLE.colorE5}`,
    borderLeft: `1px solid ${VARIABLE.colorE5}`,
    borderRight: `1px solid ${VARIABLE.colorE5}`,
    borderRadius: 3
  },

  promotionText: {
    paddingTop: 8,
    paddingRight: 10,
    paddingBottom: 8,
    paddingLeft: 0,
    borderRadius: 2,
    borderTop: `1px solid ${VARIABLE.colorE5}`,

    text: {
      color: VARIABLE.color75,
      fontSize: 14,
      lineHeight: '18px'
    },

    red: {
      color: VARIABLE.colorRed,
      fontSize: 14,
      lineHeight: '18px'
    },

    iconDollar: {
      width: 45,
      minWidth: 45,
      height: 18,
      color: VARIABLE.color4D,

      inner: {
        width: 18
      }
    },

    iconDanger: {
      width: 45,
      minWidth: 45,
      height: 18,
      color: VARIABLE.colorRed,

      inner: {
        width: 18
      }
    },

    iconDeliver: {
      width: 45,
      minWidth: 45,
      height: 18,
      color: VARIABLE.color4D,

      inner: {
        width: 24
      }
    },

    iconFee: {
      width: 45,
      minWidth: 45,
      height: 18,
      color: VARIABLE.color4D,

      inner: {
        width: 18,
        height: 18
      }
    },

    iconPreOrder: {
      width: 45,
      minWidth: 45,
      height: 18,
      color: VARIABLE.color4D,

      inner: {
        width: 18
      }
    },

    iconStore: {
      width: 45,
      minWidth: 45,
      height: 18,
      color: VARIABLE.color4D,

      inner: {
        width: 18,
        height: 18
      }
    },

    bold: {
      whiteSpace: 'nowrap',
      color: VARIABLE.color4D,
      marginRight: 5
    },

    link: {
      cursor: 'pointer'
    },

    pink: {
      backgroundColor: VARIABLE.colorPink01
    },

    gray: {
      backgroundColor: VARIABLE.colorBlack005
    }
  },

  starStyleInner: {
    color: VARIABLE.colorBlack
  }
} as any;
