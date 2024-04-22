import Image from 'presentation-component/ui/image';
import STYLE from './style';

const renderSizeGuideModal = ({ image, closeModal }) => {
  if (!image) {
    return null;
  }

  return (
    <div style={STYLE.container}>
      <Image style={STYLE.image} src={image} />
    </div>
  );
};

export default renderSizeGuideModal;
