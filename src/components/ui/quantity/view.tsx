import classNames from 'classnames';

import { isMobileVersion } from '../../../utils/responsive';

import * as LAYOUT from '../../../style/layout';
import Icon from '../icon';

import { IQuantityProps, IQuantityState } from './model';
import STYLE from './style';
import styles from './style.module.scss';

function renderSmallVersion() {
  const { style, disabled } = this.props as IQuantityProps;
  const { valueDisplay, valueAnimating, resetAnimating } = this.state as IQuantityState;

  const styleIconGroup = Object.assign(
    {},
    LAYOUT.flexContainer.center,
    LAYOUT.flexContainer.verticalCenter,
    STYLE.small.iconOuter
  );

  return (
    <div className={'quantity'} style={Object.assign({}, STYLE, style)}>
      {!disabled && (
        <div style={styleIconGroup} onClick={() => this.handleIncreaseValue()}>
          <Icon name={'angle-up'} style={STYLE.small.icon} />
        </div>
      )}

      <div style={STYLE.small.value.container(disabled)}>
        <div style={STYLE.small.value.text}>{valueDisplay}</div>
        <div
          style={Object.assign(
            {},
            STYLE.small.value.textAnimation,
            valueAnimating && STYLE.small.value.textAnimation.animating,
            resetAnimating && STYLE.small.value.textAnimation.reset
          )}
        >
          {valueDisplay}
        </div>
      </div>

      {!disabled && (
        <div style={styleIconGroup} onClick={() => this.handleDecreaseValue()}>
          <Icon name={'angle-down'} style={STYLE.small.icon} />
        </div>
      )}
    </div>
  );
}

function renderNormalVersion() {
  const { style, disabled, color } = this.props as IQuantityProps;
  const { valueDisplay, valueAnimating, resetAnimating } = this.state as IQuantityState;

  const minusIconProps = {
    name: 'minus',
    style: Object.assign({}, STYLE.normal.icon, color),
    innerStyle: STYLE.normal.iconInnerMinus,
    onClick: false === disabled ? () => this.handleDecreaseValue() : null,
    testId: { name: 'btn-remove-item-product-cart' }
  };

  const plusIconProps = {
    name: 'plus',
    style: Object.assign({}, STYLE.normal.icon, color),
    innerStyle: STYLE.normal.iconInnerPlus(isMobileVersion),
    onClick: false === disabled ? () => this.handleIncreaseValue() : null,
    testId: { name: 'btn-add-item-product-cart' }
  };

  const valueStyle = Object.assign(
    {},
    STYLE.normal.value.textAnimation,
    valueAnimating && STYLE.normal.value.textAnimation.animating,
    resetAnimating && STYLE.normal.value.textAnimation.reset
  );

  return (
    <div className={classNames('quantity', styles.normalContainer)} style={Object.assign({}, style)}>
      <Icon {...minusIconProps} />

      <div style={Object.assign({}, STYLE.normal.value, color)}>
        <div style={STYLE.normal.value.text}>{valueDisplay}</div>
        <div style={valueStyle}>{valueDisplay}</div>
      </div>

      <Icon {...plusIconProps} />
    </div>
  );
}

export function renderComponent() {
  const { type } = this.props as IQuantityProps;

  const viewList = {
    small: renderSmallVersion,
    normal: renderNormalVersion
  };

  return viewList[type].bind(this)();
}
