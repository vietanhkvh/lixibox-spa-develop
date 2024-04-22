import { PENDING_TYPE, FULFILLED_TYPE, REJECTED_TYPE } from '../../constants/api/action.config';
import { objectToHash, stringToHash } from '../../utils/encode';
import { isEmptyObject, isUndefined } from '../../utils/validate';
import { initialPageable, upsertPage } from '../../utils/page';
import { dispatchApiError, formatErrorMessage, isExistError } from '../../utils/exception';
import { openAlertAction } from '../../flows/alert/action';
import {
  ALERT_ADD_WAIT_LIST_SUCCESS,
  ALERT_GENERAL_ERROR,
  ALERT_REMOVE_WAIT_LIST_SUCCESS
} from '../../constants/application/alert';
import { REDUCER_GROUP } from '../reducer.group';
import * as SHOP_ACTION_TYPE from './type';
import { ShopState } from './types';
import { ProductBox } from 'types/api/shop';

export const INITIAL_STATE_SHOP: ShopState = {
  hotDeal: {},
  hotDeals: {
    index: [],
    paging: null,
    fetching: false,
    loaded: false,
    errored: false
  },
  makeups: [],
  storeBoxes: [],
  boxesCategories: [],
  recommendationBox: [],
  recommendationBoxPaging: {
    current_page: 0,
    per_page: 0,
    total_pages: 0
  },
  recommendationBoxPageIndex: 0,
  boxFeedbackSummary: {
    detail: null,
    lastId: '',
    fetching: false,
    loaded: false,
    errored: false
  },

  dataHomePage: {},
  productDetail: {}, // TODO: Refactor state (encorporate transitional states) during product detail component migration to functional component
  productDetailsFetching: [],
  productDetailsLoaded: [],
  productDetailsErrored: [],
  landingPagesData: {},
  productByCategory: {},
  fetchProductByCategory: {
    lastCategoryId: '',
    lastSearchQuery: '',
    fetching: false,
    loaded: false,
    errored: false
  },
  availableFilters: {},
  productByCategoryNotFound: false,
  categoryFilterStatus: {},
  productDetailSummary: {},
  productPaging: { current_page: 0, per_page: 0, total_pages: 0 },
  bundledItems: {
    boxId: '',
    index: [],
    fetching: false,
    loaded: false,
    errored: false
  },
  bundledProducts: {
    boxId: '',
    index: [],
    fetching: false,
    loaded: false,
    errored: false
  },

  productName: {
    value: ''
  },

  addToWaitList: {
    loading: false,
    data: {},
    isSuccess: false
  },
  removeFromWaitList: {
    loading: false,
    data: {},
    isSuccess: false
  },

  boxRedeem: {},
  boxFeedback: {},
  boxMagazines: {},
  boxSavingSets: {},
  boxRelated: {},
  boxFeedbackPicture: {},
  boxFeedbackable: {
    slug: '',
    canReview: false,
    reviewed: false,
    fetching: false,
    loaded: false,
    errored: false
  },
  redeemable: {
    special: Object.assign({}, initialPageable(), {
      fetching: false,
      loaded: false,
      errored: false
    }),
    user: Object.assign({}, initialPageable(), {
      fetching: false,
      loaded: false,
      errored: false
    }),
    latest: Object.assign({}, initialPageable(), {
      fetching: false,
      loaded: false,
      errored: false
    })
  },
  likeAFeedback: {},
  unlikeAFeedback: {},

  isFetchRelatedSuccess: false,
  isFetchMagazinesSuccess: false,
  isFetchRedeemBoxSuccess: false,
  isFetchSavingSetsSuccess: false,
  isFetchBoxFeedbackSuccess: false,
  isLoadingFetchBoxFeedback: false,
  isGetProductDetailSuccess: false,
  trackingViewBoxAction: false,
  isGetProductDetailFail: [],
  isLoadingProductDetail: false,
  isFetchBoxesCategoriesSuccess: false,
  isFetchBoxFeedbackPicture: false,
  isFetchRecommendationBox: false,
  isTrackingViewBox: false,
  isFetchingAvailableFilters: false
};

interface IAction {
  type: string;
  payload: {
    result: any;
    box?: ProductBox;
    boxes: Array<any>;
    makeups: Array<any>;
    store_boxes: Array<any>;
    categories: Array<any>;
    discussions: any;
    pictures: Array<any>;
    bundle_items: Array<any>;
    bundle_products: Array<any>;
    paging: any;
    error?: any;
    errors?: any;
    can_review: boolean;
    is_reviewed: boolean;
    reviewed?: boolean;
    available_filters?: any;
    total_likes: number;
  };
  meta: {
    metaFilter: {
      idCategory: string;
      searchQuery: string;
    };
    productId: string;
    slug: string;
    isTrackingViewBox: boolean;
    boxId: string;
    feedbackId: number;
  };
  asyncDispatch: any;
  group: string;
}

