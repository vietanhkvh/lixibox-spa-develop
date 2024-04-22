import { REDUCER_GROUP } from '../reducer.group';
import * as MODAL_ACTION_TYPE from './type';

import { scrollElement } from '../../utils/scroll';

export const INITIAL_STATE_MODAL = {
  isShow: false,
  isNeedToPushBack: false,
  data: [
    {
      childComponent: '',
      childProps: {},
      modalStyle: {
        container: {},
        ovelay: {},
        content: {}
      }
    }
  ]
};

function modalReducer(
  state = INITIAL_STATE_MODAL,
  action = { type: '', payload: { isFixScroll: false, isPushLayer: false }, group: '' }
) {
  if (action.group !== REDUCER_GROUP.MODAL) {
    return state;
  }

  let newData, isShow;
  switch (action.type) {
    case MODAL_ACTION_TYPE.OPEN_MODAL:
      try {
        const shopAppElement: any = document.getElementById('shop-app');
        const isFixScroll = action.payload.isFixScroll && !!shopAppElement && 'fixed' !== shopAppElement.style.position;
        if (isFixScroll) {
          const scrollYPages = window.scrollY;
          shopAppElement.style.top = `-${scrollYPages}px`;
          shopAppElement.style.width = '100%';
          shopAppElement.style.position = 'fixed';
        }

        /** Force hide facebook customer chat when open modal */
        const fbRootElement: any = document.getElementById('fb-root');
        if (!!fbRootElement) fbRootElement.style.display = 'none';
      } catch (e) {}

      /**
       * Open Modal Logic
       *
       * If is not isPushLayer -> data list modal have just one of item
       * Else And exist Modal before -> Push modal into the list data
       */
      newData = action.payload.isPushLayer && state.isShow ? [...state.data, action.payload] : [action.payload];

      return Object.assign({}, state, {
        isShow: true,
        data: newData
      });

    case MODAL_ACTION_TYPE.CLOSE_MODAL:
      /**
       * Close Modal Logic
       *
       * If have more than 1 modal item in the list -> remove the last modal and not close Modal
       * Else -> Assign default data and close modal
       */
      if (Array.isArray(state.data) && state.data.length > 1) {
        newData = state.data.slice(0, -1);
        isShow = true;
      } else {
        newData = INITIAL_STATE_MODAL.data;
        isShow = false;

        try {
          const shopAppElement: any = document.getElementById('shop-app');

          if (!!shopAppElement) {
            const scrollYPages = Math.abs(parseInt(shopAppElement.style.top));
            shopAppElement.setAttribute('style', '');
            !!scrollYPages && scrollElement({ x: 0, y: scrollYPages });
          }
        } catch (e) {}

        /** Force hide facebook customer chat when open modal */
        try {
          const fbRootElement: any = document.getElementById('fb-root');
          if (!!fbRootElement) fbRootElement.style.display = 'block';
        } catch (e) {}
      }

      return Object.assign({}, state, {
        isShow,
        data: newData
      });

    case MODAL_ACTION_TYPE.PUSH_STATE_WHEN_OPENING_MODAL:
      // window.history.pushState('Product Detail', action.payload.title, action.payload.link);
      return Object.assign({}, state, { isNeedToPushBack: true });

    case MODAL_ACTION_TYPE.BACK_STATE_WHEN_CLOSING_MODAL:
      return Object.assign({}, state, { isNeedToPushBack: false });

    default:
      return state;
  }
}

export default modalReducer;
