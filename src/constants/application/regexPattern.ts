/** PATTERN CHECK EMAIL */
export const EMAIL_PATTERN =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

/** PATTERN CHECK PHONE */
export const PHONE_PATTERN_10_CHAR = /^((0|1|2|3|4|5|6|7|8|9)+([0-9]{9})\b)$/g;
export const PHONE_PATTERN_11_CHAR = /^((0|1|2|3|4|5|6|7|8|9)+([0-9]{10})\b)$/g;
export const LETTERS_ONLY = /^[\p{L}\p{M} ]*$/u;
