export interface IProps {
  item?: any;
  openModalAction?: any;
  addItemToCartAction?: any;

  handleSubmitForm?: any;
  displayCartSumary?: any;
  isAddCartFail?: any;
  isAddCartSuccess?: any;
  type?: any;
}

export interface IState {
  isLoadingAddToCard: boolean;
}
