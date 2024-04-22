import * as VARIABLE from '../../../../../../style/variable';

export default {
  newMobile: {
    mobileProductInfo: {
      marginLeft: 10,
      marginRight: 10,
      marginBottom: 10,
      borderBottom: `1px solid ${VARIABLE.colorE5}`,
      borderLeft: `1px solid ${VARIABLE.colorE5}`,
      borderRight: `1px solid ${VARIABLE.colorE5}`,
      borderRadius: 3,

      row: {
        fontSize: 12,
        lineHeight: '18px',
        paddingLeft: 10,
        paddingRight: 10,
        borderTop: `1px solid ${VARIABLE.colorF0}`,
        paddingTop: 7,
        paddingBottom: 7,
        display: 'flex',
        alignItems: 'center'
      },

      text: {
        color: VARIABLE.color2E,
        fontSize: 13
      },

      redText: {
        color: VARIABLE.colorRed
      },

      currency: {
        icon: {
          width: 18,
          height: 18,
          color: VARIABLE.color2E,
          marginRight: 7
        },

        innerIcon: {
          width: 15
        }
      },

      delivery: {
        icon: {
          width: 18,
          height: 18,
          color: VARIABLE.color2E,
          marginRight: 7
        },

        innerIcon: {
          width: 17
        }
      },

      timeFee: {
        icon: {
          width: 15,
          height: 15,
          color: VARIABLE.color2E,
          marginRight: 7
        },

        innerIcon: {
          width: 15
        }
      },

      receivingDate: {
        icon: {
          width: 18,
          height: 18,
          color: VARIABLE.color2E,
          marginRight: 7
        },

        innerIcon: {
          width: 15
        }
      },

      outOfStock: {
        icon: {
          width: 18,
          height: 18,
          marginRight: 7,
          color: VARIABLE.colorRed
        },

        innerIcon: {
          width: 15
        }
      },

      storeAddress: {
        icon: {
          width: 18,
          height: 18,
          marginRight: 7,
          color: VARIABLE.color2E
        },

        innerIcon: {
          width: 15
        }
      }
    }
  },

  promotionText: {
    bold: {
      whiteSpace: 'nowrap',
      color: VARIABLE.color4D,
      marginRight: 5
    }
  }
} as any;
