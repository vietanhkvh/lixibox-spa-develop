import { Component } from 'react';
import { connect } from 'react-redux';

import { isMobileVersion } from '../../../../utils/responsive';
import { ROUTING_SHOP_INDEX } from '../../../../routings/path';

import { mapStateToProps, mapDispatchToProps } from './store';
import { IPromotionProps, IPromotionState } from './model';
import { DEFAULT_PROPS, INITIAL_STATE } from './initialize';
import { renderComponent } from './view';

class PromotionContainer extends Component<IPromotionProps, IPromotionState> {
  static defaultProps: IPromotionProps = DEFAULT_PROPS;

  constructor(props: IPromotionProps) {
    super(props);
    this.state = INITIAL_STATE as IPromotionState;
  }

  componentDidMount() {
    const {
      fetchPromotionsAction,
      fetchCountdownListAction,
      countdownStore: { isLoaded }
    } = this.props as IPromotionProps;

    !isMobileVersion() && this.props.history.push(`${ROUTING_SHOP_INDEX}`);

    fetchPromotionsAction();
    !isLoaded && fetchCountdownListAction();
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.promotions.length !== nextProps.promotions.length) return true;

    return false;
  }

  render() {
    return renderComponent.bind(this)();
  }
}

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(PromotionContainer);
