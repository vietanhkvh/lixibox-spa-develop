import * as COMPONENT from '../../../style/component';
import * as LAYOUT from '../../../style/layout';
import * as VARIABLE from '../../../style/variable';

export default {
  container: Object.assign({}, COMPONENT.asideBlock, {
    display: 'block',
    position: 'relative'
  }),

  menuItem: {
    marginBottom: 3,
    cursor: 'pointer',

    title: {
      container: Object.assign({}, LAYOUT.flexContainer.left, { marginBottom: 10 }),

      icon: {
        container: (isHide: boolean) =>
          Object.assign(
            {},
            {
              width: 24,
              minWidth: 24,
              height: 30,
              color: VARIABLE.color4D
            },
            isHide && {
              opacity: 0,
              visibility: VARIABLE.visible.hidden
            }
          ),

        inner: (isActive: boolean) => ({
          width: 11,
          height: 11,
          transition: VARIABLE.transitionNormal,
          transform: `rotate(${isActive ? 90 : 0}deg)`
        })
      },

      text: {
        sub: {
          fontSize: 14,
          fontWeight: VARIABLE.fontLight,
          lineHeight: '20px',
          color: VARIABLE.color8A
        }
      }
    }
  },

  subItem: {
    paddingLeft: 24
  },

  customStyleLoading: {
    height: 300
  },

  emptyContent: {
    width: '100%',
    height: 300
  }
} as any;
