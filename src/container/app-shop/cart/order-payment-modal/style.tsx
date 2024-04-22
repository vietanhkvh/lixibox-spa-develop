import * as VARIABLE from '../../../../style/variable';
import { combineStyle } from '../../../../utils/responsive';

export default {
  wrapParent: {
    display: VARIABLE.display.flex,
    height: '100%',
    flexDirection: 'column',

    productList: {
      height: '100%',
      overflowY: 'auto',
      marginBottom: 69
    },

    row: {
      display: VARIABLE.display.flex,
      flexWrap: 'wrap',
      marginTop: '10px',

      wrap: combineStyle({
        MOBILE: [{ margin: '0 10px 10px 10px' }] as any,
        DESKTOP: [{ margin: '0 0 20px 0' }] as any,
        GENERAL: [
          {
            width: '100%',
            boxShadow: VARIABLE.shadowBlurSort,
            borderRadius: 3,
            cursor: 'pointer'
          }
        ] as any
      })
    }
  },

  itemWrap: {
    padding: 5,
    width: '50%'
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

  btnGroup: {
    backgroundColor: VARIABLE.colorWhite,

    buyMoreBtn: {
      border: `1px solid ${VARIABLE.color4D}`
    }
  }
} as any;
