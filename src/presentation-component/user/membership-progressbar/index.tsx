import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';

import Icon from 'components/ui/icon';
import { MembershipLevel } from 'flows/lixicoin/types';
import SvgIcon from 'presentation-component/ui/icon';
import { User } from 'types/api/auth';
import { numberFormat } from 'utils/format';
import { mergeStyle } from 'utils/responsive';

import * as STYLE from './style';
import styles from './styles.module.scss';
import { tracking } from './tracking';

const InfoIcon = ({ onClick = () => {} }) => {
  const iconProps = {
    name: 'info',
    onClick,
    style: STYLE.infoIcon.outer,
    innerStyle: STYLE.infoIcon.inner
  };

  return <Icon {...iconProps} />;
};

interface MembershipProgressbarProps {
  userInfo: User;
  membershipInfo: MembershipLevel[];
  infoPath?: string;
  onInfoClick?: () => void;
  classes?: { container?: string };
}
const MembershipProgressbar = ({
  userInfo,
  membershipInfo,
  classes,
  infoPath = '#',
  onInfoClick
}: MembershipProgressbarProps) => {
  const [selectedLevel, setSelectedLevel] = useState(null);

  useEffect(() => {
    if (selectedLevel === null && membershipInfo) {
      const currentLevel = userInfo.membership_level;
      const nextLevel = userInfo.membership_level < 3 ? currentLevel + 1 : currentLevel;

      setSelectedLevel({
        ...membershipInfo[nextLevel],
        type: 'right',
        heading: 'Quyền lợi khi lên hạng '
      });
    }
  }, [membershipInfo]);

  const handleSelectCurrentLevel = () => {
    const currentLevel = userInfo.membership_level;

    setSelectedLevel({
      ...membershipInfo[currentLevel],
      type: 'left',
      heading: 'Quyền lợi hạng thành viên '
    });
  };

  const handleNextCurrentLevel = () => {
    const currentLevel = userInfo.membership_level;
    const nextLevel = userInfo.membership_level < 3 ? currentLevel + 1 : currentLevel;

    setSelectedLevel({
      ...membershipInfo[nextLevel],
      type: 'right',
      heading: 'Quyền lợi khi lên hạng '
    });
  };

  const currentLevel = userInfo.membership_level;
  if (3 === currentLevel) return null;

  const nextLevel = userInfo.membership_level < 3 ? currentLevel + 1 : currentLevel;
  const currentLevelProps = {
    style: STYLE.progress.levelText,
    onClick: handleSelectCurrentLevel,
    className: styles[`level-${membershipInfo?.[currentLevel]?.name?.toLocaleLowerCase()}`]
  };
  const nextLevelProps = {
    style: STYLE.progress.levelText,
    onClick: handleNextCurrentLevel,
    className: styles[`level-${membershipInfo?.[nextLevel]?.name?.toLocaleLowerCase()}`]
  };

  const remainingPoint = numberFormat(membershipInfo?.[nextLevel]?.required_coins - userInfo.earned_coins);

  const upLevelLinkProps = {
    style: STYLE.progress.text,
    to: infoPath,
    onClick: () => {
      onInfoClick?.();
      tracking.clickOn.infoUpLevel();
    }
  };

  const isShowStartValueProgess = userInfo.earned_coins / membershipInfo?.[nextLevel]?.required_coins > 0.2;

  const currentValueProgressProps = {
    style: mergeStyle(STYLE.progress.valueBar, {
      width: `${(userInfo.earned_coins / membershipInfo?.[nextLevel]?.required_coins) * 100}%`,
      borderRadius: userInfo.earned_coins / membershipInfo?.[nextLevel]?.required_coins <= 0.2 ? 7 : '0 7px 7px 0'
    })
  };

  return (
    <div className={classnames(styles.container, classes?.container)}>
      <NavLink {...upLevelLinkProps}>
        {`Kiếm thêm`}
        <span style={STYLE.progress.boldText}>
          {remainingPoint} {' điểm'}
        </span>
        {`để lên hạng`}
        <span style={STYLE.progress.boldText}>{membershipInfo?.[nextLevel]?.presentation}</span>
        <InfoIcon />
      </NavLink>

      <div style={STYLE.progress.bar}>
        {isShowStartValueProgess && (
          <div style={STYLE.progress.startBar}>{numberFormat(membershipInfo?.[currentLevel]?.required_coins)}</div>
        )}

        <div style={STYLE.progress.innerBar}>
          {userInfo.earned_coins > 0 && <div {...currentValueProgressProps}>{numberFormat(userInfo.earned_coins)}</div>}
        </div>

        <div style={STYLE.progress.endBar}>{numberFormat(membershipInfo?.[nextLevel]?.required_coins)}</div>
      </div>
      <div style={STYLE.progress.level}>
        <div {...currentLevelProps}>{membershipInfo?.[currentLevel]?.presentation}</div>
        <div {...nextLevelProps}>{membershipInfo?.[nextLevel]?.presentation}</div>
      </div>

      <div className={classnames(styles.levelDesc, styles[selectedLevel?.type])}>
        <div className={styles.heading}>
          {selectedLevel?.heading}
          {selectedLevel?.presentation}
        </div>
        <div className={styles.content}>
          <SvgIcon name={'dollar-time'} className={styles.icon} />
          <div className={styles.text}>
            <span>{'Hoàn tiền lên đến '}</span>
            <b>
              {selectedLevel?.benefits?.cashback_percentage}
              {'%'}
            </b>
          </div>
        </div>
        <div className={styles.content}>
          <SvgIcon name={'dollar'} className={styles.icon} />
          <div className={styles.text}>
            <span>{'Nhận '}</span>
            <b>
              {selectedLevel?.benefits?.lixicoin_earn_rate}
              {' Lixicoin '}
            </b>
            <span>{' cho mỗi '}</span>
            <b>{' 1.000 ₫ '}</b>
            <span>{' khi mua hàng'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MembershipProgressbar;
