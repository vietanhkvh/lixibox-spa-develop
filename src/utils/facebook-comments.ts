import { isSafeFunction } from '../utils/check-safe-data';

export function initFacebookComment(contentId) {
  setTimeout(() => {
    const fbCommentPanel = document.getElementById('fb-comments-panel');
    if (!fbCommentPanel) return;

    clearFacebookMessagePanel(fbCommentPanel, contentId);
    embedFacebookMessage();
  }, 1000);
}

function clearFacebookMessagePanel(fbCommentPanel, contentId) {
  const combinedUrl = window.location.origin + '/fb-comment/' + contentId;
  fbCommentPanel.innerHTML = `<div class='fb-comments' data-href=${combinedUrl} data-width='100%' data-numposts='5' />`;
}

// TODO: Refactor
// Unhandled exception is thrown when 'document' doesn't contain any 'script' tag
// Check code effectivity
function embedFacebookMessage() {
  (function (d, s, id) {
    let js,
      fjs = d.getElementsByTagName(s)[0];

    if (!d.getElementById(id)) {
      js = d.createElement(s);
      js.id = id;
      js.async = true;
      js.defer = true;
      js.crossorigin = 'anonymous';
      js.src = `https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v3.3&appId=${process.env.REACT_APP_FB_APP_ID}&autoLogAppEvents=1`;
      !!fjs.parentNode && fjs.parentNode.insertBefore(js, fjs);
    }

    isSafeFunction(window, ['FB', 'XFBML', 'parse']) && window.FB.XFBML.parse();
  })(document, 'script', 'facebook-comment');
}
