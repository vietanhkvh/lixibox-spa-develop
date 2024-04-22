import { IBrandList } from './model';
import { fetchBrandListAction } from 'flows/brand/action';
import { updateMetaInfoAction } from 'flows/meta/action';

export const mapStateToProps = (state) =>
  ({
    brandStore: state.brand
  } as IBrandList);
export const mapDispatchToProps = (dispatch) =>
  ({
    fetchBrandListAction: () => dispatch(fetchBrandListAction()),
    updateMetaInfoAction: (data) => dispatch(updateMetaInfoAction(data))
  } as IBrandList);
