import Icon from '../../ui/icon';
import * as LAYOUT from '../../../style/layout';

import STYLE from './style';
import { IProps } from './model';

const renderSee = ({ text, iconName }) => (
  <span style={STYLE.infoStatistical.spanWrap}>
    <Icon name={iconName} style={STYLE.icon} innerStyle={STYLE.icon.inner} />
    <span style={STYLE.infoStatistical.spanWrap.span}>{text}</span>
  </span>
);

const renderView = (props: IProps) => {
  const { style, txtView, txtTime } = props as IProps;
  return (
    <div style={Object.assign({}, LAYOUT.flexContainer.left, style, STYLE.infoStatistical)}>
      {renderSee({ text: txtView, iconName: 'check' })}
      {renderSee({ text: txtTime, iconName: 'time' })}
    </div>
  );
};

export default renderView;
