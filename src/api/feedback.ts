import { getCsrfToken } from '../utils/auth';
import { get, post, patch, del } from '../config/restful-method';

/** User feedbacks */
export interface IFetchUserFeedbacksParam {
  page?: number;
  perPage?: number;
}

export const fetchUserFeedbacks = ({ page = 1, perPage = 50 }: IFetchUserFeedbacksParam) => {
  const query = `?page=${page}&per_page=${perPage}`;

  return get({
    path: `/user/feedbacks${query}`,
    description: '[Feedback] Fetch user feedbacks /user/feedbacks',
    errorMesssage: `Can't fetch user feedbacks. Please try again`
  });
};

/** User feedbacks */
export interface IFetchUserBoxesToFeedbackParam {
  page?: number;
  perPage?: number;
}

export const fetchUserBoxesToFeedback = ({ page = 1, perPage = 50 }: IFetchUserBoxesToFeedbackParam) => {
  const query = `?page=${page}&per_page=${perPage}`;

  return get({
    path: `/user/boxes_to_feedback${query}`,
    description: '[Feedback] Fetch user boxes to feedback /user/boxes_to_feedback',
    errorMesssage: `Can't fetch user boxes to feedback. Please try again`
  });
};

/** Add new feedback */
export interface IAddFeedbackParam {
  feedbackableId?: string;
  feedbackableType?: string;
  rate?: number;
  review?: string;
  title?: string;
  pictures?: any;
}

export const addFeedback = ({
  feedbackableId,
  feedbackableType,
  rate,
  review,
  title = '',
  pictures = []
}: IAddFeedbackParam) => {
  const csrf_token = getCsrfToken();
  const feedbackable_id = feedbackableId;
  const feedbackable_type = feedbackableType;
  return post({
    path: '/feedbacks',
    data: {
      csrf_token,
      feedbackable_id,
      feedbackable_type,
      rate,
      review,
      title,
      pictures
    },
    description: '[Feedback] Add feedback /feedbacks',
    errorMesssage: `Can't add feedback. Please try again`
  });
};

/** Edit feedback */
export interface IEditFeedbackParam {
  id?: number;
  review?: string;
  rate?: string;
  title?: string;
}

export const editFeedback = ({ id, review, rate, title }: IEditFeedbackParam) => {
  const csrf_token = getCsrfToken();
  return patch({
    path: `/feedbacks/${id}`,
    data: { csrf_token, review, rate, title },
    description: '[Feedback] Edit feedback /feedbacks/:id',
    errorMesssage: `Can't edit feedback. Please try again`
  });
};

interface AddFeedbackImagesParams {
  id: number;
  pictures: Array<string>; // Base64 encoded string
}
export const addFeedbackImages = ({ id, pictures }: AddFeedbackImagesParams) => {
  const csrf_token = getCsrfToken();
  return post({
    path: `/feedbacks/${id}/pictures`,
    data: { csrf_token, pictures },
    description: '[Feedback] Add feedback images /feedbacks/:id/pictures',
    errorMesssage: `Can't add feedback image. Please try again`
  });
};

interface DeleteFeedbackImageParams {
  id: number;
  pictureId: number;
}
export const deleteFeedbackImage = ({ id, pictureId }: DeleteFeedbackImageParams) => {
  const csrf_token = getCsrfToken();
  return del({
    path: `/feedbacks/${id}/pictures/${pictureId}`,
    data: { csrf_token },
    description: '[Feedback] Delete feedback image /feedbacks/:id/pictures/:picture_id',
    errorMesssage: `Can't delete feedback image. Please try again`
  });
};

export const fetchFeedbackById = ({ feedbackId }) => {
  return get({
    path: `/feedbacks/${feedbackId}`,
    description: '[Feedback] Fetch feedback /feedbacks/:id',
    errorMesssage: `Can't fetch feedback by id. Please try again`
  });
};

export const shareBoxOnFacebook = ({ id }: { id: string }) => {
  const csrf_token = getCsrfToken();
  return patch({
    path: `/boxes/${id}/shared`,
    data: { csrf_token },
    description: '[Feedback] Share box on Facebook /boxes/:id/shared',
    errorMesssage: `Can't share box on Facebook. Please try again`
  });
};
