import * as VARIABLE from 'style/variable';

export default {
  wrap: {
    display: VARIABLE.display.flex,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: '100%'
  },

  info: {
    display: VARIABLE.display.flex,
    alignItems: 'center',
    height: '100%',
    width: '70%',
    paddingRight: 30,

    imgWrap: {
      height: 70,
      minWidth: 66,
      width: 66,
      marginRight: 20,

      productImg: {
        width: '100%',
        maxHeight: '100%',
        objectFit: 'contain',
        padding: '2px 0'
      }
    },

    namePriceGroup: {
      display: VARIABLE.display.flex,
      flexDirection: 'column',

      name: {
        fontSize: 16,

        marginBottom: 8,
        lineHeight: '22px',
        maxHeight: 22,
        overflow: 'hidden'
      },

      priceGroup: {
        display: VARIABLE.display.flex,
        alignItems: 'center',

        price: {
          fontSize: 24,
          lineHeight: '24px',
          color: VARIABLE.colorBlack,

          display: VARIABLE.display.inlineBlock,
          marginRight: 20
        },

        oldPrice: {
          fontSize: 16
        }
      }
    }
  },

  btnGroup: {
    width: '30%'
  }
} as any;
