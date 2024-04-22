import { PureComponent } from 'react';
import renderView from './view';
import { IProps, IState } from './model';

class InfoPanelContainer extends PureComponent<IProps, IState> {
  render() {
    return renderView(this.props);
  }
}

export default InfoPanelContainer;
