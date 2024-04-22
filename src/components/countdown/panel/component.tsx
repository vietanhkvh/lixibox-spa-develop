import { NavLink, withRouter } from 'react-router-dom';
import { PureComponent } from 'react';

import { getNavLink } from '../../../utils/validate';
import CountdownClock from '../clock';

import { INITIAL_STATE } from './initialize';
import { calculateTime } from './module';
import { IProps } from './model';
import STYLE from './style';

class component extends PureComponent<IProps, any> {
  private intervalTime;

  constructor(props: IProps) {
    super(props);
    this.state = INITIAL_STATE(props);
  }

  componentDidMount() {
    this.intervalTime = setInterval(this._handleIntervalUpdate.bind(this), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalTime);
  }

  render() {
    const {
      data: { title, linked_url },
      size,
      history
    } = this.props;

    const { isValidateTime, time } = this.state;

    if (!isValidateTime) {
      return null;
    }

    const navLink = getNavLink(linked_url) || '#';

    return (
      <div style={Object.assign({}, STYLE.container)}>
        <div style={Object.assign({}, STYLE.header)}>
          {!!title && <div style={Object.assign({}, STYLE.title, 'large' === size && STYLE.title[size])}>{title}</div>}
          {!!linked_url && (
            <NavLink style={STYLE.viewmore} to={navLink}>
              Xem chi tiết
            </NavLink>
          )}
        </div>
        {!!time && (
          <CountdownClock
            {...{
              size: size || 'normal',
              day: time?.day,
              hour: time?.hour,
              minute: time?.minute,
              second: time?.second,
              onClick: () => {
                history.push(navLink);
              }
            }}
          />
        )}
      </div>
    );
  }

  _handleIntervalUpdate() {
    const { data } = this.props;
    const { isValidateTime, time } = calculateTime(data);

    this.setState({ isValidateTime, time });
  }
}

export default withRouter<any, any>(component);
