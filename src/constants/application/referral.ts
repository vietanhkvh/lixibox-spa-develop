export type RefereeSchemeModalInvocationMode = string;
export const REFEREE_SCHEME_MODAL_INVOCATION_MODE: { [key: string]: RefereeSchemeModalInvocationMode } = {
  INITIAL: 'INITIAL', // Indicates that the modal was invoked when a referral link was opened
  INTERACTION: 'INTERACTION' // Indicates that the modal was invoked through user interaction
};

export type RefereeSchemesModalInvocationMode = string;
export const REFEREE_SCHEMES_MODAL_INVOCATION_MODE: { [key: string]: RefereeSchemesModalInvocationMode } = {
  WITH_BUTTON: 'WITH_BUTTON',
  WITHOUT_BUTTON: 'WITHOUT_BUTTON'
};
