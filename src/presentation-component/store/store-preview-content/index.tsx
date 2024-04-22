import classNames from 'classnames';

import { DATETIME_FORMAT_TYPE } from '../../../constants/application/global';
import { isCurrentTimeInTimeRange } from 'utils/time';
import { formatDateTime } from '../../../utils/date-time';
import SvgIcon from '../../../presentation-component/ui/icon';
import style from './style.module.scss';

const getOperationTimeRange = (store) => {
  if (!!store?.opening_time && !!store?.closing_time) {
    const openingTime = formatDateTime(store?.opening_time, DATETIME_FORMAT_TYPE.HH_MM);
    const closingTime = formatDateTime(store?.closing_time, DATETIME_FORMAT_TYPE.HH_MM);

    return `${openingTime} - ${closingTime}`;
  }

  return '';
};

const isStoreOpenNow = (store) => {
  if (!!store?.opening_time && !!store?.closing_time) {
    const openingTime = new Date(store?.opening_time * 1000);
    const closingTime = new Date(store?.closing_time * 1000);
    return isCurrentTimeInTimeRange({ startTime: openingTime, endTime: closingTime });
  }

  return true;
};

interface StorePreviewContentProps {
  store: any;
  onClickAddress?: (store: any) => any;
  classes?: { container?: string };
}
const StorePreviewContent = ({ store, onClickAddress, classes }: StorePreviewContentProps) => {
  const hasOperationTime = !!store?.opening_time && !!store?.closing_time;

  return (
    <div className={classNames(style.storePreviewContent, classes?.container)}>
      <div className={style.title}>{store?.name || ''}</div>
      {!!store?.full_address && (
        <div className={style.info}>
          <SvgIcon name={'mark-location'} className={style.icon} />
          <div className={style.sections}>
            <div className={style.brief}>{store?.full_address}</div>
            <div
              className={classNames(style.brief, style.highlightedBlue, style.pointer)}
              onClick={() => onClickAddress?.(store)}
            >
              Xem bản đồ
            </div>
          </div>
        </div>
      )}
      {!!store?.phone && (
        <div className={style.info}>
          <SvgIcon name={'call'} className={style.icon} />
          <div className={style.sections}>
            <div className={style.brief}>
              <div className={style.name}>Hotline:</div>
              <a
                className={classNames(style.value, style.highlightedBrief, style.withLeftPadding, style.pointer)}
                href={`tel: ${store?.phone}`}
              >
                {store?.phone}
              </a>
            </div>
          </div>
        </div>
      )}
      {!!store?.email && (
        <div className={style.info}>
          <SvgIcon name={'email'} className={style.icon} />
          <div className={style.sections}>
            <div className={style.brief}>
              <div className={style.name}>Email:</div>
              <a
                href={`mailto: ${store?.email}`}
                className={classNames(style.value, style.highlightedBrief, style.withLeftPadding, style.pointer)}
              >
                {store?.email}
              </a>
            </div>
          </div>
        </div>
      )}
      <div className={style.info}>
        <SvgIcon name={'calendar'} className={style.icon} />
        <div className={style.sections}>
          <div className={style.brief}>Thời gian hoạt động: Tất cả các ngày trong tuần</div>
        </div>
      </div>
      {hasOperationTime && (
        <div className={style.info}>
          <SvgIcon name={'history'} className={style.icon} />
          <div className={style.sections}>
            <div className={style.brief}>
              Giờ mở cửa: {getOperationTimeRange(store)}
              {!isStoreOpenNow(store) && (
                <div className={classNames(style.highlightedPink, style.withLeftPadding)}>(Đã đóng cửa)</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StorePreviewContent;
