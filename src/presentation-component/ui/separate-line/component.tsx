import { isMobileVersion } from '../../../utils/responsive';

import './style.css';

const SeparateLine = () => {
  if (!isMobileVersion()) return null;

  return <div className={'separate-line'}></div>;
};

export default SeparateLine;
