import { get } from '../config/restful-method';

export const fetchFaqTopicList = () =>
  get({
    path: `/faq/topics`,
    description: '[Faq] Get list of topic in faq /faq/topics',
    errorMesssage: `Can't get data. Please try again`
  });

export const fetchFaqArticlesList = ({ topicSlug }) =>
  get({
    path: `/faq/${topicSlug}/articles`,
    description: '[Faq] Get list of articles by topic slug /faq/:topicSlug/articles',
    errorMesssage: `Can't get data. Please try again`
  });

export const getArticleDetail = ({ articleSlug }) =>
  get({
    path: `/faq/articles/${articleSlug}`,
    description: '[Faq] Get detail of articles by ariticles slug /faq/articles/:articleSlug',
    errorMesssage: `Can't get latest boxs data. Please try again`
  });
