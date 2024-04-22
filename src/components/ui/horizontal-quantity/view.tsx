import classNames from 'classnames';

import { isMobileVersion } from '../../../utils/responsive';
import * as LAYOUT from '../../../style/layout';
import Icon from '../icon';
import QuantityEditModal from './quantity-edit-modal';
import InlineInput from './inline-input';
import { MAX_CART_ITEM_QUANTITY_FALLBACK, MIN_CART_ITEM_QUANTITY } from './component';
import { IQuantityProps, IQuantityState } from './model';
import STYLE from './style';
import styles from './style.module.scss';

function renderSmallVersion() {
  const { style, disabled } = this.props as IQuantityProps;
  const { valueDisplay, valueAnimating, resetAnimating } = this.state as IQuantityState;
  const { minQuantity, maxQuantity } = this.getQuantityLimits();

  const styleIconGroup = Object.assign(
    {},
    LAYOUT.flexContainer.center,
    LAYOUT.flexContainer.verticalCenter,
    STYLE.small.iconOuter,
    disabled && STYLE.small.iconOuterDisabled
  );

  const minusIconProps = {
    testId: { name: 'btn-minus-item-product-cart' },
    name: 'minus',
    style: Object.assign({}, STYLE.small.icon, disabled && STYLE.small.iconDisabled)
  };

  const plusIconProps = {
    testId: { name: 'btn-remove-item-product-cart' },
    name: 'plus',
    style: Object.assign({}, STYLE.small.icon, disabled && STYLE.small.iconDisabled)
  };

  return (
    <div className={'quantity'} style={Object.assign({}, STYLE, style)}>
      <div style={styleIconGroup} onClick={() => !disabled && this.handleDecreaseValue()}>
        <Icon {...minusIconProps} />
      </div>
      <div
        className={styles.valueContainer}
        style={STYLE.small.value.container}
        onClick={() => this.onQuantityEditRequest()}
      >
        {isMobileVersion() ? (
          <div style={STYLE.small.value.text}>{valueDisplay}</div>
        ) : (
          <InlineInput
            className={styles.valueEditorSmall}
            onChange={(value) => this.handleInlineEditorValueChange(value)}
            value={valueDisplay}
            minQuantity={minQuantity}
            maxQuantity={maxQuantity}
            type="number"
            dataTestId="amount-item-product-cart"
          />
        )}
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
      <div style={styleIconGroup} onClick={() => !disabled && this.handleIncreaseValue()}>
        <Icon {...plusIconProps} />
      </div>
    </div>
  );
}

function renderNormalVersion() {
  const { style, disabled, color } = this.props as IQuantityProps;
  const { valueDisplay, valueAnimating, resetAnimating } = this.state as IQuantityState;
  const { minQuantity, maxQuantity } = this.getQuantityLimits();

  const minusIconProps = {
    testId: { name: 'btn-minus-item-product-cart' },
    name: 'minus',
    style: Object.assign({}, STYLE.normal.icon, color),
    innerStyle: STYLE.normal.iconInnerMinus,
    onClick: false === disabled ? () => this.handleDecreaseValue() : null
  };

  const plusIconProps = {
    testId: { name: 'btn-remove-item-product-cart' },
    name: 'plus',
    style: Object.assign({}, STYLE.normal.icon, color),
    innerStyle: STYLE.normal.iconInnerPlus(isMobileVersion),
    onClick: false === disabled ? () => this.handleIncreaseValue() : null
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
      <div className={styles.valueContainer} onClick={() => this.onQuantityEditRequest()}>
        {isMobileVersion() ? (
          <div style={STYLE.normal.value.text}>{valueDisplay}</div>
        ) : (
          <InlineInput
            className={styles.valueEditorNormal}
            onChange={(value) => this.handleInlineEditorValueChange(value)}
            value={valueDisplay}
            minQuantity={minQuantity}
            maxQuantity={maxQuantity}
            type="number"
            dataTestId="amount-item-product-cart"
          />
        )}
        <div style={valueStyle}>{valueDisplay}</div>
      </div>
      <Icon {...plusIconProps} />
    </div>
  );
}

export function renderComponent() {
  const {
    type,
    cartStore: {
      constants: { max_cart_item_quantity }
    }
  } = this.props as IQuantityProps;

  const { valueDisplay, enableQuantityEditMode } = this.state;
  const maxCartItemQuantity = max_cart_item_quantity || MAX_CART_ITEM_QUANTITY_FALLBACK;

  const viewList = {
    small: renderSmallVersion,
    normal: renderNormalVersion
  };

  return (
    <>
      {viewList[type].bind(this)()}
      {isMobileVersion() && (
        <QuantityEditModal
          value={valueDisplay}
          isOpen={enableQuantityEditMode}
          minCartItemQuantity={MIN_CART_ITEM_QUANTITY}
          maxCartItemQuantity={maxCartItemQuantity}
          onClose={() => this.onQuantityEditModalClose()}
          onSubmit={(quantity) => this.handleValueChange(quantity)}
        />
      )}
    </>
  );
}
