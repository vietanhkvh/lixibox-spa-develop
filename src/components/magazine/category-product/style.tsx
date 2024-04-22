import * as VARIABLE from '../../../style/variable';
import { combineStyle } from '../../../utils/responsive';

export default {
  title: {
    fontSize: 16,
    lineHeight: '20px',
    color: VARIABLE.colorBlack08,
    width: '100%',
    fontWeight: 900,
    display: VARIABLE.display.block,

    marginBottom: 10,
    textTransform: 'capitalize'
  },

  description: {
    fontSize: 14,
    lineHeight: '22px',
    maxHeight: 66,
    overflow: 'hidden',
    color: VARIABLE.colorBlack06,
    width: '100%',
    marginBottom: 10,
    textAlign: 'justify' as const
  },

  productContent: {
    display: VARIABLE.display.flex,
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginBottom: 20,

    itemWrap: {
      display: VARIABLE.display.flex,
      justifyContent: 'space-between',
      width: 'calc(50% - 10px)',
      marginBottom: 10,

      imgWrap: {
        width: 'calc(35% - 10px)',

        itemImage: (image: string) => ({
          width: '100%',
          paddingTop: '65%',
          backgroundImage: `url(${image})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          posicontion: VARIABLE.position.relative,
          transition: VARIABLE.transitionNormal,
          marginRight: 10
        })
      },

      itemInfo: {
        display: VARIABLE.display.flex,
        flexDirection: 'column',
        width: '65%'
      }
    }
  },

  boxContent: {
    container: combineStyle({
      MOBILE: [{ flexDirection: 'column' }] as any,
      DESKTOP: [{ flexDirection: 'row' }] as any,
      GENERAL: [{ display: VARIABLE.display.flex }] as any
    }),

    itemDescription: combineStyle({
      MOBILE: [{ textAlign: 'center' as const, padding: '0 10px' }] as any,
      DESKTOP: [{ textAlign: 'left' as const, padding: '0 10px 0 20px' }] as any,
      GENERAL: [
        {
          fontSize: 14,
          lineHeight: '20px',
          maxHeight: 60,
          overflow: 'hidden',
          color: VARIABLE.color75,
          width: '100%',
          marginBottom: 20
        }
      ] as any
    }),

    listSubItem: {
      container: combineStyle({
        MOBILE: [
          {
            width: '100%',
            marginRight: 0,
            flexDirection: 'row'
          }
        ] as any,

        DESKTOP: [
          {
            width: 312,
            marginRight: 30,
            flexDirection: 'column'
          }
        ] as any,

        GENERAL: [
          {
            marginBottom: 10,
            display: VARIABLE.display.flex,
            justifyContent: 'space-between',
            flexWrap: 'wrap'
          }
        ] as any
      }),

      subItem: {
        container: combineStyle({
          MOBILE: [{ width: '47.5%' }] as any,
          DESKTOP: [{ width: '100%' }] as any,
          GENERAL: [{ marginBottom: 10 }] as any
        }),

        itemImage: (image: string) => ({
          width: '100%',
          paddingTop: '65%',
          backgroundImage: `url(${image})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          marginBottom: 10,
          posicontion: VARIABLE.position.relative,
          transition: VARIABLE.transitionNormal
        }),

        itemInfo: {
          infoTitle: {
            fontSize: 14,
            lineHeight: '20px',
            color: VARIABLE.color4D,
            width: '100%',
            fontWeight: 900,
            padding: '0 10px',
            textAlign: 'center' as const,
            display: VARIABLE.display.block,
            marginBottom: 10,
            transition: VARIABLE.transitionNormal,
            textTransform: 'capitalize'
          },

          infoDescription: {
            fontSize: 14,
            lineHeight: '20px',
            maxHeight: 60,
            overflow: 'hidden',
            color: VARIABLE.colorBlack06,
            textAlign: 'center' as const,
            width: '100%',
            padding: '0 10px'
          },

          infoStatistical: {
            display: VARIABLE.display.inlineBlock,
            fontSize: 12,
            lineHeight: '16px',
            verticalAlign: 'top',
            padding: '0 10px',

            span: {
              color: VARIABLE.color75,
              padding: '0 10px'
            }
          }
        }
      }
    }
  }
} as any;
