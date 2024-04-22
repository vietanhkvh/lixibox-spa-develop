import Icon from 'components/ui/icon';
import SubmitButton from 'components/ui/submit-button';
import { MEMBERSHIP_LEVEL_TYPE } from 'constants/application/membership_level';
import MobileAutoDisplayHeader from 'presentation-component/general/mobile-auto-display-header';
import MobileScreenHeader from 'presentation-component/general/mobile-screen-header';
import { ROUTING_REDEEM_PATH } from 'routings/path';
import { numberFormat } from 'utils/format';
import { mergeStyle } from 'utils/responsive';
import { isMobileVersion } from 'utils/responsive';
import { CDN_ASSETS_PREFIX } from 'utils/uri';
import WrapLayout from '../../../layout/wrap';
import Image from 'presentation-component/ui/image';

import { FAQ_LIST_MEMBERSHIP, FAQ_LIST_LIXICOIN } from './initialize';
import { IProps, IState } from './model';
import STYLE from './style';
import style from './style.module.scss';

const BG_LIXICOIN = CDN_ASSETS_PREFIX('/lixicoin/faq-bg.jpg');

export const renderHeading = () => {
  const messageIconProps = {
    name: 'message-faq',
    style: STYLE.header.messageIcon,
    innerStyle: STYLE.header.messageInnerIcon
  };

  return (
    <div style={STYLE.header.container}>
      <div style={mergeStyle(STYLE.header.cover, { background: `url("${BG_LIXICOIN}")` })}></div>
      <WrapLayout>
        <div style={STYLE.header.content}>
          <Icon {...messageIconProps} />
          <div style={STYLE.header.info}>
            <div style={STYLE.header.title}>{`Hỏi đáp về Lixicoin`}</div>
            <div style={STYLE.header.description}>{`Giải đáp các thông tin, thắc mắc về Lixicoin`}</div>
          </div>
        </div>
      </WrapLayout>
    </div>
  );
};

function renderCollapseItem(item) {
  const isCollapseOpen = this.collapseOpenId.indexOf(item.id) >= 0;
  const itemProps = { style: STYLE.faq.item };

  const headerProps = {
    style: Object.assign({}, STYLE.faq.item.header, isCollapseOpen && STYLE.faq.item.header.open),
    onClick: () => {
      this.handleCollapseItemClick(item.id);
    }
  };

  const iconProps = {
    style: Object.assign({}, STYLE.faq.item.icon, isCollapseOpen && STYLE.faq.item.openIcon),
    innerStyle: STYLE.faq.item.innerIcon,
    name: 'angle-down'
  };

  const contentProps = {
    style: Object.assign(
      {},
      STYLE.faq.item.content,
      isCollapseOpen && STYLE.faq.item.openContent,
      !!item?.img?.src && { padding: 0 }
    )
  };

  return (
    <div {...itemProps}>
      <div {...headerProps}>
        <div style={STYLE.faq.item.title}>{item && item.title}</div>
        <Icon {...iconProps} />
      </div>
      <div {...contentProps}>
        {!!item.content && item.content.map((item) => <div style={STYLE.faq.item.contentItem}>{item}</div>)}
        {!!item.html && item.html()}
        {!!item.img && (
          <div className={style.imageWrapper}>
            {' '}
            <Image className={style.image} src={item?.img?.src} />
          </div>
        )}
      </div>
    </div>
  );
}

const levelInfo = ({ id, level, withBorder = false }) => {
  if (!level) return null;

  return (
    <div key={`levelInfo-${id}`} style={mergeStyle(STYLE.sidebar.levelItem)}>
      <div style={STYLE.sidebar.levelBoldTitle}>{numberFormat(level.point)}</div>
      <div style={STYLE.sidebar.levelTitle}>{`điểm thành viên`}</div>
      <Image alt={''} style={STYLE.sidebar.levelImage} src={level.image} />
    </div>
  );
};

const RedeemLink = () => {
  const redeemProps = {
    icon: 'gift',
    type: 'link',
    link: ROUTING_REDEEM_PATH,
    color: 'black',
    style: STYLE.sidebar.buttonLink,
    title: 'Đổi quà ngay với Lixicoin',
    styleIcon: STYLE.sidebar.giftIcon
  };

  return (
    <div style={STYLE.sidebar.buttonLinkPanel}>
      <SubmitButton {...redeemProps} />
    </div>
  );
};

const LevelInfoBlock = ({ membershipInfo }) => {
  if (!membershipInfo) return null;

  const combinedMembershipData = membershipInfo.map((membershipLevel) => ({
    ...MEMBERSHIP_LEVEL_TYPE[membershipLevel.level],
    point: membershipLevel?.required_coins
  }));

  return (
    <div style={STYLE.sidebar.block}>
      <div style={STYLE.sidebar.content}>
        <div style={STYLE.sidebar.boldText}>{`Hướng dẫn tích lũy Lixicoin`}</div>
        <div style={STYLE.sidebar.text}>
          {`Bạn cần tích lũy điểm thành viên để đạt được`}
          <br /> {`Hạng thành viên theo quy định`}
        </div>

        <div style={STYLE.sidebar.levelList}>
          {levelInfo({ id: 1, level: combinedMembershipData[1], withBorder: true })}
          {levelInfo({ id: 2, level: combinedMembershipData[2], withBorder: true })}
          {levelInfo({ id: 3, level: combinedMembershipData[3] })}
        </div>
      </div>
    </div>
  );
};

const renderFaQ = (header = '', list, collapseOpenId, handleCollapseItemClick) => (
  <div style={STYLE.main} className={style.main}>
    {header && <div className={style.header}>{header}</div>}
    <div style={STYLE.faq.container}>
      {Array.isArray(list) && list.map(renderCollapseItem, { collapseOpenId, handleCollapseItemClick })}
    </div>
  </div>
);

const renderView = (
  { lixicoinStore }: IProps,
  { collapseOpenId }: IState,
  handleCollapseItemClick,
  lixicoinPerFeedback,
  unboxingReward,
  referralReward,
  isLixicoinFaqView
) => {
  const { membershipInfo } = lixicoinStore;

  return (
    <div style={STYLE.container}>
      {/* {renderHeading()} */}
      {!!isMobileVersion() && (
        <MobileAutoDisplayHeader row={1}>
          <MobileScreenHeader title={'Câu hỏi thường gặp'} />
        </MobileAutoDisplayHeader>
      )}

      <WrapLayout style={STYLE.wrap}>
        <div style={STYLE.sidebar.container}>
          <LevelInfoBlock membershipInfo={membershipInfo} />
          <RedeemLink />
        </div>

        <div className={style.wrapperFAQ}>
          {isLixicoinFaqView &&
            renderFaQ(
              'Thông tin về Lixicoin',
              FAQ_LIST_LIXICOIN({ lixicoinPerFeedback, unboxingReward, referralReward }),
              collapseOpenId,
              handleCollapseItemClick
            )}
          {!isLixicoinFaqView &&
            renderFaQ('Thông tin về điểm thành viên', FAQ_LIST_MEMBERSHIP, collapseOpenId, handleCollapseItemClick)}
        </div>
      </WrapLayout>
    </div>
  );
};
export default renderView;
