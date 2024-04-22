import { Component } from 'react';

import { IProps, IState } from './model';
import { DEFAULT_PROPS, INITIAL_STATE } from './initialize';
import { renderComponent } from './view';

class DiscussionItem extends Component<IProps, IState> {
  static defaultProps: IProps = DEFAULT_PROPS;

  constructor(props: IProps) {
    super(props);
    this.state = INITIAL_STATE;
  }

  handleInputOnChange(e) {
    const val = e.target.value;
    if (' ' === val || 0 === val.length) {
      this.setState({ txtComment: '' });
      return;
    }
    this.setState({ txtComment: val });
  }

  handleOnKeyUp(e) {
    const { commentChild } = this.props;
    let val = e.target.value.trim();
    0 !== val.length && 13 === e.keyCode && this.addComment(commentChild.id, val);
  }

  handleAddComment() {
    const { commentChild } = this.props;
    const { txtComment } = this.state;
    txtComment && 0 !== txtComment.length && this.addComment(commentChild.id, txtComment);
  }

  handleReply(comment) {
    /* Notify onReply to parent, to open discussion modal when needed */
    this.props.onReply && this.props.onReply(comment);
  }

  addComment(id, content) {
    const { addDiscussionComment } = this.props;
    this.setState({ loginSubmitLoading: true, txtComment: '' });
    0 !== content.trim().length && addDiscussionComment({ id, content });
  }

  setInputCommentRef(ref) {
    // this.inputCommentRef = ref;
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    !this.props.isAddDiscussionCommentSuccess &&
      nextProps.isAddDiscussionCommentSuccess &&
      this.setState({ loginSubmitLoading: false });
  }

  render() {
    const args = {
      props: this.props,
      state: this.state,
      handleAddComment: this.handleAddComment.bind(this),
      handleInputOnChange: this.handleInputOnChange.bind(this),
      handleOnKeyUp: this.handleOnKeyUp.bind(this),
      handleReply: this.handleReply.bind(this),
      setInputCommentRef: this.setInputCommentRef.bind(this)
    };
    return renderComponent(args);
  }
}

export default DiscussionItem;
