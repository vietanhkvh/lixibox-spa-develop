import * as VARIABLE from '../../../style/variable';

export default {
  container: (isAllowCollapse: boolean) => ({
    display: VARIABLE.display.block,
    background: VARIABLE.colorWhite,
    position: VARIABLE.position.relative,
    zIndex: VARIABLE.zIndex5,
    paddingTop: 40,
    marginBottom: isAllowCollapse ? 15 : 0
  }),

  iconCollapse: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: '50%',
    background: VARIABLE.colorWhite,
    left: '50%',
    top: 0,
    marginLeft: -20,
    cursor: 'pointer',
    transition: VARIABLE.transitionNormal,
    transform: 'rotate(0)',

    collapse: {
      transform: 'rotate(180deg)'
    },

    icon: {
      color: VARIABLE.colorBlack,
      width: 15,
      height: 15
    }
  },

  cart: {
    container: (isShowActionButton: boolean) => ({
      paddingTop: 0,
      paddingRight: 10,
      paddingBottom: 0,
      paddingLeft: 10,
      marginBottom: isShowActionButton ? 0 : 20
    }),

    tableInfo: {
      container: (height = 0) => ({
        overflow: 'hidden',
        height: 140 + height,
        transition: VARIABLE.transitionNormal,
        opacity: 1
      }),

      collapse: {
        height: 0,
        opacity: 0
      }
    },

    rowInfo: {
      borderBottom: `1px solid ${VARIABLE.colorD2}`,

      title: {
        fontSize: 14,
        lineHeight: '22px',
        paddingTop: 6,
        paddingBottom: 6,
        whiteSpace: 'nowrap',
        maxWidth: '40%'
      },

      value: {
        fontSize: 14,
        lineHeight: '22px',
        paddingTop: 6,
        paddingBottom: 6,
        textAlign: 'right' as const
      }
    },

    total: {
      borderTop: `1px solid ${VARIABLE.colorBlack}`,
      paddingTop: 22,
      position: 'relative',
      top: -1,
      transition: VARIABLE.transitionNormal,

      collapse: {
        borderTop: 'none',
        paddingTop: 0,
        top: 0
      },

      text: {
        fontSize: 16
      },

      price: {
        textTransform: 'uppercase',
        fontSize: 18,
        color: VARIABLE.colorRed
      }
    },

    button: (collapse) => ({
      marginTop: collapse ? 0 : 10,
      marginBottom: collapse ? 10 : 0
    }),

    titleButton: {}
  },

  lixicoin: {
    paddingTop: 10,
    paddingRight: 12,
    paddingBottom: 12,
    paddingLeft: 12,
    opacity: 1,
    transition: VARIABLE.transitionNormal,
    visiblity: 'visible',
    overflow: 'hidden',
    height: 194,

    collapse: {
      opacity: 0,
      visiblity: 'hidden',
      height: 0,
      paddingTop: 0,
      paddingRight: 0,
      paddingBottom: 0,
      paddingLeft: 0
    },

    text: {
      fontSize: 14,
      lineHeight: '20px',
      textAlign: 'center' as const,

      marginBottom: 8,
      color: VARIABLE.color4D
    },

    heading: {
      fontSize: 30,
      lineHeight: '40px',
      textAlign: 'center' as const,
      marginBottom: 8,

      fontWeight: VARIABLE.fontBold,
      color: VARIABLE.color4D
    }
  }
} as any;
