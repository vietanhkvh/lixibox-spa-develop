import * as VARIABLE from '../../../style/variable';
import { combineStyle } from '../../../utils/responsive';

export default {
  container: combineStyle({
    MOBILE: [{}] as any,
    DESKTOP: [{ boxShadow: 'none' }] as any,
    GENERAL: [
      {
        display: VARIABLE.display.block,
        overflow: 'hidden',
        width: '100%'
      }
    ] as any
  }),

  header: {
    container: {
      display: VARIABLE.display.flex,
      height: 30,
      color: VARIABLE.color2E,
      borderBottom: `1px solid ${VARIABLE.colorF0}`,
      paddingLeft: 16,
      paddingRight: 16
    },

    id: {
      flex: 1,
      fontSize: 13,
      lineHeight: '44px',
      fontWeight: VARIABLE.fontLight,
      color: VARIABLE.color8A
    },

    status: {
      flex: 1,
      display: VARIABLE.display.flex,
      justifyContent: 'flex-end',
      alignItems: 'center',

      colorStatus: (type) => {
        const backgroundColor = {
          waiting: VARIABLE.colorYellow,
          cancel: VARIABLE.colorRed,
          success: VARIABLE.colorGreen
        };

        return {
          display: VARIABLE.display.flex,
          width: 15,
          height: 15,
          backgroundColor: backgroundColor[type] as any,
          marginRight: 10,
          borderRadius: 3
        };
      },

      text: combineStyle({
        MOBILE: [
          {
            fontSize: 12,
            lineHeight: '17px'
          }
        ] as any,

        DESKTOP: [
          {
            fontSize: 14,
            lineHeight: '20px'
          }
        ] as any,

        GENERAL: [
          {
            textAlign: 'right' as const
          }
        ] as any
      })
    }
  },

  content: {
    padding: 10,
    borderBottom: `1px solid ${VARIABLE.colorE5}`,
    backgroundColor: VARIABLE.colorWhite,

    list: {
      display: VARIABLE.display.flex,
      flexWrap: 'wrap'
    },

    item: {
      container: combineStyle({
        MOBILE: [{ width: '25%' }] as any,
        DESKTOP: [{ width: '16%' }] as any,

        GENERAL: [
          {
            padding: '10px 5px',
            display: VARIABLE.display.block
          }
        ] as any
      }),

      image: {
        backgroundColor: VARIABLE.colorE5,
        backgroundSize: 'cover',
        width: '100%',
        paddingTop: '69%',
        marginBottom: 10
      },

      name: {
        color: VARIABLE.color4D,
        fontSize: 13,
        lineHeight: '20px',
        maxHeight: 40,
        minHeight: 40,
        overflow: 'hidden',
        marginBottom: 10
      },

      price: combineStyle({
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
            color: VARIABLE.colorBlack07
          }
        ] as any
      })
    }
  },

  wrapFooter: {
    container: combineStyle({
      MOBILE: [{ flexDirection: 'column' }] as any,
      DESKTOP: [{ flexDirection: '' }] as any,
      GENERAL: [{ display: VARIABLE.display.flex }] as any
    }),

    detailGroup: {
      container: combineStyle({
        MOBILE: [{ borderBottom: `1px solid ${VARIABLE.colorD2}` }] as any,
        DESKTOP: [{}] as any,
        GENERAL: [
          {
            flex: 10,
            padding: 10,
            background: VARIABLE.colorWhite,
            justifyContent: 'space-between',
            paddingLeft: '10px'
          }
        ] as any
      }),

      detail: {
        display: VARIABLE.display.flex,
        flex: 1,
        alignItems: 'center',
        paddingLeft: 10,

        row: (type: string) => {
          const boldType =
            'bold' === type
              ? {
                  borderTop: `1px solid ${VARIABLE.colorD2}`,
                  marginTop: 5
                }
              : {};

          return Object.assign({}, { display: VARIABLE.display.flex, padding: '5px 0' }, boldType);
        },

        title: (type: string) =>
          combineStyle({
            MOBILE: [{ width: '35%' }] as any,
            DESKTOP: [{ width: '30%' }] as any,
            GENERAL: [
              'bold' === type
                ? {
                    color: VARIABLE.color4D,
                    lineHeight: '36px',
                    fontSize: 15
                  }
                : {
                    color: VARIABLE.color75,
                    lineHeight: `22px`,
                    fontSize: 13
                  }
            ] as any
          }),

        content: combineStyle({
          MOBILE: [{ width: '100%' }] as any,
          DESKTOP: [{}] as any,
          GENERAL: [
            {
              fontSize: 13,
              color: VARIABLE.colorBlack07,

              textAlign: 'left' as const
            }
          ] as any
        })
      }
    },

    footer: {
      container: combineStyle({
        MOBILE: [{}] as any,
        DESKTOP: [{ width: 340, borderLeft: `1px solid ${VARIABLE.colorE5}` }] as any,
        GENERAL: [
          {
            padding: 10,
            display: VARIABLE.display.flex,
            background: VARIABLE.colorF7,
            justifyContent: 'space-between',
            alignItems: 'center',
            borderRadius: '0px 0px 3px 3px',
            flexDirection: 'column'
          }
        ] as any
      }),

      button: {
        minWidth: 120,
        maxWidth: 120
      },

      cancelBtnWrap: {
        paddingTop: 10,
        paddingBottom: 10,
        borderTop: `1px solid ${VARIABLE.colorE5}`,
        textAlign: 'center' as const,

        cancelBtn: {
          minWidth: 120,
          maxWidth: 120,
          margin: 0
        }
      },

      priceGroup: {
        container: combineStyle({
          MOBILE: [{}] as any,
          DESKTOP: [{ width: '100%' }] as any,
          GENERAL: [{ flex: 10, paddingLeft: 10 }] as any
        }),

        row: (type: string) => {
          const boldType =
            'bold' === type
              ? {
                  borderTop: `1px solid ${VARIABLE.colorD2}`,
                  marginTop: 5
                }
              : {};

          return Object.assign({}, { display: VARIABLE.display.flex }, boldType);
        },

        title: (type: string) => {
          const boldType =
            'bold' === type
              ? {
                  color: VARIABLE.color4D,
                  lineHeight: '36px',
                  fontSize: 15
                }
              : {
                  color: VARIABLE.color75,
                  lineHeight: `22px`,
                  fontSize: 13
                };

          return Object.assign(
            {},
            {
              flex: 10,
              textAlign: 'right' as const
            },
            boldType
          );
        },

        content: (type: string) => {
          const boldType =
            'bold' === type
              ? {
                  fontSize: 16,
                  color: VARIABLE.color2E,
                  lineHeight: `36px`
                }
              : {
                  fontSize: 14,
                  color: VARIABLE.color2E,
                  lineHeight: `22px`
                };
          return Object.assign(
            {},
            {
              minWidth: 110,
              maxWidth: 110,
              textAlign: 'right' as const
            },
            boldType
          );
        }
      }
    },

    link: {
      paddingTop: 5,
      paddingRight: 8,
      paddingBottom: 5,
      paddingLeft: 8,
      border: `1px solid ${VARIABLE.colorBlack05}`,
      marginLeft: 10,
      borderRadius: 3,
      color: VARIABLE.colorBlack08
    }
  },

  changeDeliveryToCODContainer: { width: '100%' },

  support: {
    container: { width: '100%' },
    link: { width: '100%', margin: 0 }
  }
} as any;
