/** Generated UUID */
function wk() {
  try {
    window.WORKER_INIT = false;

    var currentStampTime = new Date().getTime();
    window.webWorker = new Worker(`${process.env.REACT_APP_SCRIPT_PATH}/wk.js?v=` + currentStampTime);

    window.webWorker.addEventListener(
      "message",
      function (e) {
        var worker = e && e.data ? e.data.worker : "";
        switch (worker) {
          case "AJAX":
            "function" === typeof window["xhrCallback" + e.data.id] &&
              window["xhrCallback" + e.data.id](e.data);
            break;
          // case 'VERSION_DETECTION': 'function' === typeof window.detectVersionListener && window.detectVersionListener(e.data); break;
          case "WORKER_INIT":
            var status = e.data.status;
            if (!!status && !!status.success);
            window.WORKER_INIT = true;
            break;
          default:
            return;
        }
      },
      false
    );
  } catch (e) {
    alert(
      "Rất tiếc, trình duyệt của bạn quá cũ không được hỗ trợ Web Worker. Vui lòng nâng cấp hoặc thử lại với trình duyệt mới hơn. Xin cảm ơn!!!"
    );
  }
}

/** User agent feature */
function ug() {
  var ua = navigator.userAgent || "";
  var t = new Date().getTime();
  var c = ua + t;
  var h = 0;

  for (var i = 0, len = c.length; i < len; i++) {
    var character = c.charCodeAt(i);
    h = (h << 5) - h + character;
    h = h & h;
  }

  var u = Math.abs(h);
  localStorage.setItem("uuid", u);
  return u;
}

function detectUUID() {
  try {
    var u = localStorage.getItem("uuid");
    if (!u) return ug();

    return u;
  } catch (e) {
    return ug();
  }
}

function renderUUID() {
  try {
    var t = new Date();
    var ft = [
      t.getHours(),
      ":",
      t.getMinutes(),
      ":",
      t.getSeconds(),
      " ",
      t.getDate(),
      "/",
      t.getMonth() + 1,
      "/",
      t.getFullYear(),
    ].join("");
    var u = [detectUUID(), " - ", ft].join("");
    var a = document.getElementById("lixiapp");
    var s =
      "position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 320px; height: 100px; text-align: center; line-height: 50px; font-size: 40px; font-weight: 800; opacity: .1;";
    var isInjectUuid = !!u && !!a && "" === a.innerHTML;
    if (!!isInjectUuid)
      a.innerHTML = ['<div style="', s, '">ID: ', u, "</div>"].join("");
  } catch (e) {
    throw Error("Can not init uuid");
  }
}

/** */
function rederUnSupportMessage(message) {
  alert(message);

  setTimeout(() => {
    var element = document.getElementById("lixiapp");
    var style =
      "position: fixed; top: 20%; left: 50%; transform: translate(-50%, -50%); width: 320px; height: 100px; text-align: center; line-height: 44px; font-size: 28px; font-weight: 700; opacity: .5;";
    var isInjectUuid = !!element && "" === element.innerHTML;
    if (!!isInjectUuid)
      element.innerHTML = ['<div style="', style, '">', message, "</div>"].join(
        ""
      );
  }, 200);
}

function detectUnSupportLocalStorage() {
  try {
    localStorage.setItem("a", 1);
    localStorage.getItem("a");
  } catch (e) {
    rederUnSupportMessage(
      "Rất tiếc, trình duyệt của bạn quá cũ không được hỗ trợ LocalStorage. Vui lòng nâng cấp hoặc thử lại với trình duyệt mới hơn. Xin cảm ơn!!!"
    );
  }
}

function detectUnSupportCookie() {
  var errorMessage =
    "Rất tiếc, trình duyệt của bạn quá cũ không được hỗ trợ Cookie. Vui lòng nâng cấp hoặc thử lại với trình duyệt mới hơn. Xin cảm ơn!!!";
  try {
    var cookieEnabled = navigator.cookieEnabled;
    if (!cookieEnabled) {
      document.cookie = "testcookie";
      cookieEnabled = document.cookie.indexOf("testcookie") != -1;
    }
    if (!cookieEnabled) rederUnSupportMessage(errorMessage);
  } catch (e) {
    rederUnSupportMessage(errorMessage);
  }
}

function detectUnSupportBrowser() {
  detectUnSupportCookie();
  detectUnSupportLocalStorage();
}

wk();

window.onload = function () {
  detectUnSupportBrowser();
  detectUUID();
  setTimeout(renderUUID, 5000);
};
