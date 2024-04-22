import { NavLink } from 'react-router-dom';

import Icon from '../../ui/icon';
import { renderHtmlContent } from '../../../utils/html';
import { createBreakDownLine } from '../../../utils/format';
import { TAB_INFO_STATUS } from '../../../constants/application/product';
import { ROUTING_PRODUCT_DETAIL_PATH } from '../../../routings/path';

import { IProps, IState } from './model';
import STYLE from './style';

const fieldCondition = {
  [TAB_INFO_STATUS.info]: 'description',
  [TAB_INFO_STATUS.usage]: 'usage',
  [TAB_INFO_STATUS.ingredients]: 'ingredients'
};

const getDataByType = ({ data, type }) => {
  const condition = fieldCondition[type];

  if (!Array.isArray(data) || !condition) {
    return [];
  }

  return data.filter((item) => item.product[condition] && item.product[condition].length > 0);
};

const renderDesc = ({ item, type }) => {
  const condition = fieldCondition[type];
  const missingData = 'Thông tin đang được cập nhật';

  if (!item || !item.product) {
    return '';
  }

  const description = createBreakDownLine(item.product[condition]);
  return !!description.length ? createBreakDownLine(description) : missingData;
};

const renderTabHeading = ({ handleShowInfo, title, isShow }) => {
  const iconProps = {
    name: isShow ? 'minus' : 'plus',
    style: STYLE.itemInfo.icon(isShow),
    innerStyle: STYLE.itemInfo.innerIcon
  };

  return (
    <div style={STYLE.itemInfo.container} onClick={handleShowInfo}>
      <div style={STYLE.itemInfo.name}>{title}</div>
      <Icon {...iconProps} />
    </div>
  );
};

function renderInfoItem(item) {
  const boxLinkProps = {
    title: (item && item.product && item.product.name) || '',
    to: `${ROUTING_PRODUCT_DETAIL_PATH}/${
      (item && item.product && (item.product.individual_box_slug || item.product.slug)) || ''
    }`,
    style: STYLE.infoContainer.infoGroup.info.productName
  };

  const descriptionProps = { item, type: this.type };

  return (
    <div style={STYLE.infoContainer} key={`category-item-${item.id}`}>
      <div style={STYLE.infoContainer.infoGroup}>
        <div style={STYLE.infoContainer.infoGroup.info}>
          {!this.isIndividual && (
            <NavLink {...boxLinkProps}>{(item && item.product && item.product.name) || ''}</NavLink>
          )}

          {renderHtmlContent({
            content: renderDesc(descriptionProps),
            style: STYLE.infoContainer.desc
          })}
        </div>
      </div>
    </div>
  );
}

export function renderComponent({ props, state, handleShowInfo }) {
  const { title, data, type, isIndividual, isReasonToSell, isForceShow } = props as IProps;
  const { isShow } = state as IState;

  const list = getDataByType({ data, type });
  const length = (list && list.length) || 0;

  return 0 === length && !isReasonToSell ? null : (
    <div className={'tab-info'}>
      {renderTabHeading({ handleShowInfo, title, isShow: isForceShow || isShow })}

      <div style={STYLE.infoWrap(isForceShow || isShow)}>
        {!!isReasonToSell ? (
          <div style={STYLE.reasonToSell}>
            {renderHtmlContent({
              content: createBreakDownLine(data),
              style: STYLE.infoContainer.desc
            })}
          </div>
        ) : (
          Array.isArray(list) && list.map(renderInfoItem, { isIndividual, type })
        )}
      </div>
    </div>
  );
}
