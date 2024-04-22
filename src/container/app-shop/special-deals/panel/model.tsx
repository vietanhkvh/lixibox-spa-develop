export interface IProps {
  match: {
    params: {
      idSpecialDeal?: any;
    };
  };

  specialDealStore?: any;
  fetchSpecialDealList?: any;
  clearDataSpecialDealAction?: any;
  clearDataSpecialDealListAction?: any;
}

export interface IState {}
