import classNames from 'classnames';

import Icon from '../../../components/ui/icon';
import DiscountBlock from '../../../components/ui/discount-block';
import SanitizedAndPreprocessedHTMLContent from '../../../presentation-component/general/sanitized-and-preprocessed-html-content';
import { generateTestId } from 'utils/test-utils';

import * as VARIABLE from '../../../style/variable';
import STYLE from './style';

const DescriptionInfo = ({
  style = {},
  color,
  backgroundColor = '',
  dottedColor = '',
  description,
  className = ''
}) => {
  if (!description || '' === description) return null;

  const discountBlockProp = {
    size: 3,
    style: Object.assign({}, STYLE.outer, style),
    innerStyle: STYLE.inner,
    dottedColor: !!dottedColor.length ? dottedColor : VARIABLE.colorYellowLighter,
    backgroundColor: !!backgroundColor.length ? backgroundColor : VARIABLE.colorWhite
  };

  const iconProps = {
    name: 'half-lighting',
    style: Object.assign(
      {},
      STYLE.icon,
      color === 'primary' ? { color: VARIABLE.colorPrimary } : { color: VARIABLE.colorYellowLighter }
    ),
    innerStyle: STYLE.innerIcon
  };

  const titleProps = {
    style: Object.assign(
      {},
      STYLE.text,
      color === 'primary' ? { color: VARIABLE.colorPrimary } : { color: VARIABLE.colorYellowDarker }
    )
  };

  return (
    <div
      className={classNames('descriptionInfo', className)}
      style={{ borderRadius: 8, marginTop: 15 }}
      {...generateTestId({ name: 'description-info' })}
    >
      <DiscountBlock color={color} {...discountBlockProp}>
        <Icon {...iconProps} />
        <div {...titleProps}>
          <SanitizedAndPreprocessedHTMLContent content={description} isSantitizeHtml={false} formatRNAsLineBreak />
        </div>
      </DiscountBlock>
    </div>
  );
};

export default DescriptionInfo;
