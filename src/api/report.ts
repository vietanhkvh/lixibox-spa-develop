import { getCsrfToken } from '../utils/auth';
import { get, post } from '../config/restful-method';

export const getReportsFeatures = ({ code }) =>
  get({
    path: `/reports/features/${code}?csrf_token=${getCsrfToken()}`,
    description: '[Reports] Get reports features',
    errorMesssage: `Can't get data. Please try again`
  });

export const feedbackReportsFeatures = ({ code, inputIds, outputIds, removedIds }) => {
  return post({
    path: `/reports/features/${code}/feedbacks`,
    data: {
      csrf_token: getCsrfToken(),
      input_ids: inputIds,
      output_ids: outputIds,
      removed_ids: removedIds,
      code
    },
    description: '[Reports] Feedback reports features',
    errorMesssage: `Can't add love. Please try again`
  });
};
