import { fetchCountdownListAction } from 'flows/countdown/action';
import { fetchPromotionsAction } from '../../../../flows/theme/action';

export const mapStateToProps = (state) => ({
  promotions: state.theme.promotions,
  countdownStore: state.countdown
});

export const mapDispatchToProps = (dispatch) => {
  return {
    fetchPromotionsAction: (): void => dispatch(fetchPromotionsAction()),
    fetchCountdownListAction: () => dispatch(fetchCountdownListAction())
  };
};
