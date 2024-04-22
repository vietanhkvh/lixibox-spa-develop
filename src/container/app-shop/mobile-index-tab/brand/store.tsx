import { fetchBrandListAction } from '../../../../flows/brand/action';

export const mapStateToProps = (state) => ({
  brandStore: state.brand
});

export const mapDispatchToProps = (dispatch) => ({
  fetchBrandListAction: (): void => dispatch(fetchBrandListAction())
});
