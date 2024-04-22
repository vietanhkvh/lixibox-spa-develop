import { PureComponent } from 'react';

import { getDeviceVersion } from '../../../utils/responsive';

import { INITIAL_STATE } from './initialize';
import STYLE from './style';

class component extends PureComponent<any, any> {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  }

  componentDidMount() {
    const { currentVersion } = this.state;

    window.onresize = function (event) {
      if (currentVersion !== getDeviceVersion()) {
        window.location.reload();
      }
    };
  }

  render() {
    return <div style={STYLE} id={'overlay-reload'}></div>;
  }
}

export default component;
