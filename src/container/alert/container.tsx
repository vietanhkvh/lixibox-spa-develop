import { Component } from 'react';

import { TIME_OUT_CLOSE_ALERT } from '../../constants/application/alert';
import { DEFAULT_PROPS, INITIAL_STATE } from './initialize';
import { IProps, IState } from './model';
import renderView from './view';

class Alert extends Component<IProps, IState> {
  static defaultProps = DEFAULT_PROPS;

  constructor(props: IProps) {
    super(props);
    this.state = INITIAL_STATE;
  }

  componentDidMount() {
    this.forceCloseOldMessage();
  }

  forceCloseOldMessage() {
    const {
      alertStore: { list },
      closeAlert
    } = this.props;
    const currentTime = new Date().getTime();

    Array.isArray(list) &&
      list.forEach((item) => {
        const offsetTime = currentTime - item.id;
        offsetTime > 10000 && closeAlert(item.id);
      });
  }

  /**
   * Set automation closing for alert item
   *
   * @param {Array<alertItem>} alertList from nextProps
   *
   * 1. Push new item into waiting show -> display with animation.
   * TIME_OUT_OPEN_ALERT 100ms
   *
   * 2. Push new item into waiting close -> hide with aninmation
   * TIME_OUT_CLOSE_ALERT 6.000ms
   *
   * 3. Clean up list waitingShow/waitingClose by current item
   * 4. Update store to final remove alert item
   */
  setAutoClose(alertList) {
    const { closeAlert } = this.props as IProps;
    const lastItemIndex = alertList.length - 1;

    setTimeout(() => {
      /** 4. Update store to final remove alert item */
      closeAlert(alertList[lastItemIndex].id);
      let removeFist = true;
      Array.isArray(alertList) &&
        alertList.forEach((item) => {
          if (item.id === alertList[lastItemIndex].id) {
            removeFist = false;
          }
          removeFist && closeAlert(item.id);
        });
    }, TIME_OUT_CLOSE_ALERT + 620);
  }

  /**
   * Force close alert item by id
   *
   * @param {number} alertId
   *
   * 1. Push new item into waiting close -> hide with aninmation
   * 2. Clean up list waitingShow/waitingClose by current item
   * 3. Update store to final remove alert item
   */
  handleCloseAlert(alertId) {
    const { closeAlert } = this.props;
    const { waitingClose } = this.state as IState;

    /** 1. Push new item into waiting close -> hide with aninmation */
    this.setState({ waitingClose: [...waitingClose, alertId] } as IState);
    closeAlert(alertId);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    /**
     * When receive new item alert item
     * - Set up time to automation closing
     */
    if (nextProps.alertStore.list.length > ((this.props.alertStore && this.props.alertStore.list.length) || 0)) {
      this.setAutoClose(nextProps.alertStore.list);
    }
  }

  shouldComponentUpdate(nextProps: IProps, nextState: IState) {
    const currentAlertLen = (this.props.alertStore && this.props.alertStore.list.length) || 0;
    const nextAlertLen = (nextProps.alertStore && nextProps.alertStore.list.length) || 0;
    if (currentAlertLen !== nextAlertLen) {
      return true;
    }

    return false;
  }

  render() {
    const renderViewProps = {
      props: this.props,
      state: this.state,
      handleCloseAlert: this.handleCloseAlert.bind(this)
    };

    return renderView(renderViewProps);
  }
}

export default Alert;
