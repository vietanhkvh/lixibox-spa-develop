import Image from 'presentation-component/ui/image';
import { MODAL_INSTAGRAM } from '../../../constants/application/modal';

import { CDN_ASSETS_PREFIX } from '../../../utils/uri';

import { instagram } from './initialize';
import { IProps } from './model';
import STYLE from './style';
const insta = CDN_ASSETS_PREFIX('/halio-landing-page/insta.png');

function renderInstagramItem(item, index) {
  const instagramProps = {
    key: `instagram-item-${index}`,
    style: STYLE.instagram.list.link,
    onClick: () => this.openModal(MODAL_INSTAGRAM({ data: item }))
  };

  return (
    <div {...instagramProps}>
      <div style={Object.assign({}, STYLE.instagram.list.img, { backgroundImage: `url(${item.img})` })}></div>
    </div>
  );
}

export function renderComponent({ props }) {
  const { openModal } = props as IProps;

  return (
    <div style={STYLE.instagram.container}>
      <div style={STYLE.instagram.heading}>
        <Image alt={''} src={insta} style={STYLE.instagram.heading.icon} />
      </div>

      <div style={STYLE.instagram.list.container}>{instagram.map(renderInstagramItem, { openModal })}</div>
    </div>
  );
}
