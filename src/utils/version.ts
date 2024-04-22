// TODO: Remove. Dummy comment
declare global {
  interface Window {
    detectVersionListener: any;
  }
}

export const initCheckVersion = () => {
  return;
  // !!window.webWorker &&
  //   !!window.webWorker.postMessage &&
  //   window.webWorker.postMessage({
  //     worker: 'VERSION_DETECTION',
  //     data: {}
  //   });

  // window.detectVersionListener = ({ data }) => {
  //   switch (data.type) {
  //     case 'CREATED':
  //       break;

  //     case 'UPDATED':
  //       break;
  //   }
  // };
};
