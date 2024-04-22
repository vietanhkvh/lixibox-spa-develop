import STYLE from './style';
import { IProps } from './model';
import { renderMainContainer } from './view-general';

function renderMobile({ props, state, openFeedDetail }) {
  const {
    match: {
      params: { collectionId }
    },
    activityFeedStore: {
      collection: { detail }
    },
    authStore: { profile }
  } = props as IProps;

  const { feedActiveId } = state;

  const collectionDetail = detail && detail[collectionId];

  return (
    <div style={STYLE.mobileWrapLayout}>
      {renderMainContainer({
        collectionDetail,
        profile,
        feedActiveId,
        openFeedDetail
      })}
    </div>
  );
}

export default renderMobile;
