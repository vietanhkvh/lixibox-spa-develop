import { APP_VERSION } from '../../../constants/application/global';
import { currenyFormat } from '../../../utils/currency';

import { IProductPriceProps } from './model';
import STYLE from './style';

export function renderComponent() {
  const {
    currentPrice = 0,
    oldPrice = 0,
    coinsPrice = 0,
    currencyFormatType = 'currency',
    version,
    style
  } = this.props as IProductPriceProps;

  return (
    <div style={Object.assign({}, STYLE.container, style)}>
      <div style={Object.assign({}, STYLE.current, APP_VERSION.MOBILE === version && STYLE.current.mobile)}>
        {(0 !== currentPrice || 0 !== coinsPrice) &&
          currenyFormat('currency' === currencyFormatType ? currentPrice : coinsPrice, currencyFormatType)}
      </div>

      {'currency' === currencyFormatType && 0 !== currentPrice && oldPrice > currentPrice && (
        <div style={Object.assign({}, STYLE.old, APP_VERSION.MOBILE === version && STYLE.old.mobile)}>
          {currenyFormat(oldPrice)}
        </div>
      )}
    </div>
  );
}
