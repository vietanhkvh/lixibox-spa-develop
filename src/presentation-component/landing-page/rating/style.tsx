import * as VARIABLE from '../../../style/variable';
import { combineStyle } from '../../../utils/responsive';

// const marginX = 0;
const gap = 16;
const numberItem = 4;
const widthItemDes = 100 / numberItem;
export default {
  listContainer: combineStyle({
    MOBILE: [
      {
        display: 'flex',
        overflowX: 'scroll',
        scrollSnapType: 'x mandatory',
        padding: '10px 16px 0',
        gap: `${gap}px`
      }
    ] as any,
    DESKTOP: [
      {
        display: 'flex',
        justifyContent: 'space-between',
        gap: `${gap}px`
      }
    ] as any,
    GENERAL: [
      {
        display: 'flex',
        justifyContent: 'space-between'
      }
    ] as any
  }),

  container: {
    item: combineStyle({
      MOBILE: [
        {
          minWidth: `calc(75vw - ${gap}px)`,
          scrollSnapAlign: 'center'
        }
      ] as any,
      DESKTOP: [
        {
          maxWidth: `calc(${widthItemDes}% - ${gap}px)`,
          minWidth: `calc(${widthItemDes}% - ${gap}px)`
        }
      ] as any,
      GENERAL: [
        {
          background: VARIABLE.colorF5,
          padding: '24px',
          // marginRight: '8px',
          borderRadius: '8px'
        }
      ] as any
    }),

    info: {
      avatar: {
        width: 36,
        minWidth: 36,
        height: 36,
        borderRadius: 25,
        marginRight: 10,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundColor: VARIABLE.colorE5
      },

      groupUsername: {
        flex: 10,
        display: VARIABLE.display.inlineBlock,
        flexDirection: `column`,
        overflow: `hidden`,
        textOverflow: `ellipsis`,
        justifyContent: `center`,
        // paddingBottom: 20,

        withBorder: {}
      },

      username: combineStyle({
        MOBILE: [{ maxWidth: 160 }] as any,
        DESKTOP: [{ maxWidth: 200 }] as any,
        GENERAL: [
          {
            display: VARIABLE.display.inlineBlock,

            verticalAlign: 'top',
            textOverflow: `ellipsis`,
            whiteSpace: `nowrap`,
            overflow: `hidden`,
            fontSize: 14,
            fontWeight: VARIABLE.fontSemiBold,
            lineHeight: `20px`,
            marginRight: 5
          }
        ] as any
      }),

      title: combineStyle({
        MOBILE: [{ maxWidth: 160 }] as any,
        DESKTOP: [{ maxWidth: 200 }] as any,
        GENERAL: [
          {
            display: VARIABLE.display.inlineBlock,

            verticalAlign: 'top',
            textOverflow: `ellipsis`,
            whiteSpace: `nowrap`,
            overflow: `hidden`,
            fontSize: 16,
            lineHeight: `26px`,
            marginRight: 5
          }
        ] as any
      }),

      ratingInfoGroup: combineStyle({
        MOBILE: [{}] as any,
        DESKTOP: [{ display: 'flex' }] as any,
        GENERAL: [{ marginBottom: 8, display: 'block' }] as any
      }),

      ratingInfo: {
        marginBottom: 0,
        display: VARIABLE.display.flex,
        flexWrap: 'wrap',
        flexDirection: 'column'
      },

      verificationText: {
        display: VARIABLE.display.flex,
        verticalAlign: 'top',
        color: VARIABLE.colorGreen,

        position: VARIABLE.position.relative,
        marginRight: 0
      },

      verificationTooltip: combineStyle({
        MOBILE: [{}] as any,
        DESKTOP: [
          {
            color: VARIABLE.colorGreen,
            height: 20,

            display: VARIABLE.display.inlineBlock,
            whiteSpace: 'nowrap',
            transition: VARIABLE.transitionOpacity
          }
        ] as any,
        GENERAL: [
          {
            padding: '0 5px',
            fontSize: 13,
            lineHeight: '20px'
          }
        ] as any
      }),

      verification: {
        width: 20,
        height: 20,
        color: VARIABLE.colorGreen
      },

      innerVerification: {
        width: 15
      },

      rating: combineStyle({
        MOBILE: [{ top: -1 }] as any,
        DESKTOP: [{ top: -1 }] as any,
        GENERAL: [
          {
            position: 'relative',
            marginLeft: -2,
            height: 20,
            marginRight: 5
          }
        ] as any
      }),

      time: {
        fontSize: 13,
        fontWeight: VARIABLE.fontLight,
        lineHeight: '20px',
        color: VARIABLE.color8A,
        // paddingLeft: 3,
        paddingRight: 10
      },

      content: {
        fontSize: 14,
        fontWeight: VARIABLE.fontLight,
        color: VARIABLE.color20,
        lineHeight: `20px`,
        textAlign: `justify`,
        verticalAlign: 'top',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        WwebkitBoxOrient: 'vertical',
        WebkitLineClamp: 2,
        padding: '0 8px'
      }
    }
  }
} as any;
