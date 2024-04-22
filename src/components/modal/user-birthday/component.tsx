import { Component } from 'react';

import { convertDateToDDMMYYY, convertUnixTimeYYYYMMDD } from '../../../utils/encode';
import { DATETIME_TYPE_FORMAT } from 'constants/application/global';

import { INITIAL_STATE, DEFAULT_PROPS } from './initialize';
import { IUserBirthdayProps, IUserBirthdayState } from './model';
import renderView from './view';

class UserBirthday extends Component<IUserBirthdayProps, IUserBirthdayState> {
  static defaultProps: IUserBirthdayProps = DEFAULT_PROPS;

  constructor(props: IUserBirthdayProps) {
    super(props);
    this.state = INITIAL_STATE;
  }

  handleInputOnChange(element) {
    const { target } = element;
    const inputValue = { value: target?.value, valid: target?.value.length > 0 };
    this.setState({ inputValue });
  }

  handleSubmit() {
    const { inputValue } = this.state as IUserBirthdayState;
    const { setBirthdayAction } = this.props as IUserBirthdayProps;

    const birthday =
      inputValue && inputValue.value && !!inputValue.value.length ? convertDateToDDMMYYY(inputValue.value) : null;

    birthday && setBirthdayAction({ birthday });
  }

  handleToggleMinial() {
    this.setState({ isMinimal: !this.state.isMinimal });
  }

  componentDidUpdate(prevProps: Readonly<IUserBirthdayProps>): void {
    const { isSetUserBirthdaySuccess } = this.props;
    if (isSetUserBirthdaySuccess !== prevProps.isSetUserBirthdaySuccess)
      isSetUserBirthdaySuccess && this.setState({ type: 2 });
  }

  render() {
    const { userInfo, userBirthday, setBirthdayAction } = this.props;
    const { inputValue, isMinimal, content, type } = this.state;

    const userBirthMonth = new Date(convertUnixTimeYYYYMMDD(userInfo?.birthday, DATETIME_TYPE_FORMAT.SHORT_DATE));
    const currentMonth = new Date().getMonth();
    const userBirthMonthStr =
      currentMonth === userBirthMonth?.getMonth()
        ? ''
        : userBirthMonth.toLocaleString('vi-VN', {
            month: 'long'
          });
    const successMessage = `Cảm ơn bạn! Quà tặng đặc biệt sẽ được gửi cùng đơn hàng phát sinh trong tháng sinh nhật ${
      !userInfo?.membership_level ? ', sau khi hạng thành viên của bạn là "SILVER" hoặc cao hơn' : ''
    }! Chúc bạn có trải nghiệm mua sắm thú vị tại Lixibox.`;

    const renderViewProps = {
      isMinimal,
      inputValue,
      content,
      type,
      props: Object.assign({}, this.props, {
        userBirthMonth: userBirthMonthStr,
        isBirthdaySet: !!userInfo?.birthday,
        data: { box: userBirthday?.box, setBirthdayAction }
      }),
      handleSubmit: this.handleSubmit.bind(this),
      handleToggleMinial: this.handleToggleMinial.bind(this),
      handleInputOnChange: this.handleInputOnChange.bind(this),
      successMessage
    };

    return renderView(renderViewProps);
  }
}

export default UserBirthday;
