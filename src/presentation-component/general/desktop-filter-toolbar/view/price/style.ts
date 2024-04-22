import * as VARIABLE from '../../../../../style/variable';

export default {
  input: {
    padding: 0,
    marginTop: 0,
    marginBottom: 0,
    flex: 1
  },

  innerInput: {
    background: VARIABLE.colorWhite,
    width: 140,
    height: 40,
    borderRadius: 8,
    border: `1px solid ${VARIABLE.colorC6}`,
    textAlign: 'center' as const
  },

  searchInput: {
    background: VARIABLE.colorWhite,
    height: 40,
    borderRadius: 8,
    border: `1px solid ${VARIABLE.colorC6}`,
    paddingLeft: 40
  },

  bottomButton: {
    margin: 0
  }
} as any;
