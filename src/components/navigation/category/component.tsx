import { Component } from 'react';

import { DEFAULT_PROPS } from './initialize';
import { IProps, IState } from './model';
import renderView from './view';

class FilterCategory extends Component<IProps, IState> {
  static defaultProps: IProps = DEFAULT_PROPS;

  handleNavigateTo(target) {
    this.props.history.push(target);
  }

  render() {
    const { listMenu, title } = this.props;
    return renderView({
      listMenu,
      title,
      navigateTo: this.handleNavigateTo.bind(this)
    });
  }
}

export default FilterCategory;
