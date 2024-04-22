import { PureComponent } from 'react';

import { ALERT_ADD_FEEDBACK_ERROR, ALERT_EDIT_FEEDBACK_ERROR } from '../../../constants/application/alert';
import { FORM_TYPE } from '../../../constants/application/form';
import { FEEDBACK_TYPE_VALUE } from '../../../constants/application/feedback';

import { renderComponent } from './view';
import { IProps } from './model';
import { DEFAULT_PROPS, INITIAL_STATE } from './initialize';

class DeliveryForm extends PureComponent<IProps, any> {
  static defaultProps: IProps = DEFAULT_PROPS;
  constructor(props: IProps) {
    super(props);
    this.state = INITIAL_STATE;
  }

  handleSubmit() {
    this.setState({ submitLoading: true } as any);
    const { data } = this.props as IProps;
    const { rate, textareaValue } = this.state;

    if (!data || !data.item) return;

    if (data.type === FORM_TYPE.CREATE) {
      !!data.item.is_individual &&
        data.handleSubmitForm({
          feedbackableId: data.item.id,
          feedbackableType:
            FEEDBACK_TYPE_VALUE && FEEDBACK_TYPE_VALUE[data.item.is_individual]
              ? FEEDBACK_TYPE_VALUE[data.item.is_individual].title
              : '',
          rate: rate,
          review: textareaValue
        });
    } else {
      data.handleSubmitForm({
        id: data.item.id,
        review: textareaValue,
        rate: 0 !== rate ? rate : data.item.rate
      });
    }
  }

  handleClickOnChange(rate) {
    this.setState({ rate: rate });
  }

  handleTextareaOnChange(event) {
    this.setState({
      textareaValue: event.target.value
    });
  }

  init() {
    const { data } = this.props;
    let tmpRate;
    let tmpTextareaValue = '';
    if (data.type === FORM_TYPE.CREATE) {
      tmpRate = 0;
    } else {
      tmpRate = data.item.rate || 0;
      tmpTextareaValue = data.item.review;
    }

    this.setState({
      rate: tmpRate,
      textareaValue: tmpTextareaValue
    });
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    false === nextProps.feedbackStore.isWaiting && this.init();
    const { data, openAlertAction, closeModalAction } = this.props;

    if (true === this.props.feedbackStore.isWaiting && false === nextProps.feedbackStore.isWaiting) {
      if (true === nextProps.feedbackStore.isSuccess) {
        closeModalAction();
      } else {
        openAlertAction(data.type === FORM_TYPE.CREATE ? ALERT_ADD_FEEDBACK_ERROR : ALERT_EDIT_FEEDBACK_ERROR);
      }
    }
  }

  componentDidMount() {
    this.init();
  }

  render() {
    return renderComponent.bind(this)();
  }
}

export default DeliveryForm;
