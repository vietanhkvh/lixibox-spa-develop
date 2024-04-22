import { Component } from 'react';

import { INITIAL_STATE } from './initialize';
import { IProps, IState } from './model';
import renderView from './view';

class FooterInformation extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = INITIAL_STATE;
  }

  render() {
    const { referalCode, openModal, phone } = this.props;
    const { categoryNavigation, infoLinkNavigation, guideLinkNavigation } = this.state;
    return renderView({
      categoryNavigation,
      infoLinkNavigation,
      guideLinkNavigation,
      referalCode,
      openModal,
      phone
    });
  }
}

export default FooterInformation;
