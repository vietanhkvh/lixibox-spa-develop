export const DEFAULT_PROPS = {
  match: {
    params: {
      idVideo: ''
    }
  },

  perPage: 8
};

export const INITIAL_STATE = {
  page: 1,
  isLoading: false,
  isFetchVideo: false,
  isFullyLoading: false
};
