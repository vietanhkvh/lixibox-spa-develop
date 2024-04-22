interface variableTypes {
  VALUE: string;
  NAME: string;
}

interface experienceTypes {
  SELECT_PRODUCT_VARIANTS: {
    EXP_ID: string;
    EXP_NAME: string;
    VARS: {
      V1: variableTypes;
      V2: variableTypes;
    };
  };
}

let EXPERIENCES_BY_ENV: experienceTypes | null = null;

const SELECT_PRODUCT_VARIANTS_GENERAL = {
  VARS: {
    V1: {
      NAME: 'v1',
      VALUE: '1'
    },
    V2: {
      NAME: 'v2',
      VALUE: '2'
    }
  }
};

if (process.env.REACT_APP_ENV !== 'production') {
  EXPERIENCES_BY_ENV = {
    SELECT_PRODUCT_VARIANTS: {
      EXP_ID: 'RZe_Fn_kSGOOtZXO4Ao7Lw',
      EXP_NAME: 'lxb_staging_select_product_variant',
      ...SELECT_PRODUCT_VARIANTS_GENERAL
    }
  };
}

if (process.env.REACT_APP_ENV === 'production') {
  EXPERIENCES_BY_ENV = {
    SELECT_PRODUCT_VARIANTS: {
      EXP_ID: 'WmNXbTwzQBKbdEoCir0YSg',
      EXP_NAME: 'lxb_production_select_product_variant',
      ...SELECT_PRODUCT_VARIANTS_GENERAL
    }
  };
}

export const EXPS = EXPERIENCES_BY_ENV;
