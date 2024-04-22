import { Component } from 'react';
import { connect } from 'react-redux';

import { ROUTING_LIXI_COIN_FAQ } from 'routings/path';
import { mapStateToProps, mapDispatchToProps } from './store';
import { DEFAULT_PROPS, INITIAL_STATE } from './initialize';
import { IProps, IState } from './model';
import renderView from './view';

/**
 * Adds support for two routes
 * 1. /lixicoin/faq
 * 2. /membership/faq
 */
class LixiCoinContainer extends Component<IProps, IState> {
  static defaultProps: IProps = DEFAULT_PROPS;

  constructor(props: IProps) {
    super(props);
    this.state = INITIAL_STATE as IState;
  }

  init() {
    this.props.getMembershipAction();
  }

  componentDidMount() {
    this.init();
  }

  handleCollapseItemClick(id) {
    const { collapseOpenId } = this.state;
    let newCollapseOpenId;
    if (collapseOpenId.indexOf(id) >= 0) {
      newCollapseOpenId = collapseOpenId.filter((item: number) => item !== id);
    } else {
      newCollapseOpenId = [...collapseOpenId, id];
    }

    this.setState({ collapseOpenId: newCollapseOpenId });
  }

  render() {
    const {
      cartStore: {
        constants: {
          box_feedback_lixicoin: lixicoinPerFeedback,
          unboxing_reward: unboxingReward,
          mobile_referrer: referralReward
        }
      }
    } = this.props;
    const isLixicoinFaqView = window.location.pathname === ROUTING_LIXI_COIN_FAQ;

    return renderView(
      this.props,
      this.state,
      this.handleCollapseItemClick.bind(this),
      lixicoinPerFeedback,
      unboxingReward,
      referralReward,
      isLixicoinFaqView
    );
  }
}

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(LixiCoinContainer);
