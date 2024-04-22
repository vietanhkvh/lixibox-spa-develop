import * as VARIABLE from '../../../style/variable';

const STYLE = {
  icon: (isShowButton: boolean) => {
    const optionStyle =
      true === isShowButton
        ? {
            transform: 'translateY(0px)',
            opacity: 1,
            visibility: VARIABLE.visible.visible,
            color: VARIABLE.colorWhite
          }
        : {
            transform: 'translateY(-120px)',
            opacity: 0,
            visibility: VARIABLE.visible.hidden,
            color: VARIABLE.colorWhite
          };

    return Object.assign(
      {},
      {
        width: 44,
        height: 44,
        borderRadius: 4,
        color: VARIABLE.colorBlack,
        background: VARIABLE.colorBlack,
        border: `1px solid  ${VARIABLE.color4D}`,

        position: VARIABLE.position.fixed,
        right: 25,
        bottom: 25,
        cursor: 'pointer',
        zIndex: VARIABLE.zIndex7,
        transition: VARIABLE.transitionNormal
      },
      optionStyle
    );
  },

  innerIcon: {
    width: 17
  }
};

export default STYLE;
