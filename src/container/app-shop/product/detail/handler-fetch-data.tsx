export function handleFetchSavingBox() {
  const stateKey = 'isFetchSavingBox';
  if (generalCheckIsFetchedData.bind(this)(stateKey)) return;

  const { idProduct } = this.state;
  generalResetState.bind(this)(stateKey, this.props.fetchSavingSetsBoxesAction, {
    productId: idProduct,
    page: 1,
    perPage: 10
  });
}

export function handleFetchRelatedBox() {
  const stateKey = 'isFetchRelatedBox';
  if (generalCheckIsFetchedData.bind(this)(stateKey)) return;

  const { idProduct } = this.state;
  generalResetState.bind(this)(stateKey, this.props.fetchRelatedBoxesAction, { productId: idProduct, limit: 10 });
}

export function handleFetchWatchedList() {
  const stateKey = 'isFetchWatchedList';
  if (generalCheckIsFetchedData.bind(this)(stateKey)) return;

  generalResetState.bind(this)(stateKey, this.props.fetchUserWatchedListAction, { page: 1, perPage: 25 });
}

export function handleFetchMagazineForBox() {
  const stateKey = 'isFetchMagazineForBox';
  if (generalCheckIsFetchedData.bind(this)(stateKey)) return;

  const { idProduct } = this.state;
  generalResetState.bind(this)(stateKey, this.props.fetchMagazinesBoxesAction, {
    productId: idProduct,
    page: 1,
    perPage: 10
  });
}

export function handleFetchLoveBox() {
  const stateKey = 'isFetchLoveBox';
  if (generalCheckIsFetchedData.bind(this)(stateKey)) return;

  const { idProduct } = this.state;
  generalResetState.bind(this)(stateKey, this.props.getLoveBoxByIdAction, { id: idProduct });
}

export function handleFetchShopTheLook() {
  const stateKey = 'isFetchShopTheLook';
  if (generalCheckIsFetchedData.bind(this)(stateKey)) return;

  const { idProduct } = this.state;
  generalResetState.bind(this)(stateKey, this.props.fetchMakeupsAction, { boxId: idProduct });
}

function generalCheckIsFetchedData(stateKey: string) {
  const state = this.state[stateKey];
  return !!state;
}

function generalResetState(stateKey: string, callBack: Function, callBackData: any) {
  this.setState({ [stateKey]: true }, () => 'function' === typeof callBack && callBack(callBackData));
}
