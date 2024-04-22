import { connect } from 'react-redux';
import Header from './component';
import { getReferralSchemesAction, GetReferralSchemesActionParams } from 'flows/referral/action';
import { IHeaderProps } from './model';

const mapStateToProps = (state) =>
  ({
    referralStore: state.referral
    // TODO: remove it after complete add the api
    // themeHeader: {
    //   wrapper: {
    //     backgroundColor: 'green',
    //     color: 'white'
    //   },
    //   inner: {
    //     backgroundColor: 'white',
    //     color: 'red'
    //   }
    // }
  } as IHeaderProps);

const mapDispatchToProps = (dispatch) =>
  ({
    getReferralSchemesAction: (data: GetReferralSchemesActionParams) => dispatch(getReferralSchemesAction(data))
  } as IHeaderProps);

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(Header);
