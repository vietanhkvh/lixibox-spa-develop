import Icon from '../ui/icon';
import Pagination from '../general/pagination';
import MainBlock from '../../container/layout/main-block';
import { isMobileVersion } from '../../utils/responsive';
import { NOTIFICATION_TYPE_VALUE } from '../../constants/application/notification';
import { renderHtmlContent } from '../../utils/html';
import { formatDateTime } from '../../utils/date-time';
import { DATETIME_FORMAT_TYPE } from '../../constants/application/global';
import LoadingPlaceholder from '../ui/loading-placeholder';

import { IProps, IState } from './model';
import STYLE from './style';

export const renderItemPlaceholder = (item) => (
  <div
    style={Object.assign({}, STYLE.placeholder.productItem, isMobileVersion() && STYLE.placeholder.productMobileItem)}
    key={item}
  >
    <LoadingPlaceholder style={STYLE.placeholder.productItem.image} />
  </div>
);

const renderLoadingPlaceholder = () => {
  const list = [1, 2, 3, 4, 5, 6];
  return (
    <div style={STYLE.placeholder}>
      <div style={STYLE.placeholder.productList}>{Array.isArray(list) && list.map(renderItemPlaceholder)}</div>
    </div>
  );
};

const renderView = ({ props, state }) => {
  const { title, list, style, showHeader, current, per, total, urlList } = props as IProps;

  const { isLoadingList } = state as IState;

  const contentGroupStyle = STYLE.container.contentGroup;

  const mainBlockProps = {
    showHeader,
    title,
    showViewMore: false,
    content: (
      <div>
        <div style={STYLE.row}>
          {Array.isArray(list) &&
            list.map((item, index) => (
              <div style={STYLE.row.wrap} key={index}>
                <div>
                  <div style={STYLE.container}>
                    <div style={STYLE.container.wrapIcon}>
                      <Icon
                        style={
                          STYLE.container.wrapIcon.item[
                            NOTIFICATION_TYPE_VALUE[item.notification_type]
                              ? NOTIFICATION_TYPE_VALUE[item.notification_type].type
                              : 'success'
                          ]
                        }
                        innerStyle={STYLE.container.wrapIcon.item.inner}
                        name={
                          NOTIFICATION_TYPE_VALUE[item.notification_type]
                            ? NOTIFICATION_TYPE_VALUE[item.notification_type].type
                            : 'success'
                        }
                      />
                    </div>
                    <div style={contentGroupStyle}>
                      <div style={contentGroupStyle.titleGroup}>
                        <div style={contentGroupStyle.titleGroup.title}>
                          {NOTIFICATION_TYPE_VALUE[item.notification_type] &&
                            NOTIFICATION_TYPE_VALUE[item.notification_type].title}
                        </div>
                        <div
                          style={contentGroupStyle.titleGroup.date}
                          title={formatDateTime(item.created_at, DATETIME_FORMAT_TYPE.FULL_INFO)}
                        >
                          {formatDateTime(item.created_at)}
                        </div>
                      </div>
                      <div style={contentGroupStyle.content}>{renderHtmlContent({ content: item.message_html })}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <Pagination
          {...{
            current,
            per,
            total,
            urlList,
            handleClick: () => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
          }}
        />
      </div>
    ),
    style: {}
  };

  return (
    <div className={'summary-notification-list'} style={Object.assign({}, STYLE.container, style)}>
      {isLoadingList ? (
        renderLoadingPlaceholder()
      ) : Array.isArray(list) && list.length > 0 ? (
        <MainBlock {...mainBlockProps} />
      ) : (
        <div style={STYLE.note}>Không tìm thấy danh sách thông báo.</div>
      )}
    </div>
  );
};

export default renderView;
