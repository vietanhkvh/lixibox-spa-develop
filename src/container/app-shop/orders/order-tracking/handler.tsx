import { IProps } from './model';
export function handleInputOnChange(e) {
  const val = e.target.value;
  const { fetchOrderTrackingByCode } = this.props as IProps;

  if (' ' === val || 0 === val.length) {
    this.setState({ isSearch: false, codeSearch: '' });
    return;
  }

  this.setState({ isSearch: false, codeSearch: val });

  const valSearch = val.trim();
  7 < valSearch.length && this.fetchData(valSearch, fetchOrderTrackingByCode);
}

export function handleSearchOnKeyUp(e) {
  13 === e.keyCode && this.handleFetchData();
}

export function handleSearch() {
  this.handleFetchData();
}

export function fetchData(codeSearch, fetchOrderTrackingByCode) {
  this.setState({ codeSearch, isSearch: true });
  fetchOrderTrackingByCode({ code: codeSearch });
}

export function handleFetchData() {
  this.fetchData(this.state.codeSearch.trim(), this.props.fetchOrderTrackingByCode);
}

export function handleGetMomoPaymentAddressUrl(orderNumber) {
  if (!orderNumber) return;

  this.props.getMomoPaymentAddressUrlAction({ orderNumber });
}
