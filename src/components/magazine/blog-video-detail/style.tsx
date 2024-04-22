import * as VARIABLE from '../../../style/variable';
import { combineStyle } from '../../../utils/responsive';

export default {
  headerWrap: {
    marginBottom: 20,

    blogTitle: combineStyle({
      MOBILE: [
        {
          fontSize: 30,
          paddingLeft: 10,
          paddingRight: 10
        }
      ] as any,

      DESKTOP: [
        {
          fontSize: 40
        }
      ] as any,

      GENERAL: [
        {
          display: VARIABLE.display.block,
          width: '100%',
          margin: '0 auto',
          lineHeight: '42px',
          fontWeight: VARIABLE.fontBold,
          paddingTop: 10,
          paddingBottom: 40
        }
      ] as any
    }),

    desc: combineStyle({
      MOBILE: [{ paddingLeft: 10, paddingRight: 10, fontSize: 18 }] as any,
      DESKTOP: [{ fontSize: 20, margin: '0 auto 30px' }] as any,

      GENERAL: [
        {
          fontStyle: 'italic',
          color: VARIABLE.colorBlack,
          textAlign: 'justify' as const
        }
      ] as any
    })
  },

  placeholder: {
    width: '100%',
    paddingTop: 20,

    mainImg: {
      width: '100%',
      height: 680,
      marginBottom: 20
    },

    mainImgMobile: {
      width: '100%',
      height: 240,
      marginBottom: 20
    },

    iconGroup: {
      display: VARIABLE.display.flex,
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10,

      dateGroup: {
        height: 20,
        width: '20%'
      },

      socialGroup: {
        height: 20,
        width: '20%'
      }
    },

    title: {
      width: '100%',
      height: 70,
      marginBottom: 20
    },

    content: {
      height: 30,
      width: '100%',
      marginBottom: 10
    }
  },

  videoContainer: {
    container: combineStyle({
      MOBILE: [
        {
          height: 250
        }
      ] as any,

      DESKTOP: [
        {
          height: 680
        }
      ] as any,

      GENERAL: [
        {
          marginBottom: 20,
          backgroundColor: VARIABLE.colorF7
        }
      ] as any
    }),

    video: {
      width: '100%',
      height: '100%'
    }
  },

  title: {
    container: combineStyle({
      MOBILE: [
        {
          marginBottom: 10
        }
      ] as any,

      DESKTOP: [
        {
          marginBottom: 20
        }
      ] as any,

      GENERAL: [
        {
          top: -1,
          height: 60,
          fontSize: 20,
          letterSpacing: -0.5,
          maxWidth: `100%`,
          overflow: `hidden`,
          lineHeight: `60px`,
          whiteSpace: `nowrap`,
          textOverflow: `ellipsis`,
          color: VARIABLE.colorBlack,

          background: VARIABLE.colorWhite,
          position: VARIABLE.position.relative
        }
      ] as any
    }),

    borderLine: {
      display: VARIABLE.display.block,
      position: VARIABLE.position.absolute,
      height: 4,
      width: 25,
      background: VARIABLE.colorBlack,
      bottom: 1
    },

    line: {
      display: VARIABLE.display.block,
      position: VARIABLE.position.absolute,
      height: 1,
      width: '100%',
      background: VARIABLE.colorBlack05,
      bottom: 1
    }
  },

  videoRelated: combineStyle({
    MOBILE: [
      {
        paddingLeft: 10,
        paddingRight: 10
      }
    ] as any,
    DESKTOP: [{}] as any,
    GENERAL: [
      {
        marginBottom: 20
      }
    ] as any
  })
} as any;
