import Icon from 'components/ui/icon';
import { mergeStyle } from 'utils/responsive';
import { MEMBERSHIP_LEVEL_TYPE } from 'constants/application/membership_level';
import { MembershipLevel } from 'flows/lixicoin/types';
import { MemberBenefits } from 'constants/application/user';

import GeneralBlock from '../general-block';
import * as STYLE from './style';

const MemberLevelTitle = ({ membershipLevel, membershipInfo, style = {} }) => {
  if (!membershipLevel || !membershipInfo?.[membershipLevel]) return null;

  const memberShipLevelTitle = membershipInfo?.[membershipLevel].presentation;
  const memberShipLevelColor = MEMBERSHIP_LEVEL_TYPE[membershipLevel].color;

  const containerProps = {
    style: mergeStyle(STYLE.memberLevel, { color: memberShipLevelColor }, style)
  };

  return <div {...containerProps}>{memberShipLevelTitle}</div>;
};

const CheckIconItem = ({ icon, color }) => {
  if (!icon) return null;

  const iconProps = {
    name: 'check-bold',
    style: mergeStyle(STYLE.benefitItem.checkIcon, { color }),
    innerStyle: STYLE.benefitItem.innerCheckIcon
  };

  return <Icon {...iconProps} />;
};

const TextItem = ({ text, color }) => {
  if (!text) return null;

  return <div style={mergeStyle(STYLE.benefitItem.text, { color })}>{text}</div>;
};

function checkListItem({ style, icon, text = '', color = '' }) {
  if (!icon && !text.length) return null;

  return (
    <div style={style}>
      {``}
      <CheckIconItem icon={icon} color={color} />
      <TextItem text={text} color={color} />
    </div>
  );
}

function benefitItem(item, index) {
  const containerProps = {
    key: `body-${item.id}`,
    style: STYLE.benefitItem.container(index, this.total)
  };

  return (
    <div {...containerProps}>
      <div style={STYLE.benefitItem.title}>{item.title}</div>
      <div style={STYLE.benefitItem.checkList}>
        {checkListItem({
          style: STYLE.benefitItem.checkListSliver,
          icon: item.silver,
          text: item.silverText,
          color: MEMBERSHIP_LEVEL_TYPE[1].color
        })}
        {checkListItem({
          style: STYLE.benefitItem.checkListGold,
          icon: item.gold,
          text: item.goldText,
          color: MEMBERSHIP_LEVEL_TYPE[2].color
        })}
        {checkListItem({
          style: STYLE.benefitItem.checkListDiamond,
          icon: item.diamond,
          text: item.diamondText,
          color: MEMBERSHIP_LEVEL_TYPE[3].color
        })}
      </div>
    </div>
  );
}

const extraTitle = (membershipInfo) => (
  <div style={STYLE.memberLevelTitle.list}>
    <MemberLevelTitle membershipLevel={'1'} membershipInfo={membershipInfo} style={STYLE.memberLevelTitle.item} />
    <MemberLevelTitle membershipLevel={'2'} membershipInfo={membershipInfo} style={STYLE.memberLevelTitle.item} />
    <MemberLevelTitle membershipLevel={'3'} membershipInfo={membershipInfo} style={STYLE.memberLevelTitle.item} />
  </div>
);

interface MemberBenefitProps {
  membershipInfo: MembershipLevel[];
  benefitList: typeof MemberBenefits;
}
const MemberBenefit = ({ membershipInfo, benefitList }: MemberBenefitProps) => {
  const isExistMembershipInfo = !!membershipInfo && Array.isArray(membershipInfo);

  let silver: any = [],
    gold: any = [],
    diamond: any = [];
  if (!!isExistMembershipInfo) {
    silver = membershipInfo.filter((item) => 'silver' === item.name);
    gold = membershipInfo.filter((item) => 'gold' === item.name);
    diamond = membershipInfo.filter((item) => 'diamond' === item.name);
  }

  const isCashbackPercentageAvailable =
    !!silver?.[0]?.benefits?.cashback_percentage &&
    !!gold?.[0]?.benefits?.cashback_percentage &&
    !!diamond?.[0]?.benefits?.cashback_percentage;
  const isLixicoinEarnRateAvailable =
    !!silver?.[0]?.benefits?.lixicoin_earn_rate &&
    !!gold?.[0]?.benefits?.lixicoin_earn_rate &&
    !!diamond?.[0]?.benefits?.lixicoin_earn_rate;

  const generalBlockProps = {
    title: 'Quyền lợi thành viên',
    style: STYLE.main.container,
    extraTitle: () => extraTitle(membershipInfo),
    id: 'lixicoin-benefit'
  };

  const combinedBenefitList = benefitList
    .map((benefit) => {
      if (0 === benefit.id && isCashbackPercentageAvailable) {
        return Object.assign({}, benefit, {
          silverText: `${silver[0].benefits.cashback_percentage}%`,
          goldText: `${gold[0].benefits.cashback_percentage}%`,
          diamondText: `${diamond[0].benefits.cashback_percentage}%`
        });
      }

      if (2 === benefit.id && isLixicoinEarnRateAvailable) {
        return Object.assign({}, benefit, {
          silverText: `${silver[0].benefits.lixicoin_earn_rate}x`,
          goldText: `${gold[0].benefits.lixicoin_earn_rate}x`,
          diamondText: `${diamond[0].benefits.lixicoin_earn_rate}x`
        });
      }

      return benefit;
    })
    .filter((benefit) => {
      if (benefit.id === 0) return !!isCashbackPercentageAvailable;
      if (benefit.id === 2) return !!isLixicoinEarnRateAvailable;

      return true;
    });

  return (
    <GeneralBlock {...generalBlockProps}>
      {combinedBenefitList.map(benefitItem, { total: combinedBenefitList.length })}
    </GeneralBlock>
  );
};

export default MemberBenefit;
