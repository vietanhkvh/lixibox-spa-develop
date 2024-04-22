import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { ALERT_GENERAL_SUCCESS } from '../../../../../constants/application/alert';
import { MODAL_BOX_DETAIL_PICTURE } from '../../../../../constants/application/modal';
import { ROUTING_COMMUNITY_SUBMITTED_FEEDBACKS } from '../../../../../routings/path';
import { objectToHash } from '../../../../../utils/encode';
import { usePrevious } from '../../../../../utils/hook';
import View from './view';

const FEEDBACK_UPDATE_PHASE_COUNT = 2;

interface Picture {
  id: number | null;
  url: string;
  [key: string]: any;
}
interface DeleteConfirmationState {
  isOpen: boolean;
  loading: boolean;
  image: Picture;
}

const FeedbackEditInnerBlock = ({
  feedbackStore: { feedbackById, isFetchFeedbackById: isFetchedFeedbackById },
  fetchFeedbackByIdAction,
  editFeedbackAction,
  addFeedbackImagesAction,
  deleteFeedbackImageAction,
  openAlertAction,
  openModalAction
}) => {
  const history = useHistory();
  const { feedbackId: _feedbackId } = useParams<{ feedbackId: string }>();
  const feedbackId = parseInt(_feedbackId);

  const currentFeedbackHash = objectToHash({ feedbackId });
  const currentFeedback = feedbackById[currentFeedbackHash];

  const [pictures, setPictures] = useState([]);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [isSubmitButtonLoading, setIsSubmitButtonLoading] = useState(false);
  const [updatePhasesCompleted, setUpdatePhasesCompleted] = useState([]);
  const [deleteConfirmationState, setDeleteConfirmationState] = useState<DeleteConfirmationState>({
    isOpen: false,
    loading: false,
    image: null
  });
  const prevUpdatePhasesCompleted = usePrevious(updatePhasesCompleted);
  const wasFetchedFeedbackById = usePrevious(isFetchedFeedbackById);

  const updateFeedbackDetails = (feedback) => {
    setPictures(feedback.pictures || []);
    setRating(feedback.rate);
    setReview(feedback.review);
  };

  useEffect(() => {
    fetchFeedbackByIdAction({ feedbackId });
    currentFeedback && updateFeedbackDetails(currentFeedback);
  }, []);

  useEffect(() => {
    !wasFetchedFeedbackById && isFetchedFeedbackById && currentFeedback && updateFeedbackDetails(currentFeedback);
  }, [wasFetchedFeedbackById, isFetchedFeedbackById, currentFeedback]);

  useEffect(() => {
    const prevUpdateIncomplete =
      !!prevUpdatePhasesCompleted && prevUpdatePhasesCompleted.length !== FEEDBACK_UPDATE_PHASE_COUNT;
    const nowUpdateComplete = updatePhasesCompleted.length === FEEDBACK_UPDATE_PHASE_COUNT;
    if (prevUpdateIncomplete && nowUpdateComplete) {
      setIsSubmitButtonLoading(false);
      const updatePhasesPassed = updatePhasesCompleted.filter(({ passed }) => passed);
      if (updatePhasesPassed.length === FEEDBACK_UPDATE_PHASE_COUNT) {
        history.push(ROUTING_COMMUNITY_SUBMITTED_FEEDBACKS);
        openAlertAction(ALERT_GENERAL_SUCCESS({ content: 'Chỉnh sửa đánh giá thành công' }));
      }
    }
  }, [prevUpdatePhasesCompleted, updatePhasesCompleted, setIsSubmitButtonLoading, history, openAlertAction]);

  let productImage = '';
  let productName = '';

  if (currentFeedback) {
    const { feedbackable_image, feedbackable_name } = currentFeedback;
    productImage = (feedbackable_image && feedbackable_image.medium_url) || '';
    productName = feedbackable_name || '';
  }

  const onImageClick = ({ index, images }) => {
    openModalAction(
      MODAL_BOX_DETAIL_PICTURE({
        selected: parseInt('101' + index),
        list: images.map(({ url }) => ({ medium_url: url, large_url: url, original_url: url }))
      })
    );
  };

  const onImageUpload = ({ allImages }) => setPictures(allImages);

  const onImageRemove = ({ removedImage, remainingImages }) => {
    if (removedImage.id) {
      // Already uploaded images
      setDeleteConfirmationState({ isOpen: true, loading: false, image: removedImage });
    } else {
      // New images
      setPictures(remainingImages);
    }
  };

  const onImageRemovalConfirmed = (image: Picture) => {
    deleteFeedbackImageAction({
      id: feedbackId,
      pictureId: image.id,
      onSuccess: () => {
        setDeleteConfirmationState({ isOpen: false, loading: false, image: null });
        setPictures((pictures) => pictures.filter((picture) => picture.id !== image.id));
      }
    });
    setDeleteConfirmationState((state) => Object.assign({}, state, { loading: true }));
  };

  const onImageRemovalRejected = () => setDeleteConfirmationState({ isOpen: false, loading: false, image: null });

  const onSubmit = ({ rating, review }) => {
    const pictureURIsToUpload = pictures.filter(({ id }) => !id).map(({ url }) => url);

    editFeedbackAction({
      id: feedbackId,
      rate: rating,
      review,
      title: '',
      enableSuccessAlert: false,
      onSuccess: () => setUpdatePhasesCompleted((phases) => phases.concat({ type: 'contentUpdate', passed: true })),
      onReject: () => setUpdatePhasesCompleted((phases) => phases.concat({ type: 'contentUpdate', passed: false }))
    });
    addFeedbackImagesAction({
      id: feedbackId,
      pictures: pictureURIsToUpload,
      onSuccess: () => setUpdatePhasesCompleted((phases) => phases.concat({ type: 'imageUpload', passed: true })),
      onReject: () => setUpdatePhasesCompleted((phases) => phases.concat({ type: 'imageUpload', passed: false }))
    });
    setIsSubmitButtonLoading(true);
    setUpdatePhasesCompleted([]);
  };

  return (
    <View
      {...{
        currentFeedback,
        productImage,
        productName,
        pictures,
        rating,
        review,
        isSubmitButtonLoading,
        deleteConfirmationState,
        onSubmit,
        onImageUpload,
        onImageRemove,
        onImageClick,
        onImageRemovalConfirmed,
        onImageRemovalRejected
      }}
    />
  );
};

export default FeedbackEditInnerBlock;
