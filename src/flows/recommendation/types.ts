import { CartRecommendation } from '../../types/api/recommendation';

export interface RecommendationState {
  cartRecommendationList: Array<CartRecommendation>;
  cartRecommendationStatus: {
    fetching: boolean;
    loaded: boolean;
    errored: boolean;
  };
}
