import { Component } from 'react';

import { IProps, IState } from './model';
import { DEFAULT_PROPS, INITIAL_STATE } from './initialize';
import renderView from './view';

class SearchPopularComponent extends Component<IProps, IState> {
  static defaultProps: IProps = DEFAULT_PROPS;

  constructor(props: IProps) {
    super(props);
    this.state = INITIAL_STATE;
  }

  autoSetHeight() {
    setTimeout(() => {
      const searchPopularList: any = document.getElementById('search-popular-list');
      if (!searchPopularList) return;
      const item = searchPopularList.children;
      const itemKey = Object.keys(item);

      const totalWidth = itemKey.reduce((acc, cur) => {
        const currentWidth = Math.round(item[cur].getBoundingClientRect().width) + 12;
        return acc + currentWidth;
      }, 0);

      let halfWidth = 0;
      itemKey.forEach((cur) => {
        const currentWidth = Math.round(item[cur].getBoundingClientRect().width) + 12;

        if (halfWidth < totalWidth / 2) {
          halfWidth += currentWidth;
        }
      }, 0);

      this.setState({ panelWidth: halfWidth } as any);
    }, 500);
  }

  componentDidMount() {
    if (!!this.props.list.length) {
      this.autoSetHeight();
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (!this.props.list.length && !!nextProps.list.length) {
      this.autoSetHeight();
    }
  }

  render() {
    const args = {
      props: this.props,
      state: this.state
    };

    return renderView(args);
  }
}

export default SearchPopularComponent;
