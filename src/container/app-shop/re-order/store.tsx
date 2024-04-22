import { ConnectedProps, connect } from 'react-redux';
import { fetchGroupsByIdAction } from '../../../flows/group/action';
import { openModalAction } from '../../../flows/modal/action';
import { likeProductAction, UnLikeProductAction as unLikeProductAction } from '../../../flows/like/action';
import { addItemToCartAction } from '../../../flows/cart/action';
import { RootState } from 'types/redux';
import ReorderContainer from './container';

const mapStateToProps = (state: RootState) => ({
  groupStore: state.group,
  likedIdList: state.like.liked.id
});

const mapDispatchToProps = {
  fetchGroupsByIdAction,
  openModalAction,
  likeProductAction,
  unLikeProductAction,
  addItemToCartAction
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(ReorderContainer);
