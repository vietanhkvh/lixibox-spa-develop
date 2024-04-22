import { fetchFaqTopicListAction, fetchFaqArticlesList } from '../../../../flows/faq/action';

export const mapStateToProps = (state) => ({
  faqStore: state.faq,
  appStore: state.app
});

export const mapDispatchToProps = (dispatch) => ({
  fetchFaqTopicListAction: () => dispatch(fetchFaqTopicListAction()),
  fetchFaqArticlesList: (data) => dispatch(fetchFaqArticlesList(data))
});
