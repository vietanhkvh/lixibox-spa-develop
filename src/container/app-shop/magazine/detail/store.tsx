import { connect } from 'react-redux';

import {
  fetchMagazineListAction,
  clearDataMagazineAction,
  fetchMagazineBySlugAction,
  fetchMagazineDashboardAction,
  fetchMagazineRelatedBlogAction
} from '../../../../flows/magazine/action';
import { openModalAction } from '../../../../flows/modal/action';
import { updateMetaInfoAction } from '../../../../flows/meta/action';
import { likeProductAction, UnLikeProductAction } from '../../../../flows/like/action';

import MagazineDetailContainer from './container';

const mapStateToProps = (state) => ({
  magazineStore: state.magazine,
  authStore: state.auth,
  likedIdList: state.like.liked.id
});

const mapDispatchToProps = (dispatch) => ({
  openModalAction: (data) => dispatch(openModalAction(data)),
  updateMetaInfoAction: (data) => dispatch(updateMetaInfoAction(data)),
  clearDataMagazineAction: () => dispatch(clearDataMagazineAction()),
  fetchMagazineDashboard: () => dispatch(fetchMagazineDashboardAction()),
  likeProductAction: (productId) => dispatch(likeProductAction(productId)),
  unLikeProductAction: (productId) => dispatch(UnLikeProductAction(productId)),
  fetchMagazineBySlug: ({ slug }) => dispatch(fetchMagazineBySlugAction({ slug })),
  fetchMagazineRelatedBlog: ({ slug }) => dispatch(fetchMagazineRelatedBlogAction({ slug })),
  fetchMagazineList: ({ page, perPage, type }) => dispatch(fetchMagazineListAction({ page, perPage, type }))
});

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(MagazineDetailContainer);
