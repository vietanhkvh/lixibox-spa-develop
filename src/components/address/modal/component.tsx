import { Component } from 'react';

import { ADDRESS_SELECT_STEP } from '../../../constants/application/address';
import { isUndefined } from '../../../utils/validate';
import { objectToHash } from '../../../utils/encode';
import { changeAlias } from '../../../utils/format';

import { renderComponent } from './view';
import { IProps, IState } from './model';
import { DEFAULT_PROPS, INITIAL_STATE } from './initialize';

class AddressModal extends Component<IProps, any> {
  static defaultProps: IProps = DEFAULT_PROPS;
  constructor(props: IProps) {
    super(props);
    this.state = INITIAL_STATE;
  }

  /**
   * Handle Event select city / province
   * @param {*} province data received from select box
   * 1. Assign list district by city selected
   * 2. Reset value calculated to 'không xác định'
   */
  handleOnChangeProvince(province) {
    const provinceId = province.id;

    if (!!this.state.districtData[provinceId]) {
      this.props.fetchWardByProvinceIdAction({ provinceId });

      this.setState({
        provinceId,
        addressSelectStep: ADDRESS_SELECT_STEP.DISTRICT,
        provinceName: province.title,
        keySearch: '',
        wardList: [],
        filteredList: [],
        districtList: this.state.districtData[provinceId],
        canShowWardList: false,
        canShowDistrictList: true,
        canShowProvinceList: false
      });
    }
  }

  handleFetchWardByProvinceId() {
    const {
      fetchWardByProvinceIdAction,
      provinceStore: { wardList }
    } = this.props;
    const provinceId = 0;
    const keyHash = objectToHash({ provinceId });

    wardList && isUndefined(wardList[keyHash]) && fetchWardByProvinceIdAction({ provinceId });
  }

  /**
   * Hangle Event select district
   * @param {*} district data receivec from select box
   * Calculate price for delivery
   */
  handleOnChangeDistrict(district) {
    const {
      onSaveAddressSelected,
      // data: { showTimeAndFeeShip, boxId },
      // fetchShipFeeByDistrictIdAction
      getFromDistrict
    } = this.props as IProps;
    if (!getFromDistrict) {
      this.setState(
        {
          addressSelectStep: ADDRESS_SELECT_STEP.WARD,
          districtId: district.id,
          districtName: district.title,
          filteredList: [],
          keySearch: '',
          canShowProvinceList: false,
          canShowDistrictList: false,
          canShowWardList: true
        },
        this.generateWardList
      );
    } else {
      const { provinceId, provinceName } = this.state as IState;
      onSaveAddressSelected({
        provinceId,
        provinceName,
        districtId: district.id,
        districtName: district.title
      });
    }
  }

  /**
   * Handle Event select ward
   * @param {*} ward data receive from select box
   */
  handleOnChangeWard(ward) {
    const { onSaveAddressSelected } = this.props as IProps;
    const { provinceId, provinceName, districtId, districtName } = this.state as IState;

    onSaveAddressSelected({
      provinceId,
      provinceName,
      districtId,
      districtName,
      wardId: ward.id,
      wardName: ward.title
    });
    this.setState({
      districtList: [],
      wardList: [],
      addressSelectStep: ADDRESS_SELECT_STEP.PROVINCE
    });
  }

  generateWardList(props = this.props) {
    const {
      provinceStore: { wardList },
      fetchWardByProvinceIdAction
    } = props as IProps;
    const { provinceId, districtId } = this.state as IState;
    const keyHash = objectToHash({ provinceId });

    let tmpWardList =
      wardList && isUndefined(wardList[keyHash]) ? fetchWardByProvinceIdAction({ provinceId }) : wardList[keyHash];
    tmpWardList =
      Array.isArray(tmpWardList) && 0 !== tmpWardList.length
        ? tmpWardList.filter((item) => item.district_id === districtId)
        : [];

    let _tmpWardList: Array<any> = [];
    Array.isArray(tmpWardList) &&
      0 !== tmpWardList.length &&
      tmpWardList.forEach((item) => {
        const wardObj = {
          id: item.id,
          title: item.full_name
        };

        _tmpWardList.push(wardObj);
      });

    this.setState({
      wardList: !!_tmpWardList.length ? _tmpWardList : this.state.wardList
    });
  }

  generateProvinceList(provinceList) {
    let tmpDistrictData = {};
    let tmpProvinceList: Array<any> = [];

    if (Array.isArray(provinceList)) {
      let _provinceList = provinceList;
      if (this.props.filterProvince) {
        _provinceList = this.props.filterProvince(_provinceList);
      }
      _provinceList.forEach((item) => {
        const districtTemp: Array<any> = [];

        item &&
          Array.isArray(item.districts) &&
          item.districts.forEach((district) => {
            const districtObj = {
              id: district.id,
              title: district.full_name
            };
            districtTemp.push(districtObj);
          });

        const objProvince = {
          id: item.id,
          title: item.name
        };

        tmpProvinceList.push(objProvince);
        tmpDistrictData[item.id] = districtTemp;
      });
    }

    this.setState({
      provinceList: tmpProvinceList,
      districtData: tmpDistrictData,
      canShowProvinceList: true,
      canShowDistrictList: false,
      canShowWardList: false
    });
  }

  init() {
    const {
      provinceStore: { provinceList },
      fetchProvinceListAction
    } = this.props;
    const list = (provinceList && provinceList.list) || [];
    0 === list.length ? fetchProvinceListAction() : this.generateProvinceList(list);
  }

  /**
   * Search filter in list
   * @param {*} event : event from search input
   * get value from seacrh input to fitler list select
   */
  searchFilter(event, list) {
    const valueSearch = event.target.value;

    if (valueSearch.length === 0) {
      this.setState({ filteredList: [], keySearch: '' });
      return;
    }

    this.setState({
      keySearch: valueSearch,
      filteredList: Array.isArray(list)
        ? list.filter((item) => changeAlias(item.title).indexOf(changeAlias(valueSearch)) >= 0)
        : []
    } as any);
  }

  handleBack() {
    this.setState({
      keySearch: '', // Important. Because it will reset key search and show (province, district, ward) list again
      filteredList: [], // Important. Because it will reset a previous filter search and show (province, district, ward) list again
      addressSelectStep: this.state.addressSelectStep > 0 ? this.state.addressSelectStep - 1 : 0
    });
  }

  componentDidMount() {
    this.init();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const {
      provinceStore: { provinceList, isFetchWardListSuccess }
    } = this.props;
    const prevProvinceList = (provinceList && provinceList.list) || [];
    const nextProvinceList = nextProps.provinceStore.provinceList.list;

    prevProvinceList.length !== nextProvinceList.length && this.generateProvinceList(nextProvinceList);

    !isFetchWardListSuccess && nextProps.provinceStore.isFetchWardListSuccess && this.generateWardList(nextProps);
  }

  render() {
    const args = {
      props: this.props,
      state: this.state,
      handleBack: this.handleBack.bind(this),
      searchFilter: this.searchFilter.bind(this),
      handleOnChangeWard: this.handleOnChangeWard.bind(this),
      handleOnChangeProvince: this.handleOnChangeProvince.bind(this),
      handleOnChangeDistrict: this.handleOnChangeDistrict.bind(this)
    };
    return renderComponent(args);
  }
}

export default AddressModal;
