import { Component } from 'react';

import { changeAlias } from '../../../utils/format';

import { ISelectBoxProps, ISelectBoxState } from './model';
import { DEFAULT_PROPS, INITIAL_STATE } from './initialize';
import { renderComponent } from './view';

class SelectBox extends Component<ISelectBoxProps, ISelectBoxState> {
  static defaultProps: ISelectBoxProps = DEFAULT_PROPS;
  private hoverTimeOut;

  constructor(props) {
    super(props);
    this.state = INITIAL_STATE(this.props.list);
    this.hoverTimeOut = null;
  }

  /** Update propList / filteredList when parent change */
  UNSAFE_componentWillReceiveProps(nextProps) {
    const propsList = Array.isArray(nextProps.list)
      ? nextProps.list.map((item) => {
          item.hover = false;
          return item;
        })
      : [];

    this.setState({
      list: propsList,
      filteredList: propsList
    } as ISelectBoxState);
  }

  /** Toggle to show / hide selectlist */
  toggleSelect(newOpenValue) {
    this.setState(
      (prevState, props) =>
        ({
          open: newOpenValue
        } as ISelectBoxState)
    );
  }

  /**
   * Close select list
   * 1. Reset filteredList
   * 2. Close List select
   */

  closeSelectList() {
    this.setState({
      filteredList: Array.isArray(this.state.list)
        ? this.state.list.map((item) => {
            item.hover = false;
            return item;
          })
        : []
    } as ISelectBoxState);

    this.toggleSelect(false);
  }

  /** Set hover state for background hightlight */
  hoverValue(_item) {
    this.setState(
      (prevState, props) =>
        ({
          filteredList: Array.isArray(prevState.filteredList)
            ? prevState.filteredList.map((item) => {
                item.hover = item.id === _item.id;
                return item;
              })
            : []
        } as ISelectBoxState)
    );
  }

  /**
   *
   * @param {*} _item : item in selected in list
   * 1. Update state for filteredList
   * 2. close select list
   */
  selectValue(_item) {
    this.setState(
      (prevState, props) =>
        ({
          filteredList: Array.isArray(prevState.list)
            ? prevState.list.map((item) => {
                item.selected = item.id === _item.id ? (this.props.onChange(_item), true) : false;
                return item;
              })
            : [],
          open: false
        } as ISelectBoxState)
    );
  }

  /**
   * Handle select value of selectbox on mobile device
   */
  selectValueMobile(event) {
    const id = parseInt(event.target.value);
    const { list, onChange } = this.props;
    const choseList = Array.isArray(list) ? list.filter((item) => item.id === id) : [];

    choseList && choseList.length > 0 && onChange(choseList[0]); // Push data to child component

    this.setState({ open: false });
  }

  /**
   * Search filter in list
   * @param {*} event : event from search input
   * get value from seacrh input to fitler list select
   */
  searchFilter(event) {
    const valueSearch = changeAlias(event.target.value);
    this.setState(
      (prevState, props) =>
        ({
          filteredList: prevState.list.filter((item) => changeAlias(item.title).indexOf(valueSearch) >= 0)
        } as ISelectBoxState)
    );
  }

  handleOnHover(type) {
    if (true === type) {
      clearTimeout(this.hoverTimeOut);
    } else {
      this.hoverTimeOut = setTimeout(() => this.closeSelectList(), 500);
    }
  }

  render() {
    return renderComponent.bind(this)();
  }
}

export default SelectBox;
