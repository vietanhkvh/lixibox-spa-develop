import * as GWP_API_PATH from '../../api/gwp';
import * as GWP_ACTION_TYPE from './type';
import { REDUCER_GROUP } from '../reducer.group';

export const getGwpSchemesAction = () => (dispatch, getState) => {
  return dispatch({
    type: GWP_ACTION_TYPE.GET_GWP_SCHEMES,
    payload: {
      promise: GWP_API_PATH.getGwpSchemesApi().then((res) => res)
    },
    meta: {},
    group: REDUCER_GROUP.GWP
  });
};

export interface GetGwpSchemeDetailActionParams {
  slug: string;
}
export const getGwpSchemeDetailAction =
  ({ slug }: GetGwpSchemeDetailActionParams) =>
  (dispatch, getState) => {
    return dispatch({
      type: GWP_ACTION_TYPE.GET_GWP_SCHEME_DETAIL,
      payload: {
        promise: GWP_API_PATH.getGwpSchemeDetailApi({ slug }).then((res) => res)
      },
      meta: { slug },
      group: REDUCER_GROUP.GWP
    });
  };
