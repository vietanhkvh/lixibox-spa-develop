"use strict";

self.addEventListener(
  "message",
  function (e) {
    var w = e && e.data ? e.data.worker : null;
    if (!w) return;

    var data = e && e.data ? e.data.data : null;
    if (!data) return;

    switch (w) {
      case "AJAX":
        return xhrCreator(data);
      case "VERSION_DETECTION":
        return detectVersion();

      default:
        return;
    }
  },
  false
);

sendDataToMainThread({
  worker: "WORKER_INIT",
  status: { success: true },
});

function sendDataToMainThread(data) {
  self.postMessage(data);
}

/**
 * CALL API WORKER
 */

function xhrOnReadyStateChange(p) {
  var xhr = p.xhr,
    id = p.id;

  if (4 === xhr.readyState) {
    var jsonResponse;

    try {
      jsonResponse = JSON.parse(xhr.response) || {};
    } catch (e) {
      jsonResponse = {};
    }

    sendDataToMainThread({
      worker: "AJAX",
      status: xhr.status,
      data: jsonResponse,
      id: id,
      responseURL: xhr.responseURL,
    });
  }
}

function xhrCreator(p) {
  var m = p.method,
    s = p.server,
    d = p.detail,
    v = p.version || "",
    id = p.id,
    h = p.addOnHeader;

  var data = d.data ? JSON.stringify(d.data) : null;
  var xhr = new XMLHttpRequest();
  var p = s + v + d.path;
  xhr.open(m, p, true);
  xhr.setRequestHeader("Accept", "application/json");

  var hk = Object.keys(h);
  if (!!h && !!hk && !!hk.length) {
    xhr.setRequestHeader("Referrer-Url", h.referrerUrl || "");
    xhr.setRequestHeader("UUID", h.uuid || "");

    if (!!h.utmData) {
      h.utmData.utmId && xhr.setRequestHeader("utm_id", h.utmData.utmId);
      h.utmData.utmSource &&
        xhr.setRequestHeader("utm_source", h.utmData.utmSource);
      h.utmData.utmMedium &&
        xhr.setRequestHeader("utm_medium", h.utmData.utmMedium);
      h.utmData.utmCampaign &&
        xhr.setRequestHeader("utm_campaign", h.utmData.utmCampaign);
    }
  }

  xhr.setRequestHeader("Content-type", "application/json");
  xhr.withCredentials = true;
  xhr.onreadystatechange = function () {
    xhrOnReadyStateChange({ xhr: xhr, id: id });
  };
  xhr.send(data);
}

/**
 * DETECT VERSION WORKER
 */

function detectVersion() {
  requestVersionFile();
  setInterval(requestVersionFile, 60 * 1000 * 5);
}

function requestVersionFile() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "/version.json", true);
  xhr.setRequestHeader("Accept", "application/json");
  xhr.setRequestHeader("Content-type", "application/json");
  xhr.withCredentials = true;
  xhr.onreadystatechange = function () {
    xhrVersionCheckingOnReadyStateChange({ xhr: xhr });
  };
  xhr.send();
}

function xhrVersionCheckingOnReadyStateChange(xhrData) {
  var xhr = xhrData.xhr;

  if (4 === xhr.readyState) {
    var jsonResponse;

    try {
      jsonResponse = JSON.parse(xhr.response) || {};
    } catch (e) {
      jsonResponse = {};
      return;
    }

    checkVersion(jsonResponse);
  }
}

function checkVersion(versionData) {
  var isExistVersionData = true;
  var newVersionId = versionData.id;
  var newVersionDescription = versionData.id;
  var db = null,
    collection = "web-version";

  initIndexedDB(
    db,
    "lixibox",
    collection,
    function (resultDb) {
      // ON SUCCESS
      db = resultDb;

      if (!isExistVersionData) {
        // CREATE WHEN NULL
        sendDataToMainThread({
          worker: "VERSION_DETECTION",
          data: {
            type: "CREATED",
            version: {
              old: 0,
              new: newVersionId,
              description: newVersionDescription,
            },
          },
        });
        writeIndexedDB(db, collection, versionData);
      } else {
        readLastItemIndexedDB(db, collection, function (resultData) {
          var currentVersionId = resultData.value.id;
          if (currentVersionId < newVersionId) {
            sendDataToMainThread({
              worker: "VERSION_DETECTION",
              data: {
                type: "UPDATED",
                version: {
                  old: 0,
                  new: newVersionId,
                },
              },
            });
            editDataIndexedDB(
              db,
              collection,
              resultData.key,
              Object.assign({}, resultData.value, { id: newVersionId }),
              function () { }
            );
          }
        });
      }
    },
    function () {
      // ON CREATED
      isExistVersionData = false;
    }
  );
}

/** INDEXXED DB LAYER */
function initIndexedDB(db, dbName, collection, onSuccess, onCreated) {
  var indexedDatabase =
    this.indexedDB || this.webkitIndexedDB || this.mozIndexedDB;

  if (!indexedDatabase) return;

  var request = indexedDatabase.open(dbName, 1);

  request.onsuccess = function (event) {
    db = request.result;
    "function" === typeof onSuccess && onSuccess(db);
  };

  request.onupgradeneeded = function (event) {
    db = event.target.result;
    db.createObjectStore(collection, {
      autoIncrement: true,
    });

    "function" === typeof onCreated && onCreated();
  };
}

function writeIndexedDB(db, collection, data, onWriteSucess) {
  if (!db) return;

  var writeRequest = db
    .transaction(collection, "readwrite")
    .objectStore(collection)
    .add(data);

  writeRequest.onsuccess = function (event) {
    "function" === typeof onWriteSucess && onWriteSucess();
  };
}

function readLastItemIndexedDB(db, collection, onReadSucess) {
  if (!db) return;

  var objectStore = db.transaction(collection).objectStore(collection);
  var openCursor = objectStore.openCursor(null, "prev");

  openCursor.onsuccess = function (event) {
    var cursor = event.target.result;

    if (cursor) {
      "function" === typeof onReadSucess &&
        onReadSucess({
          key: cursor.key,
          value: cursor.value,
        });
    }
  };
}

function editDataIndexedDB(db, collection, key, value, onEditedSucess) {
  if (!db) return;

  var objectStore = db
    .transaction(collection, "readwrite")
    .objectStore(collection);
  var request = objectStore.get(key);

  request.onsuccess = function (event) {
    objectStore.put(value, key);
    onEditedSucess();
  };
}
