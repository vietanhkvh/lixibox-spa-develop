import { Component } from 'react';
import renderView from './view';
import { IProps, IState } from './model';
import { DEFAULT_PROPS, INITIAL_STATE } from './initialize';

class ReorderContainer extends Component<IProps, IState> {
  static defaultProps: IProps = DEFAULT_PROPS;
  constructor(props: IProps) {
    super(props);
    this.state = INITIAL_STATE;
  }

  init(props = this.props) {
    const {
      fetchGroupsByIdAction,
      match: {
        params: { idGroup }
      }
    } = props as IProps;

    const params = { id: idGroup };

    fetchGroupsByIdAction(params);
  }

  componentDidMount() {
    this.init(this.props);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const {
      match: {
        params: { idGroup }
      }
    } = this.props;

    idGroup !== nextProps.match.params.idGroup && this.init(nextProps);
  }

  render() {
    const args = { props: this.props };

    return renderView(args);
  }
}

export default ReorderContainer;
