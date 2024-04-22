import { REDUCER_GROUP } from '../reducer.group';
import * as META_ACTION_TYPE from './type';

import { CDN_ASSETS_PREFIX } from '../../utils/uri';

export const INITIAL_STATE_META = {
  info: {
    url: 'https://www.lixibox.com/',
    type: 'article',
    title: 'Lixibox | Máy rửa mặt, Mỹ Phẩm, Dưỡng Da, Trị Mụn, Skincare, Makeup',
    description: 'Lixibox shop box mỹ phẩm cao cấp, trị mụn, dưỡng da và các sản phẩm máy rửa mặt cho các loại da.',
    keyword: 'máy rửa mặt, halio, mỹ phẩm, dưỡng da, trị mụn, skincare, makeup, lustre',
    image: CDN_ASSETS_PREFIX('/meta/cover.png')
  },
  structuredData: {
    breadcrumbList: []
  }
};

function metaReducer(
  state = INITIAL_STATE_META,
  action = {
    type: '',
    payload: {},
    meta: {},
    group: ''
  }
) {
  if (action.group !== REDUCER_GROUP.META) {
    return state;
  }

  switch (action.type) {
    case META_ACTION_TYPE.UPDATE_META_INFO:
      return Object.assign({}, state, action.payload);

    default:
      return state;
  }
}

export default metaReducer;
