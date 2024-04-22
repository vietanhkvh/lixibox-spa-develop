import { PureComponent } from 'react';

import { isMobileVersion } from '../../../../utils/responsive';
import { NEW_PRODUCT_PARAMS } from '../../../../constants/application/product';
import { MAGAZINE_COMMUNITY_PARAMS } from '../../../../constants/application/magazine';
import { SIGN_IN_STATE } from '../../../../constants/application/global';

import renderView from './view';
import { IProps, IState } from './model';
import { DEFAULT_PROPS } from './initialize';

class CommunityPanelContainer extends PureComponent<IProps, IState> {
  static defaultProps: IProps = DEFAULT_PROPS;

  componentDidMount() {
    const {
      days,
      authStore,
      fetchMagazineListAction,
      fetchCommunityHashtagsAction,
      fetchHomeProductByCategoryAction,
      fetchUserBoxesToFeedbackAction,
      fetchUserFeedbacksAction
    } = this.props;

    fetchCommunityHashtagsAction({ days });
    if (!isMobileVersion()) {
      fetchHomeProductByCategoryAction({
        categoryId: NEW_PRODUCT_PARAMS.idCategory,
        limit: 5
      });
      fetchMagazineListAction(MAGAZINE_COMMUNITY_PARAMS);
    }

    if (!isMobileVersion()) {
      window.addEventListener('scroll', this.handleScroll.bind(this));
    }

    const isLogin = SIGN_IN_STATE.LOGIN_SUCCESS === authStore.signInStatus;

    if (!!isLogin) {
      setTimeout(() => {
        /** no priority */
        fetchUserBoxesToFeedbackAction({ page: 1, perPage: 30 });
        const paramFeedbackeds = { page: 1, perPage: 50 };
        fetchUserFeedbacksAction(paramFeedbackeds);
      }, 1000);
    }
  }

  renderSticky(elementId, isRightElement = false) {
    const stickElement = document.getElementById(elementId);
    if (!stickElement) {
      /** Not found element */
      return;
    }
    const SCROLLING_PADDING = isRightElement ? 100 : 80;
    const positionBeginSticky = (!!stickElement.parentElement && stickElement.parentElement.offsetTop) || null;

    if (!positionBeginSticky) {
      /** Can not calculate position */
      return;
    }

    let windowScrollY = window.scrollY;

    if (windowScrollY >= positionBeginSticky - SCROLLING_PADDING) {
      if (stickElement.style.position !== 'fixed') {
        const offetWidth = stickElement.offsetWidth;
        stickElement.style.position = 'fixed';
        stickElement.style.top = `${SCROLLING_PADDING}px`;
        stickElement.style.width = offetWidth + 'px';
        if (!isRightElement) stickElement.style.marginTop = '30px';
      }
    } else {
      if (stickElement.style.position === 'fixed') {
        stickElement.style.position = '';
        stickElement.style.top = '';
        stickElement.style.width = '';
        if (isRightElement) stickElement.style.marginTop = '0px';
      }
    }
  }

  handleScroll() {
    this.renderSticky('desktop-community-left-sticky');
    this.renderSticky('desktop-community-right-sticky', true);
  }

  componentWillUnmount() {
    this.props.clearDataCommunityHashtagsAction();
    this.props.clearDataCommunityHashtagFeedsAction();

    if (!isMobileVersion()) {
      this.props.clearDataMagazineListAction();
      this.props.clearDataProductByCategoryAction();
    }
  }

  render() {
    return renderView(this.props);
  }
}

export default CommunityPanelContainer;
