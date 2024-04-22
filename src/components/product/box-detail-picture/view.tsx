import Icon from '../../../components/ui/icon';
import Image from 'presentation-component/ui/image';
import { isMobileVersion } from '../../../utils/responsive';

import STYLE from './style';

const TYPE_BOX = {
  IMAGE: 'IMAGE',
  VIDEO: 'VIDEO'
};
export function renderComponent() {
  const { closeModal, video } = this.props;

  const { selectedIndex, combinedList, mobileSelectedIndex } = this.state;

  const selectedImage =
    Array.isArray(combinedList) && combinedList.filter((item) => item.index * 1 === selectedIndex * 1);

  if (!selectedImage || selectedImage.length <= 0) {
    return '';
  }

  const iconProps = {
    name: 'close',
    style: STYLE.close.icon,
    innerStyle: STYLE.close.innerIcon,
    onClick: closeModal
  };

  return (
    <div onClick={closeModal} style={STYLE.container}>
      <Icon {...iconProps} />
      {!isMobileVersion() && (
        <div style={STYLE.mainImageWrap}>
          {TYPE_BOX.IMAGE === selectedImage[0].type && (
            <Image alt={''} onClick={(e) => e.stopPropagation()} style={STYLE.mainImage} src={selectedImage[0].image} />
          )}
          {
            TYPE_BOX.VIDEO === selectedImage[0].type && (
              <video
                controls
                autoPlay
                loop
                onClick={(e) => e.stopPropagation()}
                style={STYLE.mainImage}
                src={selectedImage[0].video}
              />
            ) //not muted
          }
        </div>
      )}

      <div onClick={(e) => e.stopPropagation()} style={STYLE.list} id={'product-picture-panel'}>
        {Array.isArray(combinedList) &&
          combinedList.map((item) => {
            if (TYPE_BOX.VIDEO === item.type) {
              return (
                <div
                  id={`product-picture-item-${item.index}`}
                  onClick={() => !isMobileVersion() && this.onSelect(item.index)}
                  onMouseEnter={() => !isMobileVersion() && this.onSelect(item.index)}
                  style={Object.assign(
                    {},
                    STYLE.item.container,
                    item.index === selectedIndex && !isMobileVersion() && STYLE.item.selected
                  )}
                >
                  {isMobileVersion() ? (
                    <video
                      id={video ? video[0]?.id : ''}
                      controls
                      autoPlay
                      loop
                      onClick={(e) => e.stopPropagation()}
                      style={STYLE.item.video}
                      src={item?.video}
                    />
                  ) : (
                    <Image style={STYLE.item.img} src={item?.thumbnail} />
                  )}
                </div>
              );
            }

            if (TYPE_BOX.IMAGE === item.type || !isMobileVersion()) {
              return (
                <div
                  id={`product-picture-item-${item.index}`}
                  onClick={() => !isMobileVersion() && this.onSelect(item.index)}
                  onMouseEnter={() => !isMobileVersion() && this.onSelect(item.index)}
                  style={Object.assign(
                    {},
                    STYLE.item.container,
                    item.index === selectedIndex && !isMobileVersion() && STYLE.item.selected
                  )}
                >
                  <Image style={STYLE.item.img} src={item?.image} />
                </div>
              );
            }
            return null;
          })}
      </div>
      {!!isMobileVersion() && (
        <div style={STYLE.statusNumber}>{`${mobileSelectedIndex + 1} / ${combinedList.length}`}</div>
      )}
    </div>
  );
}
