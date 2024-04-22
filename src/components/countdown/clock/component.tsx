import { PureComponent } from 'react';
import classnames from 'classnames';

import SvgIcon from 'presentation-component/ui/icon';
import { IEnableBlock, IProps } from './model';
import { DEFAULT_ENABLE, DEFAULT_ICON, INITIAL_STATE } from './initialize';
import style from './style.module.scss';
class component extends PureComponent<IProps, any> {
  constructor(props: IProps) {
    super(props);
    this.state = INITIAL_STATE;
  }

  render() {
    const { size = 'normal', classes, icon = DEFAULT_ICON, enable = DEFAULT_ENABLE, onClick } = this.props;
    const Icon = ({ name, isDivide = false }) => (
      <SvgIcon className={classnames(classes?.icon && classes?.icon, isDivide && classes?.divide)} name={name} />
    );
    return (
      <div onClick={onClick} className={classnames(classes?.container, style.container)}>
        {icon.position === 'left' && <Icon name={icon.name.main} />}
        {this.props?.day >= 1 && this._renderItem(this.props?.day, 'Ngày', enable.day)}
        {this._renderItem(this.props?.hour, 'Giờ', enable.hour)}
        {size === 'small' && <Icon name={icon?.name?.divide} isDivide={true} />}
        {this._renderItem(this.props?.minute, 'Phút', enable.minute)}
        {size === 'small' && <Icon name={icon?.name?.divide} isDivide={true} />}
        {this._renderItem(this.props?.second, 'Giây', enable.second)}
        {icon.position === 'right' && <Icon name={icon?.name?.main} />}
      </div>
    );
  }

  _renderItem(value, title, { block, text }: IEnableBlock) {
    const { classes, size = 'normal' } = this.props;
    const formatedValue = value < 10 ? `0${value}` : value;

    return (
      block && (
        <div className={classnames(classes?.segment, style.item, size && style[size])}>
          <div className={classnames(classes?.segmentValue, style.text, size && style[size])}>{formatedValue}</div>
          {text && <div className={classnames(classes?.segmentName, style.title, size && style[size])}>{title}</div>}
        </div>
      )
    );
  }
}

export default component;
