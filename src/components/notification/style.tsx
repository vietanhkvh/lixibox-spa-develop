import * as VARIABLE from '../../style/variable';
import { combineStyle } from '../../utils/responsive';

export default {
  row: {
    display: VARIABLE.display.flex,
    flexWrap: 'wrap',
    marginTop: 10,

    wrap: combineStyle({
      MOBILE: [{ margin: '0 10px 10px 10px' }] as any,
      DESKTOP: [{ margin: '0 0 20px 0' }] as any,

      GENERAL: [
        {
          boxShadow: VARIABLE.shadowBlurSort,
          cursor: 'pointer',
          borderRadius: 3,
          width: '100%'
        }
      ] as any
    })
  },

  container: {
    display: VARIABLE.display.flex,
    wrapIcon: {
      width: 80,
      textAlign: 'center' as const,
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'center',
      borderRight: `1px solid ${VARIABLE.colorD2}`,

      item: {
        inner: {
          width: 30
        },

        edit: {
          color: VARIABLE.colorGreen
        },

        delete: {
          color: VARIABLE.colorYellow
        },

        success: {
          color: VARIABLE.colorGreen
        }
      }
    },

    contentGroup: {
      display: VARIABLE.display.flex,
      flexDirection: 'column',
      width: '100%',
      padding: '10px',
      titleGroup: {
        display: VARIABLE.display.flex,
        marginBottom: '5px',
        title: {
          flex: 10,
          fontSize: 18,
          color: VARIABLE.colorBlack,

          height: 25,
          lineHeight: '25px'
        },

        date: {
          height: 25,
          lineHeight: '25px',
          width: 100,
          textAlign: 'right' as const,
          color: VARIABLE.colorBlack05,
          fontSize: '12px'
        }
      },

      content: {
        fontSize: 16,
        color: VARIABLE.colorBlack07
      }
    }
  },

  placeholder: {
    width: '100%',

    title: {
      background: VARIABLE.colorF0,
      display: VARIABLE.display.block,
      width: 100,
      height: 40,
      margin: '0 auto 30px'
    },

    control: {
      width: '100%',
      display: VARIABLE.display.flex,
      justifyContent: 'space-between',
      paddingLeft: 10,
      paddingRight: 10,
      marginBottom: 20
    },

    controlItem: {
      width: 150,
      height: 30,
      background: VARIABLE.colorF7
    },

    productList: combineStyle({
      MOBILE: [
        {
          paddingTop: 10
        }
      ] as any,

      DESKTOP: [{}] as any,

      GENERAL: [
        {
          display: VARIABLE.display.flex,
          flexWrap: 'wrap'
        }
      ] as any
    }),

    productMobileItem: {
      minWidth: '100%',
      width: '100%',
      marginBottom: 10
    },

    productItem: {
      flex: 1,
      paddingLeft: 10,
      paddingRight: 10,
      marginBottom: 20,
      minWidth: '100%',
      width: '100%',

      image: combineStyle({
        MOBILE: [
          {
            paddingTop: '35%'
          }
        ] as any,

        DESKTOP: [
          {
            paddingTop: '8%'
          }
        ] as any,

        GENERAL: [
          {
            width: '100%',
            height: 'auto'
          }
        ] as any
      }),

      text: {
        width: '94%',
        height: 25,
        marginBottom: 10
      },

      lastText: {
        width: '65%',
        height: 25
      }
    }
  },

  note: combineStyle({
    MOBILE: [
      {
        fontSize: 16
      }
    ] as any,

    DESKTOP: [
      {
        fontSize: 20
      }
    ] as any,

    GENERAL: [
      {
        textAlign: 'center' as const
      }
    ] as any
  })
} as any;
