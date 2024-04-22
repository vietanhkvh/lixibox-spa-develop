import * as VARIABLE from '../../../../style/variable';

export default {
  mainTitle: {
    display: VARIABLE.display.block,
    width: '100%',
    textAlign: 'center' as const,
    fontSize: 32,
    lineHeight: '42px',
    padding: '30px 160px',

    borderBottom: `1px solid ${VARIABLE.colorD2}`,
    fontWeight: VARIABLE.fontBold,
    marginBottom: 30
  },

  desktop: {
    backgroundSize: 'cover',
    display: VARIABLE.display.block,
    background: VARIABLE.colorWhite,

    heading: {
      width: '100%',
      marginLeft: 0,
      height: 60,
      background: VARIABLE.colorWhite05,
      display: VARIABLE.display.flex,
      justifyContent: 'space-between',
      position: VARIABLE.position.fixed,
      zIndex: VARIABLE.zIndex9,
      borderBottom: `1px solid ${VARIABLE.colorWhite}`,
      top: 0,
      left: 0,

      logo: {
        display: VARIABLE.display.flex,

        back: {
          width: 60,
          height: 60,
          background: VARIABLE.colorBlack04,
          color: VARIABLE.colorWhite
        },

        innerBack: { width: 20 },

        iconLogo: {
          width: 'auto',
          height: 60,
          color: VARIABLE.colorBlack,
          paddingLeft: 15
        },

        innerIconLogo: { height: 15 }
      },
      nav: {
        display: VARIABLE.display.flex,
        justifyContent: 'flex-end',
        paddingLeft: 15,
        paddingRight: 75,

        link: {
          color: VARIABLE.colorBlack08,
          lineHeight: '60px',
          paddingLeft: 15,
          paddingRight: 15,
          fontSize: 16,

          textTransform: 'uppercase'
        }
      }
    },

    wrap: {
      margin: '0 auto',
      width: '100%',
      background: VARIABLE.colorWhite,
      paddingBottom: 10
    },

    blogTitle: {
      display: VARIABLE.display.block,
      width: '100%',
      textAlign: 'center' as const,
      fontSize: 40,
      lineHeight: '42px',
      padding: '30px 160px',

      fontWeight: VARIABLE.fontBold
    }
  },

  customTitle: {
    textAlign: 'center' as const,
    width: '100%',
    display: 'block',

    fontSize: 30
  }
} as any;