function shopReducer(
  state = INITIAL_STATE_SHOP,
  action: IAction = {
    type: '',
    payload: {
      boxes: [],
      makeups: [],
      store_boxes: [],
      categories: [],
      discussions: {},
      pictures: [],
      paging: {},
      bundle_items: [],
      bundle_products: [],
      total_likes: 0
    } as any,
    meta: {
      metaFilter: {
        idCategory: '',
        searchQuery: ''
      },
      productId: '',
      slug: '',
      isTrackingViewBox: false,
      boxId: '',
      feedbackId: null
    },
    group: '',
    asyncDispatch: (data: any) => {}
  }
) {
  if (action.group !== REDUCER_GROUP.SHOP) {
    return state;
  }

  const {
    boxRedeem,
    boxRelated,
    boxMagazines,
    productDetail,
    landingPagesData,
    boxSavingSets,
    productByCategory,
    productDetailSummary,
    boxFeedbackPicture,
    recommendationBox,
    recommendationBoxPageIndex,
    boxFeedbackable
  } = state;

  switch (action.type) {
    /** Get data home page */
    case PENDING_TYPE(SHOP_ACTION_TYPE.FECTH_DATA_HOME_PAGE):
      return Object.assign({}, state, { dataHomePage: {} });

    case FULFILLED_TYPE(SHOP_ACTION_TYPE.FECTH_DATA_HOME_PAGE):
      return Object.assign({}, state, { dataHomePage: action.payload });

    case REJECTED_TYPE(SHOP_ACTION_TYPE.FECTH_DATA_HOME_PAGE):
      return Object.assign({}, state, { dataHomePage: {} });

    /** Get product by category  */

    case PENDING_TYPE(SHOP_ACTION_TYPE.FETCH_PRODUCT_BY_CATEGORY):
      return Object.assign({}, state, {
        productDetailSummary: {},
        productByCategory: {},
        productByCategoryNotFound: false,
        isFetchingAvailableFilters: true,
        fetchProductByCategory: {
          lastCategoryId: action.meta.metaFilter?.idCategory,
          lastSearchQuery: action.meta.metaFilter?.searchQuery,
          fetching: true,
          loaded: false,
          errored: false
        }
      });

    case FULFILLED_TYPE(SHOP_ACTION_TYPE.FETCH_PRODUCT_BY_CATEGORY):
      /** Update for product detail summary -> using for preload in product detail page */
      const newProductDetailSummary = {};
      Array.isArray(action.payload.boxes) &&
        action.payload.boxes.forEach((item) => {
          const hashStringProductDetailSummary = stringToHash(item.slug);
          newProductDetailSummary[hashStringProductDetailSummary] = item;
        });

      /** Update for list product by category */
      const hashString = objectToHash(action.meta.metaFilter);
      const newDataItem = { [hashString]: action.payload };

      return Object.assign({}, state, {
        productByCategory: Object.assign({}, productByCategory, newDataItem),
        productDetailSummary: Object.assign({}, newProductDetailSummary, productDetailSummary),
        availableFilters: Object.assign({}, action.payload.available_filters),
        isFetchingAvailableFilters: false,
        productByCategoryNotFound: false,
        productPaging: Object.assign({}, action.payload.paging),
        fetchProductByCategory: {
          fetching: false,
          loaded: true,
          errored: false
        }
      });

    case REJECTED_TYPE(SHOP_ACTION_TYPE.FETCH_PRODUCT_BY_CATEGORY):
      return Object.assign({}, state, {
        productByCategoryNotFound: true,
        isFetchingAvailableFilters: false,
        fetchProductByCategory: {
          fetching: false,
          loaded: false,
          errored: true
        }
      });

    /** Get product list that is new product or best selling product for home page */
    case FULFILLED_TYPE(SHOP_ACTION_TYPE.FETCH_HOME_PRODUCT_BY_CATEGORY):
      const _keyHash = objectToHash(action.meta.metaFilter);
      const _prodcutByCategory = { [_keyHash]: action.payload };

      return Object.assign({}, state, {
        productByCategory: Object.assign({}, productByCategory, _prodcutByCategory)
      });

    case SHOP_ACTION_TYPE.UPDATE_CATEGORY_FILTER_STATE:
      return Object.assign({}, state, {
        categoryFilterStatus: Object.assign({}, action.payload)
      });

    case SHOP_ACTION_TYPE.UPDATE_PRODUCT_NAME_MOBILE:
      return Object.assign({}, state, {
        productName: {
          value: action.payload
        }
      });

    case PENDING_TYPE(SHOP_ACTION_TYPE.GET_PRODUCT_DETAIL): {
      let productId = action.meta.productId;
      const isGetProductDetailFail = Array.isArray(state.isGetProductDetailFail) ? state.isGetProductDetailFail : [];
      const isGetProductDetailFailUpdated = isGetProductDetailFail.filter((item) => item !== productId);
      const productHash = stringToHash(action.meta.productId);

      return Object.assign({}, state, {
        productDetailsFetching:
          state.productDetailsFetching.indexOf(productHash) === -1
            ? state.productDetailsFetching.concat(productHash)
            : state.productDetailsFetching,
        productDetailsErrored: state.productDetailsErrored.filter((id) => id !== productHash),
        isGetProductDetailSuccess: false,
        isTrackingViewBox: false,
        isGetProductDetailFail: isGetProductDetailFailUpdated,
        isLoadingProductDetail: true,
        boxFeedbackable: Object.assign({}, boxFeedbackable, {
          slug: action.payload?.box?.slug || '',
          fetching: true,
          loaded: false,
          errored: false
        })
      });
    }

    case FULFILLED_TYPE(SHOP_ACTION_TYPE.GET_PRODUCT_DETAIL): {
      let { productId, isTrackingViewBox } = action.meta;
      const { isGetProductDetailFail } = state;
      const isGetProductDetailFailUpdated = isGetProductDetailFail.filter((item) => item !== productId);
      const productHash = stringToHash(action.meta.productId);

      return Object.assign({}, state, {
        productDetail: Object.assign({}, productDetail, {
          [productHash]: action.payload
        }),
        boxFeedbackable: Object.assign({}, boxFeedbackable, {
          slug: action.payload?.box?.slug || '',
          canReview: !!action.payload?.can_review,
          reviewed: !!action.payload?.reviewed,
          fetching: false,
          loaded: true,
          errored: false
        }),
        productDetailsFetching: state.productDetailsFetching.filter((id) => id !== productHash),
        productDetailsLoaded:
          state.productDetailsLoaded.indexOf(productHash) === -1
            ? state.productDetailsLoaded.concat(productHash)
            : state.productDetailsLoaded,
        productDetailsErrored: state.productDetailsErrored.filter((id) => id !== productHash),
        isGetProductDetailSuccess: true,
        isTrackingViewBox,
        isGetProductDetailFail: isGetProductDetailFailUpdated,
        isLoadingProductDetail: false
      });
    }

    case REJECTED_TYPE(SHOP_ACTION_TYPE.GET_PRODUCT_DETAIL): {
      let productId = action.meta.productId;
      let { isGetProductDetailFail } = state;
      const productHash = stringToHash(action.meta.productId);

      if (isGetProductDetailFail.indexOf(productId) < 0) {
        isGetProductDetailFail.push(productId);
      }

      return Object.assign({}, state, {
        productDetailsFetching: state.productDetailsFetching.filter((id) => id !== productHash),
        productDetailsErrored:
          state.productDetailsErrored.indexOf(productHash) === -1
            ? state.productDetailsErrored.concat(productHash)
            : state.productDetailsErrored,
        isGetProductDetailSuccess: false,
        isTrackingViewBox: false,
        isGetProductDetailFail: isGetProductDetailFail,
        isLoadingProductDetail: false,
        boxFeedbackable: Object.assign({}, boxFeedbackable, {
          slug: action.payload?.box?.slug || '',
          fetching: false,
          loaded: false,
          errored: true
        })
      });
    }

    /** Get landing pages data */
    case SHOP_ACTION_TYPE.GET_LANDING_PAGES_DATA: {
      const productIdHash = stringToHash(action.meta.productId);

      return Object.assign({}, state, {
        landingPagesData: Object.assign({}, landingPagesData, {
          [productIdHash]: action.payload
        })
      });
    }

    // case PENDING_TYPE(SHOP_ACTION_TYPE.GET_LANDING_PAGES_DATA):
    //   {
    //     const productIdHash = stringToHash(action.meta.productId);

    //     return Object.assign({}, state, {
    //       landingPagesData: Object.assign({}, landingPagesData, {
    //         [productIdHash]: []
    //       }),
    //     });
    //   }

    // case FULFILLED_TYPE(SHOP_ACTION_TYPE.GET_LANDING_PAGES_DATA):
    //   {
    //     const productIdHash = stringToHash(action.meta.productId);

    //     return Object.assign({}, state, {
    //       landingPagesData: Object.assign({}, landingPagesData, {
    //         [productIdHash]: action.payload
    //       }),
    //     });
    //   }

    // case REJECTED_TYPE(SHOP_ACTION_TYPE.GET_LANDING_PAGES_DATA):
    //   {
    //     const productIdHash = stringToHash(action.meta.productId);

    //     return Object.assign({}, state, {
    //       landingPagesData: Object.assign({}, landingPagesData, {
    //         [productIdHash]: []
    //       }),
    //     });
    //   }

    case PENDING_TYPE(SHOP_ACTION_TYPE.ADD_WAIT_LIST):
      return Object.assign({}, state, {
        addToWaitList: {
          data: {},
          loading: true,
          isSuccess: false
        }
      });

    // FIXME: Potential state mutation
    case FULFILLED_TYPE(SHOP_ACTION_TYPE.ADD_WAIT_LIST):
      const keyHash = stringToHash(action.meta.slug);

      let tmpProductDetail = productDetail;
      let tmpProductDetailSummary = productDetailSummary;
      // Update added_to_waitlist equal true for product detail store
      if (!isEmptyObject(productDetail) && !isUndefined(productDetail[keyHash])) {
        const tmp = productDetail[keyHash];
        tmp.box.added_to_waitlist = true;
        tmpProductDetail = Object.assign({}, { [keyHash]: tmp }, tmpProductDetail);
      }

      // Update added_to_waitlist equal true for product detail summary store
      if (!isEmptyObject(productDetailSummary) && !isUndefined(productDetailSummary[keyHash])) {
        const tmp = productDetailSummary[keyHash];
        tmp.added_to_waitlist = true;
        tmpProductDetailSummary = Object.assign({}, { [keyHash]: tmp }, tmpProductDetailSummary);
      }

      action.asyncDispatch(openAlertAction(ALERT_ADD_WAIT_LIST_SUCCESS));

      return Object.assign({}, state, {
        addToWaitList: {
          loading: false,
          isSuccess: true,
          data: action.payload
        },
        productDetail: tmpProductDetail,
        productDetailSummary: tmpProductDetailSummary
      });

    case REJECTED_TYPE(SHOP_ACTION_TYPE.ADD_WAIT_LIST):
      if (isExistError(action.payload?.error, action.payload?.errors)) {
        action.asyncDispatch(
          openAlertAction(
            ALERT_GENERAL_ERROR({
              content: formatErrorMessage(action.payload?.error || action.payload?.errors)
            })
          )
        );
      }
      return Object.assign({}, state, {
        addToWaitList: {
          loading: false,
          isSuccess: false,
          data: action.payload
        }
      });

    case PENDING_TYPE(SHOP_ACTION_TYPE.REMOVE_FROM_WAIT_LIST):
      return Object.assign({}, state, {
        removeFromWaitList: {
          data: {},
          loading: true,
          isSuccess: false
        }
      });

    // TODO: Refactor. Copied over as is from ADD_WAIT_LIST.
    case FULFILLED_TYPE(SHOP_ACTION_TYPE.REMOVE_FROM_WAIT_LIST): {
      const keyHash = stringToHash(action.meta.slug);

      let tmpProductDetail = productDetail;
      let tmpProductDetailSummary = productDetailSummary;
      // Update added_to_waitlist equal false for product detail store
      if (!isEmptyObject(productDetail) && !isUndefined(productDetail[keyHash])) {
        const tmp = productDetail[keyHash];
        tmp.box.added_to_waitlist = false;
        tmpProductDetail = Object.assign({}, { [keyHash]: tmp }, tmpProductDetail);
      }

      // Update added_to_waitlist equal false for product detail summary store
      if (!isEmptyObject(productDetailSummary) && !isUndefined(productDetailSummary[keyHash])) {
        const tmp = productDetailSummary[keyHash];
        tmp.added_to_waitlist = false;
        tmpProductDetailSummary = Object.assign({}, { [keyHash]: tmp }, tmpProductDetailSummary);
      }

      action.asyncDispatch(openAlertAction(ALERT_REMOVE_WAIT_LIST_SUCCESS));

      return Object.assign({}, state, {
        removeFromWaitList: {
          loading: false,
          isSuccess: true,
          data: action.payload
        },
        productDetail: tmpProductDetail,
        productDetailSummary: tmpProductDetailSummary
      });
    }

    case REJECTED_TYPE(SHOP_ACTION_TYPE.REMOVE_FROM_WAIT_LIST):
      dispatchApiError({ action });

      return Object.assign({}, state, {
        removeFromWaitList: {
          loading: false,
          isSuccess: false,
          data: action.payload
        }
      });

    case PENDING_TYPE(SHOP_ACTION_TYPE.FETCH_BOX_FEEDBACK_SUMMARY):
      return Object.assign({}, state, {
        boxFeedbackSummary: Object.assign({}, state.boxFeedbackSummary, {
          detail: null,
          lastId: action.meta.slug,
          fetching: true,
          loaded: false,
          errored: false
        })
      });

    case FULFILLED_TYPE(SHOP_ACTION_TYPE.FETCH_BOX_FEEDBACK_SUMMARY):
      return Object.assign({}, state, {
        boxFeedbackSummary: Object.assign({}, state.boxFeedbackSummary, {
          detail: action.payload,
          fetching: false,
          loaded: true,
          errored: false
        })
      });

    case REJECTED_TYPE(SHOP_ACTION_TYPE.FETCH_BOX_FEEDBACK_SUMMARY):
      return Object.assign({}, state, {
        boxFeedbackSummary: Object.assign({}, state.boxFeedbackSummary, {
          fetching: false,
          loaded: false,
          errored: true
        })
      });

    case PENDING_TYPE(SHOP_ACTION_TYPE.FETCH_REDEEM_BOXES):
      return Object.assign({}, state, { isFetchRedeemBoxSuccess: false });

    case FULFILLED_TYPE(SHOP_ACTION_TYPE.FETCH_REDEEM_BOXES):
      boxRedeem[objectToHash(action.meta)] = action.payload;

      return Object.assign({}, state, {
        boxRedeem,
        isFetchRedeemBoxSuccess: true
      });

    case REJECTED_TYPE(SHOP_ACTION_TYPE.FETCH_REDEEM_BOXES):
      return Object.assign({}, state, { isFetchRedeemBoxSuccess: false });

    case PENDING_TYPE(SHOP_ACTION_TYPE.FETCH_BUNDLED_ITEMS):
      return Object.assign({}, state, {
        bundledItems: Object.assign({}, state.bundledItems, {
          boxId: action.meta.boxId,
          fetching: true,
          errored: false
        })
      });

    case FULFILLED_TYPE(SHOP_ACTION_TYPE.FETCH_BUNDLED_ITEMS):
      return Object.assign({}, state, {
        bundledItems: Object.assign({}, state.bundledItems, {
          index: action.payload?.bundle_items || [],
          fetching: false,
          loaded: true
        })
      });

    case REJECTED_TYPE(SHOP_ACTION_TYPE.FETCH_BUNDLED_ITEMS):
      return Object.assign({}, state, {
        bundledItems: Object.assign({}, state.bundledItems, {
          fetching: false,
          errored: true
        })
      });

    case PENDING_TYPE(SHOP_ACTION_TYPE.FETCH_BUNDLED_PRODUCTS):
      return Object.assign({}, state, {
        bundledProducts: Object.assign({}, state.bundledProducts, {
          boxId: action.meta.boxId,
          fetching: true,
          errored: false
        })
      });

    case FULFILLED_TYPE(SHOP_ACTION_TYPE.FETCH_BUNDLED_PRODUCTS):
      return Object.assign({}, state, {
        bundledProducts: Object.assign({}, state.bundledProducts, {
          index: action.payload?.bundle_products || [],
          fetching: false,
          loaded: true
        })
      });

    case REJECTED_TYPE(SHOP_ACTION_TYPE.FETCH_BUNDLED_PRODUCTS):
      return Object.assign({}, state, {
        bundledProducts: Object.assign({}, state.bundledProducts, {
          fetching: false,
          errored: true
        })
      });

    case PENDING_TYPE(SHOP_ACTION_TYPE.FETCH_FEEDBACK_BOXES):
      return Object.assign({}, state, {
        isLoadingFetchBoxFeedback: true,
        isFetchBoxFeedbackSuccess: false
      });

    case FULFILLED_TYPE(SHOP_ACTION_TYPE.FETCH_FEEDBACK_BOXES):
      return Object.assign({}, state, {
        boxFeedback: Object.assign({}, state.boxFeedback, {
          [objectToHash(action.meta)]: action.payload
        }),
        isFetchBoxFeedbackSuccess: true,
        isLoadingFetchBoxFeedback: false
      });

    case REJECTED_TYPE(SHOP_ACTION_TYPE.FETCH_FEEDBACK_BOXES):
      return Object.assign({}, state, {
        isFetchBoxFeedbackSuccess: false,
        isLoadingFetchBoxFeedback: false
      });

    case PENDING_TYPE(SHOP_ACTION_TYPE.FETCH_SAVING_SETS_BOXES):
      return Object.assign({}, state, { isFetchSavingSetsSuccess: false });

    case FULFILLED_TYPE(SHOP_ACTION_TYPE.FETCH_SAVING_SETS_BOXES):
      boxSavingSets[objectToHash(action.meta)] = action.payload;

      return Object.assign({}, state, {
        boxSavingSets,
        isFetchSavingSetsSuccess: true
      });

    case REJECTED_TYPE(SHOP_ACTION_TYPE.FETCH_SAVING_SETS_BOXES):
      return Object.assign({}, state, { isFetchSavingSetsSuccess: false });

    ///

    case PENDING_TYPE(SHOP_ACTION_TYPE.FETCH_FEEDBACK_PICTURE):
      boxFeedbackPicture[stringToHash(action.meta.productId)] = [];
      return Object.assign({}, state, {
        isFetchBoxFeedbackPicture: true,
        boxFeedbackPicture
      });

    case FULFILLED_TYPE(SHOP_ACTION_TYPE.FETCH_FEEDBACK_PICTURE):
      boxFeedbackPicture[stringToHash(action.meta.productId)] = action.payload.pictures;
      return Object.assign({}, state, {
        boxFeedbackPicture,
        isFetchBoxFeedbackPicture: false
      });

    case REJECTED_TYPE(SHOP_ACTION_TYPE.FETCH_FEEDBACK_PICTURE): {
      boxFeedbackPicture[stringToHash(action.meta.productId)] = [];
      return Object.assign({}, state, {
        boxFeedbackPicture,
        isFetchBoxFeedbackPicture: false
      });
    }

    ///

    case PENDING_TYPE(SHOP_ACTION_TYPE.FETCH_MAGAZINES_BOXES):
      return Object.assign({}, state, { isFetchMagazinesSuccess: false });

    case FULFILLED_TYPE(SHOP_ACTION_TYPE.FETCH_MAGAZINES_BOXES):
      boxMagazines[objectToHash(action.meta)] = action.payload;

      return Object.assign({}, state, {
        boxMagazines,
        isFetchMagazinesSuccess: true
      });

    case REJECTED_TYPE(SHOP_ACTION_TYPE.FETCH_MAGAZINES_BOXES):
      return Object.assign({}, state, { isFetchMagazinesSuccess: false });

    // FETCH RELATED BOXES
    case PENDING_TYPE(SHOP_ACTION_TYPE.FETCH_RELATED_BOXES):
      return Object.assign({}, state, { isFetchRelatedSuccess: false });

    case FULFILLED_TYPE(SHOP_ACTION_TYPE.FETCH_RELATED_BOXES):
      const tmpBoxRelated = {
        [objectToHash(action.meta)]: action.payload.boxes
      };

      return Object.assign({}, state, {
        boxRelated: Object.assign({}, boxRelated, tmpBoxRelated),
        isFetchRelatedSuccess: true
      });

    case REJECTED_TYPE(SHOP_ACTION_TYPE.FETCH_RELATED_BOXES):
      return Object.assign({}, state, { isFetchRelatedSuccess: false });
    // END FETCH RELATED BOXES

    // FECTH_DATA_HOT_DEAL
    case PENDING_TYPE(SHOP_ACTION_TYPE.FECTH_DATA_HOT_DEAL):
      return Object.assign({}, state, {
        hotDeal: {},
        hotDeals: Object.assign({}, state.hotDeals, {
          fetching: true,
          errored: false
        })
      });

    case FULFILLED_TYPE(SHOP_ACTION_TYPE.FECTH_DATA_HOT_DEAL):
      return Object.assign({}, state, {
        hotDeal: action.payload,
        hotDeals: Object.assign({}, state.hotDeals, {
          fetching: false,
          loaded: true,
          index: action.payload.boxes || [],
          paging: action.payload.paging || null
        })
      });

    case REJECTED_TYPE(SHOP_ACTION_TYPE.FECTH_DATA_HOT_DEAL):
      return Object.assign({}, state, {
        hotDeal: {},
        hotDeals: Object.assign({}, state.hotDeals, {
          fetching: false,
          errored: true
        })
      });
    // END FECTH_DATA_HOT_DEAL

    case SHOP_ACTION_TYPE.CLEAR_DATA_HOT_DEAL:
      return Object.assign({}, state, {
        hotDeal: []
      });

    // FETCH_MAKEUPS
    case PENDING_TYPE(SHOP_ACTION_TYPE.FETCH_MAKEUPS):
      return Object.assign({}, state, {
        makeups: []
      });

    case FULFILLED_TYPE(SHOP_ACTION_TYPE.FETCH_MAKEUPS):
      return Object.assign({}, state, {
        makeups: action.payload.makeups
      });

    case REJECTED_TYPE(SHOP_ACTION_TYPE.FETCH_MAKEUPS):
      return Object.assign({}, state, {
        makeups: []
      });
    // END FETCH_MAKEUPS

    // FETCH_STORE_BOXES
    case PENDING_TYPE(SHOP_ACTION_TYPE.FETCH_STORE_BOXES):
      return state;

    case FULFILLED_TYPE(SHOP_ACTION_TYPE.FETCH_STORE_BOXES):
      return Object.assign({}, state, {
        storeBoxes: action.payload.store_boxes
      });

    case REJECTED_TYPE(SHOP_ACTION_TYPE.FETCH_STORE_BOXES):
      return Object.assign({}, state, {
        storeBoxes: []
      });
    // END FETCH_STORE_BOXES

    // FETCH_BOXES_CATEGORIES
    case PENDING_TYPE(SHOP_ACTION_TYPE.FETCH_BOXES_CATEGORIES):
      return Object.assign({}, state, {
        boxesCategories: [],
        isFetchBoxesCategoriesSuccess: false
      });

    case FULFILLED_TYPE(SHOP_ACTION_TYPE.FETCH_BOXES_CATEGORIES):
      return Object.assign({}, state, {
        boxesCategories: action.payload.categories,
        isFetchBoxesCategoriesSuccess: true
      });

    case REJECTED_TYPE(SHOP_ACTION_TYPE.FETCH_BOXES_CATEGORIES):
      return Object.assign({}, state, {
        boxesCategories: [],
        isFetchBoxesCategoriesSuccess: false
      });
    // END FETCH_BOXES_CATEGORIES

    case PENDING_TYPE(SHOP_ACTION_TYPE.FETCH_REDEEM_SPECIAL_BOXES):
      return Object.assign({}, state, {
        redeemable: Object.assign({}, state.redeemable, {
          special: Object.assign({}, state.redeemable.special, {
            fetching: true,
            errored: false
          })
        })
      });

    case FULFILLED_TYPE(SHOP_ACTION_TYPE.FETCH_REDEEM_SPECIAL_BOXES):
      return Object.assign({}, state, {
        redeemable: Object.assign({}, state.redeemable, {
          special: Object.assign(
            {},
            upsertPage({
              pageable: state.redeemable.special,
              entries: action.payload.boxes,
              page: action.payload.paging.current_page || 1,
              perPage: action.payload.paging.per_page || 25,
              totalPages: action.payload.paging.total_pages
            }),
            {
              fetching: false,
              loaded: true
            }
          )
        })
      });

    case REJECTED_TYPE(SHOP_ACTION_TYPE.FETCH_REDEEM_SPECIAL_BOXES):
      return Object.assign({}, state, {
        redeemable: Object.assign({}, state.redeemable, {
          special: Object.assign({}, state.redeemable.special, {
            fetching: false,
            errored: true
          })
        })
      });

    case PENDING_TYPE(SHOP_ACTION_TYPE.FETCH_REDEEM_USER_BOXES):
      return Object.assign({}, state, {
        redeemable: Object.assign({}, state.redeemable, {
          user: Object.assign({}, state.redeemable.user, {
            fetching: true,
            errored: false
          })
        })
      });

    case FULFILLED_TYPE(SHOP_ACTION_TYPE.FETCH_REDEEM_USER_BOXES):
      return Object.assign({}, state, {
        redeemable: Object.assign({}, state.redeemable, {
          user: Object.assign(
            {},
            upsertPage({
              pageable: state.redeemable.user,
              entries: action.payload.boxes,
              page: action.payload.paging.current_page || 1,
              perPage: action.payload.paging.per_page || 25,
              totalPages: action.payload.paging.total_pages
            }),
            {
              fetching: false,
              loaded: true
            }
          )
        })
      });

    case REJECTED_TYPE(SHOP_ACTION_TYPE.FETCH_REDEEM_USER_BOXES):
      return Object.assign({}, state, {
        redeemable: Object.assign({}, state.redeemable, {
          user: Object.assign({}, state.redeemable.user, {
            fetching: false,
            errored: true
          })
        })
      });

    case PENDING_TYPE(SHOP_ACTION_TYPE.FETCH_REDEEM_LATEST_BOXES):
      return Object.assign({}, state, {
        redeemable: Object.assign({}, state.redeemable, {
          latest: Object.assign({}, state.redeemable.latest, {
            fetching: true,
            errored: false
          })
        })
      });

    case FULFILLED_TYPE(SHOP_ACTION_TYPE.FETCH_REDEEM_LATEST_BOXES):
      return Object.assign({}, state, {
        redeemable: Object.assign({}, state.redeemable, {
          latest: Object.assign(
            {},
            upsertPage({
              pageable: state.redeemable.latest,
              entries: action.payload.boxes,
              page: action.payload.paging.current_page || 1,
              perPage: action.payload.paging.per_page || 25,
              totalPages: action.payload.paging.total_pages
            }),
            {
              fetching: false,
              loaded: true
            }
          )
        })
      });

    case REJECTED_TYPE(SHOP_ACTION_TYPE.FETCH_REDEEM_LATEST_BOXES):
      return Object.assign({}, state, {
        redeemable: Object.assign({}, state.redeemable, {
          latest: Object.assign({}, state.redeemable.latest, {
            fetching: false,
            errored: true
          })
        })
      });

    // FECTH_RECOMMENDATION_BOX
    case PENDING_TYPE(SHOP_ACTION_TYPE.FECTH_RECOMMENDATION_BOX):
      return Object.assign({}, state, {
        isFetchRecommendationBox: true
      });

    case FULFILLED_TYPE(SHOP_ACTION_TYPE.FECTH_RECOMMENDATION_BOX): {
      const boxes = action.payload.boxes;
      const current = action.payload.paging && action.payload.paging.current_page;

      let combinedRecommendationBox: any = [];

      switch (current) {
        case 0:
          combinedRecommendationBox = [];
          break;

        case 1:
          combinedRecommendationBox = boxes;
          break;

        case recommendationBoxPageIndex + 1:
          combinedRecommendationBox = [...recommendationBox, ...boxes];
          break;

        default:
          combinedRecommendationBox = [];
      }

      return Object.assign({}, state, {
        recommendationBoxPaging: action.payload.paging,
        recommendationBox: combinedRecommendationBox,
        recommendationBoxPageIndex: recommendationBoxPageIndex + 1,
        isFetchRecommendationBox: false
      });
    }

    case REJECTED_TYPE(SHOP_ACTION_TYPE.FECTH_RECOMMENDATION_BOX):
      return Object.assign({}, state, {
        isFetchRecommendationBox: false
      });
    // END FECTH_RECOMMENDATION_BOX

    // CLEAR DATA PRODUCT BY CATEGORY
    case SHOP_ACTION_TYPE.CLEAR_DATA_PRODUCT_BY_CATEGORY:
      return Object.assign({}, state, {
        productByCategory: {},
        availableFilters: {}
      });
    // END CLEAR DATA PRODUCT BY CATEGORY

    // CLEAR DATA BOX DETAIL
    case SHOP_ACTION_TYPE.CLEAR_DATA_PRODUCT_DETAIL:
      return Object.assign({}, state, {
        productDetailSummary: {},
        productDetail: {},
        productDetailsFetching: [],
        productDetailsLoaded: [],
        productDetailsErrored: [],
        boxRelated: {},
        boxSavingSets: {},
        boxMagazines: {},
        boxFeedback: {},
        storeBoxes: []
      });
    // END CLEAR DATA BOX DETAIL

    //REVIEWABLE BOXES
    case PENDING_TYPE(SHOP_ACTION_TYPE.FETCH_REVIEWABLE_BOXES):
      return Object.assign({}, state, {
        boxFeedbackable: {
          slug: action.payload?.box?.slug || '',
          fetching: true,
          loaded: false,
          errored: false
        }
      });

    case FULFILLED_TYPE(SHOP_ACTION_TYPE.FETCH_REVIEWABLE_BOXES):
      const { payload } = action;
      return Object.assign({}, state, {
        boxFeedbackable: {
          slug: action.payload?.box?.slug || '',
          canReview: payload?.can_review,
          reviewed: payload?.is_reviewed,
          fetching: false,
          loaded: true,
          errored: false
        }
      });

    case REJECTED_TYPE(SHOP_ACTION_TYPE.FETCH_REVIEWABLE_BOXES):
      return Object.assign({}, state, {
        boxFeedbackable: {
          slug: action.payload?.box?.slug || '',
          fetching: false,
          loaded: false,
          errored: true
        }
      });

    case PENDING_TYPE(SHOP_ACTION_TYPE.LIKE_A_FEEDBACK): {
      return Object.assign({}, state, {
        likeAFeedback: Object.assign({}, state.likeAFeedback, {
          [action.meta.feedbackId]: {
            processing: true,
            processed: false,
            errored: false
          }
        })
      });
    }
    case FULFILLED_TYPE(SHOP_ACTION_TYPE.LIKE_A_FEEDBACK): {
      // Find key
      let targetKey = null;
      Object.keys(state.boxFeedback).every((key) => {
        if (state.boxFeedback[key]?.feedbacks?.find((feedback) => feedback?.id === action.meta.feedbackId)) {
          targetKey = key;
          return false;
        }

        return true;
      });

      // Update like state for the target key
      let newBoxFeedbackKeyFeedbacksState = [];
      if (targetKey) {
        newBoxFeedbackKeyFeedbacksState = state.boxFeedback[targetKey]?.feedbacks.map((feedback) =>
          feedback.id === action.meta.feedbackId
            ? Object.assign({}, feedback, {
                liked: true,
                total_likes: action.payload?.total_likes || 1
              })
            : feedback
        );
      }

      return Object.assign({}, state, {
        likeAFeedback: Object.assign({}, state.likeAFeedback, {
          [action.meta.feedbackId]: {
            processing: false,
            processed: true,
            errored: false
          }
        }),
        boxFeedback: Object.assign({}, state.boxFeedback, {
          [targetKey]: Object.assign({}, state.boxFeedback[targetKey], {
            feedbacks: newBoxFeedbackKeyFeedbacksState
          })
        })
      });
    }
    case REJECTED_TYPE(SHOP_ACTION_TYPE.LIKE_A_FEEDBACK): {
      return Object.assign({}, state, {
        likeAFeedback: Object.assign({}, state.likeAFeedback, {
          [action.meta.feedbackId]: {
            processing: false,
            processed: false,
            errored: true
          }
        })
      });
    }

    case PENDING_TYPE(SHOP_ACTION_TYPE.UNLIKE_A_FEEDBACK): {
      return Object.assign({}, state, {
        unlikeAFeedback: Object.assign({}, state.unlikeAFeedback, {
          [action.meta.feedbackId]: {
            processing: true,
            processed: false,
            errored: false
          }
        })
      });
    }

    case FULFILLED_TYPE(SHOP_ACTION_TYPE.UNLIKE_A_FEEDBACK): {
      // Find key
      let targetKey = null;
      Object.keys(state.boxFeedback).every((key) => {
        if (state.boxFeedback[key]?.feedbacks?.find((feedback) => feedback?.id === action.meta.feedbackId)) {
          targetKey = key;
          return false;
        }

        return true;
      });

      // Update like state for the target key
      let newBoxFeedbackKeyFeedbacksState = [];
      if (targetKey) {
        newBoxFeedbackKeyFeedbacksState = state.boxFeedback[targetKey]?.feedbacks.map((feedback) =>
          feedback.id === action.meta.feedbackId
            ? Object.assign({}, feedback, {
                liked: false,
                total_likes: action.payload?.total_likes || 0
              })
            : feedback
        );
      }

      return Object.assign({}, state, {
        unlikeAFeedback: Object.assign({}, state.unlikeAFeedback, {
          [action.meta.feedbackId]: {
            processing: false,
            processed: true,
            errored: false
          }
        }),
        boxFeedback: Object.assign({}, state.boxFeedback, {
          [targetKey]: Object.assign({}, state.boxFeedback[targetKey], {
            feedbacks: newBoxFeedbackKeyFeedbacksState
          })
        })
      });
    }

    case REJECTED_TYPE(SHOP_ACTION_TYPE.UNLIKE_A_FEEDBACK): {
      return Object.assign({}, state, {
        unlikeAFeedback: Object.assign({}, state.unlikeAFeedback, {
          [action.meta.feedbackId]: {
            processing: false,
            processed: false,
            errored: true
          }
        })
      });
    }

    default:
      return state;
  }
}

export default shopReducer;
