export interface IProps {
  appStore?: any;
  faqStore?: any;
  match?: any;
  history?: any;
  fetchFaqTopicListAction?: any;
  fetchFaqArticlesList?: any;
}

export interface IState {
  isOpenTopicModal: boolean;
}
