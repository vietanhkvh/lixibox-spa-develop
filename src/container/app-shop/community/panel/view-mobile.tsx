import { ROUTING_COMMUNITY_USER_FEED_PATH } from '../../../../routings/path';
import { AppShopCommunitySwitchRouting } from '../../../../routings/router';
import WrapLayout from '../../../layout/wrap';

import { renderUserCover } from './view-general';
import { IProps } from './model';
import STYLE from './style';

const renderView = (props: IProps) => {
  const {
    location,
    activityFeedStore: { userInfo },
    cartStore: {
      constants: { unboxing_enabled: unboxingEnabled }
    }
  } = props;

  const IS_SHOW_USER_COVER = location.pathname.indexOf(ROUTING_COMMUNITY_USER_FEED_PATH) >= 0;

  return (
    <div className={'community-panel-container'} style={STYLE.mobileWrap}>
      {!!IS_SHOW_USER_COVER && renderUserCover({ userInfo, unboxingEnabled })}
      <WrapLayout>
        <AppShopCommunitySwitchRouting />
      </WrapLayout>
    </div>
  );
};

export default renderView;
