import * as VARIABLE from '../../../style/variable';

export default {
  position: 'absolute',
  zIndex: VARIABLE.zIndex8,
  cursor: 'default',
  background: VARIABLE.colorWhite,
  filter: `drop-shadow(${VARIABLE.shadowDropdown})`,

  dropdownMarker: {
    background: VARIABLE.colorWhite,
    borderTop: `1px solid ${VARIABLE.colorD2}`,
    borderLeft: `1px solid ${VARIABLE.colorD2}`,
    width: 15,
    height: 15,
    transform: 'rotate(45deg)',
    position: 'absolute',
    top: -8
  },

  dropdownMarkerSection: {
    left: {
      left: 16
    },

    right: {
      right: 16
    }
  },

  dropdownBody: {
    background: VARIABLE.colorWhite,
    width: 250,
    position: 'relative'
  }
} as any;
