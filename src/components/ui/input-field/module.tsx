import { IProps, IState } from './model';
import { INPUT_TYPE } from './initialize';

import { VALIDATION } from '../../../constants/application/global';
import { ERROR_VALIDATION } from '../../../constants/localize/errorMessage';
import {
  EMAIL_PATTERN,
  PHONE_PATTERN_10_CHAR,
  PHONE_PATTERN_11_CHAR
} from '../../../constants/application/regexPattern';

const DEFAULT_VALIDATION_VALUE = {
  validationValue: true,
  validationErrorMessage: ''
};

export const validation = (props, state): any => {
  const {
    validate,
    type,
    minLen,
    maxLen,
    minValue,
    maxValue,
    valueCompare,
    errorMessage,
    validationValue,
    validationErrorMessage
  } = props as IProps;
  const { value, isDirty } = state as IState;

  if (false === isDirty) {
    return DEFAULT_VALIDATION_VALUE;
  }

  let checkValidation;

  checkValidation = validatationInList(validate, value, valueCompare, errorMessage, type);
  if (false === checkValidation.validationValue) {
    return checkValidation;
  }

  checkValidation = validationMinlen(value, minLen);
  if (false === checkValidation.validationValue) {
    return checkValidation;
  }

  checkValidation = validationMaxlen(value, maxLen);
  if (false === checkValidation.validationValue) {
    return checkValidation;
  }

  if (minValue !== null) {
    checkValidation = validationMinValue(value, minValue);
    if (false === checkValidation.validationValue) {
      return checkValidation;
    }
  }

  if (maxValue !== null) {
    checkValidation = validationMaxValue(value, maxValue);
    if (false === checkValidation.validationValue) {
      return checkValidation;
    }
  }
  if (maxValue !== null && minValue !== null) {
    if (false === validationValue) return { validationValue, validationErrorMessage };
  }
  return DEFAULT_VALIDATION_VALUE;
};

const validatationInList = (validate, value, valueCompare, errorMessage, type): any => {
  let { validationValue, validationErrorMessage } = DEFAULT_VALIDATION_VALUE;

  Array.isArray(validate) &&
    validate.forEach((item) => {
      switch (item) {
        /** VALIDATION EMAIL PATTERN */
        case VALIDATION.EMAIL_FORMAT:
          if (null === value.match(EMAIL_PATTERN) && '' !== value) {
            validationValue = false;
            validationErrorMessage = ERROR_VALIDATION.FORMAT_EMAIL;
          }
          break;

        /** VALIDATION PHONE PATTERN */
        case VALIDATION.PHONE_FORMAT:
          if (
            0 !== value[0] ||
            (null === value.match(PHONE_PATTERN_10_CHAR) && null === value.match(PHONE_PATTERN_11_CHAR) && '' !== value)
          ) {
            validationValue = false;
            validationErrorMessage = ERROR_VALIDATION.FORMAT_PHONE;
          }
          break;

        /** VALIADTION TYPE REQUIRED */
        case VALIDATION.REQUIRED:
          if ('' === value) {
            switch (type) {
              case INPUT_TYPE.EMAIL:
                validationValue = false;
                validationErrorMessage = ERROR_VALIDATION.REQUIRED_EMAIL;
                break;

              case INPUT_TYPE.PASSWORD:
                validationValue = false;
                validationErrorMessage = ERROR_VALIDATION.REQUIRED_PASSWORD;
                break;

              default:
                validationValue = false;
                validationErrorMessage = ERROR_VALIDATION.REQUIRED;
            }
          }
          break;

        /** VALIDATION CHECK BY VALUE */
        case VALIDATION.CHECK_BY_VALUE:
          if (value !== valueCompare) {
            validationValue = false;
            validationErrorMessage = errorMessage.length === 0 ? ERROR_VALIDATION.DEFAULT_ERROR_MESSAGE : errorMessage;
          }
          break;
      }
    });

  return { validationValue, validationErrorMessage };
};

const validationMinlen = (value, minLen): any => {
  let { validationValue, validationErrorMessage } = DEFAULT_VALIDATION_VALUE;

  if (-1 !== minLen) {
    if (value.toString().length < minLen) {
      validationValue = false;
      validationErrorMessage = ERROR_VALIDATION.MIN_LEN(minLen);
    }
  }

  return { validationValue, validationErrorMessage };
};

const validationMaxlen = (value, maxLen): any => {
  let { validationValue, validationErrorMessage } = DEFAULT_VALIDATION_VALUE;

  if (-1 !== maxLen) {
    if (value.toString().length > maxLen) {
      validationValue = false;
      validationErrorMessage = ERROR_VALIDATION.MAX_LEN(maxLen);
    }
  }

  return { validationValue, validationErrorMessage };
};

const validationMinValue = (value, minValue): any => {
  let { validationValue, validationErrorMessage } = DEFAULT_VALIDATION_VALUE;

  if (-1 !== minValue) {
    if (value < minValue) {
      validationValue = false;
      validationErrorMessage = ERROR_VALIDATION.MIN_VALUE(minValue);
    }
  }

  return { validationValue, validationErrorMessage };
};

const validationMaxValue = (value, maxValue): any => {
  let { validationValue, validationErrorMessage } = DEFAULT_VALIDATION_VALUE;

  if (-1 !== maxValue) {
    if (value > maxValue) {
      validationValue = false;
      validationErrorMessage = ERROR_VALIDATION.MAX_VALUE(maxValue);
    }
  }

  return { validationValue, validationErrorMessage };
};
