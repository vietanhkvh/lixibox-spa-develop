import { Component, MouseEvent } from 'react';
import { NavLink } from 'react-router-dom';

import Image from 'presentation-component/ui/image';
import { ROUTING_COMMUNITY_PATH } from '../../../routings/path';
import { formatDateTime } from '../../../utils/date-time';
import { DATETIME_FORMAT_TYPE } from '../../../constants/application/global';

import STYLE from './ItemFeedback.style';
import { ProductBox } from 'types/api/shop';

/**  PROPS & STATE INTERFACE */
interface IItemFeedbackProps {
  data: any;
  openModal?: any;
  onClick?: (e: MouseEvent<HTMLElement>, item: ProductBox) => void;
}

class ItemFeedback extends Component<IItemFeedbackProps, any> {
  shouldComponentUpdate(nextProps, nextState) {
    const isNullCurrentData = null === this.props.data || 'undefined' === typeof this.props.data;
    const isNullNextData = null !== nextProps.data && 'undefined' !== typeof nextProps.data;

    if (isNullCurrentData && isNullNextData) {
      return true;
    }

    return false;
  }

  render() {
    const { data, onClick } = this.props;

    const pictureUrl = (data && data.picture && data.picture.medium_url) || data.picture_url || '';
    const avatar =
      (data && data.user && data.user.avatar && data.user.avatar.medium_url) ||
      (data.user_avatar && data.user_avatar.medium_url) ||
      '';

    return (
      <NavLink
        style={STYLE.container.itemSlider}
        to={`${ROUTING_COMMUNITY_PATH}/${(data && data.id) || 0}`}
        onClick={(e) => onClick?.(e, data)}
      >
        <div>
          <div style={STYLE.container.itemSliderPanel}>
            <div style={Object.assign({}, STYLE.container.innerItemSliderPanel)}>
              <Image style={STYLE.container.image} src={pictureUrl} alt={data && data.message} />
              {data && data.video && !!data.video.url && <div style={STYLE.videoIcon} />}
            </div>
          </div>
          <div style={STYLE.container.info}>
            <div style={STYLE.info.container}>
              <div style={Object.assign({}, { backgroundImage: `url(${avatar})` }, STYLE.info.avatar)} />
              <div style={STYLE.info.detail}>
                <div style={STYLE.info.detail.username}>{(data && data.user && data.user.name) || ''}</div>
                {data && data.created_at && (
                  <div
                    style={STYLE.info.detail.ratingGroup}
                    title={formatDateTime(data.created_at, DATETIME_FORMAT_TYPE.FULL_INFO)}
                  >
                    {formatDateTime(data.created_at)}
                  </div>
                )}
              </div>
            </div>
            <div style={STYLE.info.description}>{(data && data.message) || ''}</div>
          </div>
        </div>
      </NavLink>
    );
  }
}

export default ItemFeedback;
