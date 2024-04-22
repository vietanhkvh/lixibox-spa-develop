import { useState } from 'react';
import classNames from 'classnames';

import Image from 'presentation-component/ui/image';
import Invitation from '../../../../../components/invitation';
import Loading from '../../../../ui/loading';
import StarRating from '../../../../../presentation-component/ui/star-rating';
import SubmitButton from '../../../../../presentation-component/ui/submit-button';
import ThumbnailsWithUploader from '../../../../../presentation-component/feedback/thumbnails-with-uploader';
import SplitLayout from '../../../../../container/layout/split';
import style from './style.module.scss';

interface Picture {
  id: number | null;
  url: string;
  [key: string]: any;
}
interface FeedbackConfirmationProps {
  fbCoins: number;
  feedback: any;
  popup?: any;
  onSubmit: ({ feedback }) => any;
  onImageClick: ({ index, image, images }: { index: number; image: Picture; images: Array<Picture> }) => any;
  classes?: { container?: string };
}
const FeedbackConfirmation = ({ fbCoins, feedback, onSubmit, onImageClick, classes }: FeedbackConfirmationProps) => {
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const feedbackImageUrl = (feedback && feedback.feedbackable_image && feedback.feedbackable_image.square_url) || '';
  const feedbackTitle = (feedback && feedback.feedbackable_name) || '';
  const rating = (feedback && feedback.rate) || 0;
  const lowRating = rating < 4;
  const alreadySharedOnFB = !!(feedback && feedback.social_shared);
  const feedbackMessage = (feedback && feedback.review) || '';
  const feedbackUserImages = (feedback && Array.isArray(feedback.pictures) && feedback.pictures) || [];
  const buttonTitle = lowRating ? 'Xong' : alreadySharedOnFB ? 'Đã chia sẻ' : `Chia sẻ và nhận ${fbCoins} Lixicoin`;

  return (
    <div className={classNames(style.feedbackConfirmation, classes && classes.container)}>
      {!!feedback ? (
        <>
          <div className={style.gratitudeMessage}>
            {lowRating
              ? 'Cảm ơn bạn đã tin tưởng và lựa chọn mua hàng tại Lixibox. Xin lỗi bạn về trải nghiệm chưa như ý mà bạn gặp phải. Lixibox sẽ ghi nhận góp ý của bạn và cải thiện trong tương lai ạ.'
              : 'Cảm ơn bạn đã tin tưởng và lựa chọn mua hàng tại Lixibox. Mong bạn có thể giới thiệu người thân, bạn bè biết tới Lixibox nhiều hơn trong thời gian tới nhé.'}
          </div>
          <div className={style.image}>
            <Image className={style.content} src={feedbackImageUrl} alt="Product" />
          </div>
          <div className={style.title}>{feedbackTitle}</div>
          <StarRating rating={rating} classes={{ container: style.rating, star: style.star }} />
          <div className={style.comment}>{feedbackMessage}</div>
          {!!feedbackUserImages.length && (
            <ThumbnailsWithUploader
              pictures={feedbackUserImages}
              isAllowEdit={false}
              classes={{
                container: classNames(style.thumbnails, feedbackUserImages.length <= 4 && style.thumbnailsCentered)
              }}
              onImageClick={onImageClick}
            />
          )}
          <div className={style.buttonContainer}>
            <SubmitButton
              {...Object.assign(
                {},
                {
                  title: buttonTitle,
                  disabled: !lowRating && alreadySharedOnFB,
                  classes: { container: style.button, icon: style.icon },
                  color: lowRating ? 'black' : 'facebook',
                  loading: isButtonLoading,
                  onSubmit: () => {
                    onSubmit({ feedback });
                    setIsButtonLoading(true);
                  }
                },
                !lowRating && { icon: { name: 'brand-facebook-solid', position: 'left' as const } }
              )}
            />
          </div>
        </>
      ) : (
        <Loading style={{ height: 'initial' }} />
      )}
    </div>
  );
};

interface ViewProps {
  fbCoins: number;
  feedback: any;
  popup?: any;
  onSubmit: ({ feedback: any }) => any;
  onImageClick: ({ index, image, images }: { index: number; image: Picture; images: Array<Picture> }) => any;
  classes?: { container?: string };
}
const View = ({ fbCoins, feedback, onSubmit, onImageClick, classes }: ViewProps) => {
  return (
    <SplitLayout
      {...{
        type: 'right',
        size: 'larger',
        mainContainer: (
          <div className={classNames(style.container, classes && classes.container)}>
            <div className={style.header}>Đánh giá box</div>
            <FeedbackConfirmation
              fbCoins={fbCoins}
              feedback={feedback}
              onSubmit={onSubmit}
              onImageClick={onImageClick}
              classes={{ container: style.confirmationBlock }}
            />
            <Invitation
              classes={{ container: style.invitationBlock, scoop: style.scoopClass, button: style.submitButton }}
            />
          </div>
        )
      }}
    />
  );
};

export default View;
