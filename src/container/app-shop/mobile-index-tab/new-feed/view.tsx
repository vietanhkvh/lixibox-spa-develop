import FeedList from '../../../../components/container/feed-list';
import SubmitButton from '../../../../components/ui/submit-button';

import STYLE from './style';
import { INewFeedProps } from './model';

export function renderComponent({ props, handleSubmit }) {
  const {
    activityFeedStore,
    authStore: { profile },
    history
  } = props as INewFeedProps;

  const feedListProps = {
    history,
    list: (activityFeedStore && activityFeedStore.list) || [],
    userProfile: profile
  };

  const buttonSubmitProps = {
    title: 'Xem thêm',
    style: STYLE.btnWrap.btn,
    onSubmit: handleSubmit
  };

  return (
    <div style={STYLE}>
      <div key="home-page-wrap" className={'wrapLayout'}>
        <FeedList {...feedListProps} />
      </div>
      {activityFeedStore && activityFeedStore.list && 0 !== activityFeedStore.list.length && (
        <div style={STYLE.btnWrap}>
          <SubmitButton {...buttonSubmitProps} />
        </div>
      )}
    </div>
  );
}
