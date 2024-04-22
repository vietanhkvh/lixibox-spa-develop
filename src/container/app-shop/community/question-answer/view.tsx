import FeedList from '../../../../components/container/feed-list';
import SubmitButton from '../../../../components/ui/submit-button';
import InputField from '../../../../components/ui/input-field';
import SelectBox from '../../../../components/ui/select-box';
import SplitLayout from '../../../layout/split';
import RightBarCommunity from '../right-bar-container';
import { auth } from '../../../../utils/auth';
import { VALIDATION } from '../../../../constants/application/global';

import STYLE from './style';
import { IState, IProps } from './model';
import { categoryList } from './initialize';

const renderTitle = ({ title }) => {
  return <span style={STYLE.wrapSelect.selectGroup.title}>{title}</span>;
};

const renderSelect = () => {
  const wrapSelectStyle = STYLE.wrapSelect;

  const categoryIdProps = {
    title: 'Chọn chuyên mục',
    type: InputField.INPUT_TYPE.TEXT,
    name: InputField.INPUT_NAME.TITLE,
    validate: [VALIDATION.REQUIRED],
    // readonly: submitLoading,
    // onFocus: this.handleInputOnFocus.bind(this),
    // onSubmit: this.handleSubmit.bind(this),
    onChange: () => {},
    style: { height: 30 },
    list: categoryList,
    search: 'Tìm chuyên mục'
  };

  return (
    <div style={wrapSelectStyle}>
      <div style={wrapSelectStyle.selectGroup}>
        {renderTitle({ title: 'Chọn chuyên mục' })}
        <SelectBox {...categoryIdProps} />
      </div>
      <div style={wrapSelectStyle.selectGroup}>
        {renderTitle({ title: 'Tìm sản phẩm liên quan' })}
        <input style={wrapSelectStyle.selectGroup.input} placeholder={'Ví dụ: Halio...'} autoComplete={'off'} />
      </div>
    </div>
  );
};

const renderInfo = ({ handleClick, avatarUrl }) => {
  return (
    <div style={STYLE.wrapInfo} onClick={handleClick}>
      <div style={Object.assign({}, { backgroundImage: `url(${avatarUrl})` }, STYLE.wrapInfo.avatar)} />
      <input style={STYLE.wrapInfo.input} placeholder={'Đăng câu hỏi của bạn...'} autoComplete={'off'} />
    </div>
  );
};

const renderMainContainer = ({
  list,
  profile,
  handleSubmit,
  handleClick,
  handleFocusClick,
  showInfoQuestion,
  showFocus
}) => {
  const feedListProps = {
    history: window.history,
    list,
    userProfile: profile,
    style: STYLE.feedList
  };

  const buttonSubmitProps = {
    title: 'Xem thêm',
    style: STYLE.wrapBtn.btn,
    //loading: loginSubmitLoading,
    onSubmit: handleSubmit
  };

  const questionBtnProps = {
    title: 'ĐĂNG CÂU HỎI',
    style: STYLE.wrapQuestionBtn.questionBtn
  };

  const avatarUrl = auth.loggedIn() ? profile?.avatar?.medium_url || '' : '';

  return (
    <div style={STYLE}>
      {showFocus && <div style={STYLE.wrapFocus} onClick={handleFocusClick} />}
      <div style={Object.assign({}, STYLE.container, showFocus && STYLE.container.active)}>
        {renderInfo({ handleClick, avatarUrl })}
        {showInfoQuestion && renderSelect()}
        {showInfoQuestion && (
          <div style={STYLE.wrapQuestionBtn}>
            <SubmitButton {...questionBtnProps} />
          </div>
        )}
      </div>
      <div className="question-anwser-desktop">
        <FeedList {...feedListProps} />
      </div>
      {list && 0 !== list.length && (
        <div style={STYLE.wrapBtn}>
          <SubmitButton {...buttonSubmitProps} />
        </div>
      )}
    </div>
  );
};

export function renderComponent({ props, state, handleSubmit, handleClick, handleFocusClick }) {
  const {
    authStore: { profile },
    activityFeedStore: { list, hashtags },
    feedbackStore: { userBoxesToFeedback }
  } = props as IProps;

  const { showInfoQuestion, showFocus } = state as IState;

  const rightBarCommunityProps = {
    hashtags,
    userBoxesToFeedback
  };

  const splitLayoutProps = {
    type: 'right',
    size: 'largest',
    subContainer: <RightBarCommunity {...rightBarCommunityProps} />,
    mainContainer: renderMainContainer({
      list: list || [],
      profile,
      handleSubmit,
      handleClick,
      handleFocusClick,
      showInfoQuestion,
      showFocus
    })
  };

  return (
    <div style={STYLE.wrapLayout}>
      <SplitLayout {...splitLayoutProps} />
    </div>
  );
}
