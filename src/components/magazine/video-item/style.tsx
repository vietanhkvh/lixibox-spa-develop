import * as VARIABLE from '../../../style/variable';
import { combineStyle } from '../../../utils/responsive';

const generateWidthByColumn = (column) => {
  switch (column) {
    case 2:
      return 'calc(50% - 15px)';
    case 3:
      return 'calc(33.3% - 10px)';
    case 4:
      return 'calc(25% - 15px)';
    case 5:
      return 'calc(20% - 10px)';
  }
};

export default {
  video: (imgUrl) => ({
    width: '100%',
    paddingTop: '62.5%',
    position: VARIABLE.position.relative,
    backgroundImage: `url(${imgUrl})`,
    backgroundColor: VARIABLE.colorF7,
    backgroundPosition: 'top center',
    backgroundSize: 'cover'
  }),

  videoIcon: combineStyle({
    MOBILE: [
      {
        width: 40,
        left: '60%',
        transform: 'translate(-50%, -50%)',
        borderTop: `15px solid ${VARIABLE.colorTransparent}`,
        borderLeft: `20px solid ${VARIABLE.colorWhite}`,
        borderBottom: `15px solid ${VARIABLE.colorTransparent}`,
        borderRight: `15px solid ${VARIABLE.colorTransparent}`
      }
    ] as any,

    DESKTOP: [
      {
        width: 70,
        height: 70,
        left: '55%',
        transform: 'translate(-50%, -50%)',
        borderTop: `35px solid ${VARIABLE.colorTransparent}`,
        borderLeft: `51px solid ${VARIABLE.colorWhite}`,
        borderBottom: `35px solid ${VARIABLE.colorTransparent}`
      }
    ] as any,

    GENERAL: [
      {
        position: VARIABLE.position.absolute,
        boxSizing: 'border-box',
        opacity: 0.8,
        top: '50%'
      }
    ] as any
  }),

  contentWrap: {
    width: '100%',
    paddingTop: 12,
    paddingRight: 0,
    paddingBottom: 12,
    paddingLeft: 0,
    position: VARIABLE.position.relative,
    backgroundColor: VARIABLE.colorWhite,
    display: VARIABLE.display.flex,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',

    title: {
      color: VARIABLE.color20,
      whiteSpace: 'pre-wrap',
      fontSize: 16,
      fontWeight: VARIABLE.fontSemiBold,
      lineHeight: '26px',
      maxHeight: 48,
      minHeight: 48,
      overflow: 'hidden',
      marginBottom: 5
    },

    description: {
      fontSize: 14,
      lineHeight: '18px',
      fontWeight: VARIABLE.fontLight,
      color: VARIABLE.color20,

      opacity: 0.7,
      marginRight: 10,
      whiteSpace: 'pre-wrap'
    }
  },

  videoContainer: (column) =>
    combineStyle({
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
          overflow: 'hidden',
          display: VARIABLE.display.block,
          position: VARIABLE.position.relative,
          width: generateWidthByColumn(column)
        }
      ] as any
    }),

  lastChild: {
    marginBottom: 0
  }
} as any;
