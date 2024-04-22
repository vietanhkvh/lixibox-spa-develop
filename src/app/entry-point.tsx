import 'babel-polyfill';
import 'ts-helpers';

import * as ReactDOMClient from 'react-dom/client';
import RootApp from './init-react-app';
import './global-variable';

const AppEntryPoint = () => {
  const root = ReactDOMClient.createRoot(document.getElementById('lixiapp'));
  root.render(<RootApp />);
};

export default AppEntryPoint;
