import * as VARIABLE from '../../../style/variable';

export default {
  container: {
    width: 28,
    minWidth: 28,
    height: 28,
    borderRadius: 4,
    marginTop: 4,
    marginRight: 10,
    marginBottom: 4,
    marginLeft: 0,
    backgroundSize: `cover`,
    transition: VARIABLE.transitionOpacity,
    position: 'relative',
    cursor: 'pointer',
    boxShadow: `0 0 0 1px ${VARIABLE.colorE4} inset`
  }
} as any;
