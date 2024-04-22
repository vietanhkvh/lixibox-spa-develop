import { NavLink } from 'react-router-dom';

import WrapLayout from '../../../layout/wrap';
import { formatDateTime } from '../../../../utils/date-time';
import { DATETIME_FORMAT_TYPE } from '../../../../constants/application/global';
import { isMobileVersion } from '../../../../utils/responsive';
import { CDN_ASSETS_PREFIX } from '../../../../utils/uri';
import { ROUTING_LIXI_COIN } from '../../../../routings/path';
import SeparateLine from '../../../../presentation-component/ui/separate-line';
import Image from 'presentation-component/ui/image';

import STYLE from './style';

export const renderCover = () => (
  <div style={STYLE.bannerImage}>
    <div style={STYLE.bannerImage.wrapTitle}>
      <div style={STYLE.bannerImage.wrapTitle.largeTitle}>LIXI COMMUNITY</div>
      <div style={STYLE.bannerImage.wrapTitle.title}>Cộng đồng chia sẻ kiến thức làm đẹp</div>
    </div>
  </div>
);

export const renderUserCover = ({ userInfo, unboxingEnabled }) => {
  const { info, isLoading } = userInfo;

  if (!!isLoading) {
    return (
      <WrapLayout>
        <div style={STYLE.userCover.placeholder.container}>
          <div className={'ani-bg'} style={STYLE.userCover.placeholder.avatar} />
          <div style={STYLE.userCover.placeholder.info}>
            <div className={'ani-bg'} style={STYLE.userCover.placeholder.name} />
            <div className={'ani-bg'} style={STYLE.userCover.placeholder.text} />
            <div className={'ani-bg'} style={STYLE.userCover.placeholder.text} />
          </div>
        </div>
      </WrapLayout>
    );
  }

  if (!info) {
    return null;
  }

  return (
    <div style={STYLE.userCover.container}>
      <div style={STYLE.userCover.outerBg}>
        {renderUserCoverBackground({ info })}
        <div style={STYLE.userCover.gradientOverlay} />
      </div>

      <WrapLayout style={STYLE.userCover.infoGroup}>
        {renderUserAvatar({ info })}
        {renderUserInfo({ info, unboxingEnabled })}
      </WrapLayout>
    </div>
  );
};

const renderUserCoverBackground = ({ info }) => (
  <div
    style={Object.assign({}, STYLE.userCover.blurBackground, {
      backgroundImage: `url("${!!info.avatar && info.avatar.large_url}")`
    })}
  />
);

const renderUserAvatar = ({ info }) => (
  <div style={STYLE.userCover.avatar.container}>
    <Image alt={''} style={STYLE.userCover.avatar.image} src={info.avatar && info.avatar.large_url} />
  </div>
);

const renderUserInfo = ({ info, unboxingEnabled }) => {
  return (
    <>
      <div style={STYLE.userCover.info.container}>
        <div style={STYLE.userCover.info.name}>{info.name}</div>
        {renderInfoProvince({ info })}
        {renderLevel({ info })}
        {renderInfoStat({ info, unboxingEnabled })}
      </div>
      {!!isMobileVersion() && <SeparateLine />}
    </>
  );
};

const LEVEL = [
  CDN_ASSETS_PREFIX('/lixicoin/level-member.png'),
  CDN_ASSETS_PREFIX('/lixicoin/level-silver.png'),
  CDN_ASSETS_PREFIX('/lixicoin/level-gold.png'),
  CDN_ASSETS_PREFIX('/lixicoin/level-diamond.png')
];

const renderLevel = ({ info }) => {
  const level = info.membership_level;
  if (level >= LEVEL.length || level < 0) return null;

  return (
    <div style={STYLE.level.outer}>
      <NavLink to={ROUTING_LIXI_COIN} style={STYLE.level}>
        <Image src={LEVEL[level]} style={STYLE.level.img} alt={''} />
      </NavLink>
    </div>
  );
};

const renderInfoProvince = ({ info }) => {
  return (
    <div style={STYLE.userCover.infoProvince.container}>
      {!!info.province && <div style={STYLE.userCover.infoProvince.info}>{`${info.province.name} - `}</div>}
      {!!info.created_at && (
        <div
          style={STYLE.userCover.infoProvince.info}
          title={formatDateTime(info.created_at, DATETIME_FORMAT_TYPE.FULL_INFO)}
        >
          {'Tham gia '}
          {formatDateTime(info.created_at, DATETIME_FORMAT_TYPE.DD_MM_YYYY)}
        </div>
      )}
    </div>
  );
};

const renderInfoStat = ({ info, unboxingEnabled }) => {
  return (
    <div style={STYLE.userCover.infoStat.container}>
      {renderInfoItem({
        title: 'Bài viết',
        value: info.feed_count
      })}
      {!!unboxingEnabled && (
        <>
          <div style={STYLE.userCover.infoItem.line} />
          {renderInfoItem({
            title: 'Đập hộp',
            value: info.unboxing_count
          })}
        </>
      )}
      <div style={STYLE.userCover.infoItem.line} />
      {renderInfoItem({
        title: 'Đánh giá',
        value: info.feed_count
      })}
    </div>
  );
};

const renderInfoItem = ({ title, value }) => {
  return (
    <div style={Object.assign({}, STYLE.userCover.infoItem.container)}>
      <div style={STYLE.userCover.infoItem.title}>{value}</div>
      <div style={STYLE.userCover.infoItem.text}>{title}</div>
    </div>
  );
};
