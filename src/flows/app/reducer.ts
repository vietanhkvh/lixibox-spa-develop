import { REDUCER_GROUP } from '../reducer.group';
import * as APP_ACTION_TYPE from './type';

export const INITIAL_STATE_APP = {
  mobileappWebviewStatus: false,
  isPrivateMode: false,
  privateModeLink: '',
  abTestingMode: {
    lxbStagingCartRecommendationMb: null,
    selectProductVariants: null
  }
};

function metaReducer(
  state = INITIAL_STATE_APP,
  action = {
    type: '',
    payload: {
      mobileappWebview: false,
      isPrivateMode: false,
      privateModeLink: '',
      lxbStagingCartRecommendationMb: null,
      selectProductVariants: null
    },
    meta: {},
    group: ''
  }
) {
  if (action.group !== REDUCER_GROUP.APP) {
    return state;
  }

  switch (action.type) {
    case APP_ACTION_TYPE.UPDATE_URL_PARAMS:
      const { mobileappWebview } = action.payload;
      const mobileappWebviewStatus = getMobileappWebviewStatus({ mobileappWebview });

      return Object.assign({}, state, { mobileappWebviewStatus });

    case APP_ACTION_TYPE.UPDATE_PRIVATE_MODE:
      const { isPrivateMode, privateModeLink } = action.payload;

      return Object.assign({}, state, { isPrivateMode, privateModeLink });

    case APP_ACTION_TYPE.UPDATE_AB_TESTING_MODE:
      const { lxbStagingCartRecommendationMb, selectProductVariants } = action.payload;
      const newAbTestingMode = Object.assign(
        {},
        state.abTestingMode,
        lxbStagingCartRecommendationMb && { lxbStagingCartRecommendationMb },
        selectProductVariants && { selectProductVariants }
      );

      return Object.assign({}, state, { abTestingMode: newAbTestingMode });

    default:
      return state;
  }
}

const getMobileappWebviewStatus = ({ mobileappWebview }) => !!mobileappWebview;

export default metaReducer;
