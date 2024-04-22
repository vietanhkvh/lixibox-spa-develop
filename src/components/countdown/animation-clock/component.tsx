import React, { useEffect, useState } from 'react';
import classnames from 'classnames';

import { calculateTime } from '../panel/module';
import { IAnimationClock } from './model';
import CountdownClock from '../clock';
import SvgIcon from 'presentation-component/ui/icon';
import style from './style.module.scss';
import { NavLink } from 'react-router-dom';
import { getNavLink } from 'utils/validate';
import { isMobileDevice } from 'utils/responsive';
import { connect } from 'react-redux';
import { mapDispatchToProps } from './store';

const InformatiomDetail = ({ title = 'X2 Lixicoin đổi quà ngay', icon = 'angle-right' }) => (
  <div className={style.contentContainer}>
    <div className={style.content}>{title}</div>
    <SvgIcon className={style.icon} name={icon} />
  </div>
);

const AnimationClock: React.FC<IAnimationClock> = (props) => {
  const {
    data = {
      id: 65,
      end_at: 0,
      linked_url: '',
      proportion: 2,
      start_at: 0,
      title: 'x2 Lixicoin - Mua ngay kẻo lỡ'
    },
    contentData: { propsTemplate, template } = {
      propsTemplate: {},
      template: (props) => <InformatiomDetail {...props} />
    },
    enable,
    icon,
    size,
    fetchCountdownListAction
  } = props;

  const { title, linked_url } = data;
  const { isValidateTime, time } = calculateTime(data);

  const [isFlip, setIsFlip] = useState(false);
  const [isValidate, validateTime] = useState(isValidateTime);
  const [timeState, setTime] = useState<any>(time);

  const classes = {
    container: classnames(style.containerClock),
    icon: style.icon,
    divide: style.divide,
    segmentValue: style.segmentValue
  };

  useEffect(() => {
    const handleFlip = () => {
      setIsFlip(!isFlip);
    };
    const FLIP_TIMES = 3000;
    const timer = setTimeout(handleFlip, FLIP_TIMES);

    return () => clearTimeout(timer);
  }, [isFlip]);

  useEffect(() => {
    const handleIntervalUpdate = () => {
      const { isValidateTime, time } = calculateTime(data);
      validateTime(isValidateTime);
      setTime(time);
    };

    const intervalTime = setInterval(() => handleIntervalUpdate(), 1000);
    !isValidateTime && fetchCountdownListAction();
    return () => {
      clearInterval(intervalTime);
    };
  }, [timeState, isValidate]);

  const countdownClockProps = {
    day: timeState?.day,
    hour: enable?.day && enable?.day?.block ? timeState?.hour : timeState?.day * 24 + timeState?.hour,
    minute: timeState?.minute,
    second: timeState?.second,
    enable,
    icon,
    size
  };
  const templateProps = Object.assign({}, propsTemplate, { title });

  if (!isValidate) return null;

  return (
    <NavLink to={getNavLink(linked_url)} className={classnames(style.wrapper, isMobileDevice() && style.mobile)}>
      <div className={classnames(style.container, isFlip && style.fliped)}>
        <div className={classnames(style.face, style.frontFace)}>
          <CountdownClock classes={classes} {...countdownClockProps} />
        </div>
        <div className={classnames(style.face, style.bottomFace)}>{template(templateProps)}</div>
      </div>
    </NavLink>
  );
};

export default connect<any, any, any>(null, mapDispatchToProps)(AnimationClock);
