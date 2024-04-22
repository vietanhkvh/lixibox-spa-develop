import { connect } from 'react-redux';

import DesktopNavigation from './component';
import { IProps } from './model';

const mapStateToProps = (state) => ({} as IProps);

const mapDispatchToProps = (dispatch) => ({} as IProps);

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(DesktopNavigation);
