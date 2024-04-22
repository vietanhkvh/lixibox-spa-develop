import { SHIPMENT_STATUS, ORDER_STATUS } from '../../../constants/application/order';
import { ROUTING_USER_ORDER } from '../../../routings/path';

import { renderHeader, renderIconGroup, renderCloseIcon, renderCTA } from './view-general';
import { processList } from './initialize';
import STYLE from './style';

const renderView = ({ props }) => {
  const { data, closeModal, history } = props;

  const len = processList.length - 1;
  const shipmentNum = SHIPMENT_STATUS[data.status] || -1;

  return (
    <div style={STYLE.container.wrap}>
      {renderCloseIcon({ onClick: closeModal })}
      <div style={STYLE.container.headerContent}>
        <div style={STYLE.desktopHeadingHighlight}> </div>
        <div style={STYLE.container.cover} />
        {renderHeader({
          orderName: (data && data.number) || '',
          orderStatus: (data && ORDER_STATUS[data.status]) || ''
        })}
        {renderCTA({
          history,
          link: `${ROUTING_USER_ORDER}/${data && data.number}`
        })}
      </div>
      <div style={STYLE.container.contentGroup.container}>
        <div style={STYLE.container.process}>
          {Array.isArray(processList) &&
            processList.map((item, _index) =>
              renderIconGroup({
                item,
                shipmentNum,
                isLastChild: len === _index
              })
            )}
        </div>
      </div>
    </div>
  );
};

export default renderView;
