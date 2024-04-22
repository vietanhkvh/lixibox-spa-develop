import Image from 'presentation-component/ui/image';
import SubmitButton from '../../../components/ui/submit-button';
import STYLE from './style';

const FeedbackToSubmit = ({ box, onClick }) => {
  return (
    <div style={STYLE.renderBoxList.item} onClick={() => !!onClick && onClick(box.id)}>
      <Image alt="" src={box.primary_picture.medium_url} style={STYLE.renderBoxList.itemImage} />
      <div style={STYLE.renderBoxList.itemInfo}>
        <div style={STYLE.renderBoxList.itemName}>{box.name}</div>
        <SubmitButton
          title={'Đánh giá ngay'}
          style={STYLE.renderBoxList.itemButton}
          icon={'star-line'}
          size={'small'}
          color={'borderBlack'}
          styleIcon={STYLE.renderBoxList.itemButtonIcon}
        />
      </div>
    </div>
  );
};

export default FeedbackToSubmit;
