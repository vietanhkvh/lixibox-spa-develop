const { By } = require('selenium-webdriver');
const fs = require('fs');
const path = require('path');
const { TIMEOUT } = require('../constants');

/**
 * Waits until current context path changes to the provided path
 *
 * @param {Object} config Scroll configuration
 * @param {WebDriver} config.driver
 * @param {string} config.path
 * @param {number} config.timeout
 */
async function waitUntilPathChangeTo(config = { driver, path, timeout }) {
  const { driver, path, timeout } = config;
  const _timeout = timeout || TIMEOUT.action;
  await driver.wait(async function() {
    const currentPath = new URL(await driver.getCurrentUrl()).pathname;
    return currentPath === path;
  }, _timeout);
}

/**
 * Scrolls a WebElement into view
 *
 * @param {Object} config Scroll configuration
 * @param {WebDriver} config.driver
 * @param {WebElement} config.element
 */
function scrollIntoView(config = { driver, element }) {
  const { driver, element } = config;
  return driver.executeScript(`arguments[0].scrollIntoView({ block: 'center', inline: 'center' })`, element);
}

/**
 * Locator with flexible query types
 *
 * @param {Object} config - Locator configuration
 * @param {WebDriver} config.driver
 * @param {'css' | 'id' | 'name' | 'text' | 'testId'} config.queryType
 * @param {queryType} config.query
 * @param {boolean} config.raiseException
 * @returns {null | WebElement}
 */
async function locate(config = { driver: null, queryType: 'css', query: '', raiseException: false }) {
  const { driver, queryType, query, raiseException } = config;
  let element = null;

  try {
    switch (queryType) {
      case 'css':
        element = await driver.findElement(By.css(query));
        break;
      case 'id':
        element = await driver.findElement(By.id(query));
        break;
      case 'name':
        element = await driver.findElement(By.name(query));
        break;
      case 'text':
        element = await driver.findElement(By.xpath(`//*[text()='${query}']`));
        break;
      case 'testId':
        element = await driver.findElement(By.css(`[data-testid='${query}']`));
        break;
    }
  } catch (e) {
    if (raiseException) throw e;
    return null;
  }

  return element;
}

/**
 * Locator that keeps looking for the queried element until found or timed out
 *
 * @param {Object} config Configuration
 * @param {WebDriver} config.driver
 * @param {'css' | 'text' | 'testId'} config.queryType
 * @param {queryType} config.query
 * @param {number} timeout milliseconds
 * @param {boolean} config.raiseException
 * @returns {null | WebElement}
 */
async function locateUntilFound(config = { driver: null, queryType, query, timeout, raiseException: false }) {
  const { driver, queryType, query, timeout, raiseException } = config;
  const _timeout = timeout || TIMEOUT.action;
  let element = null;
  await driver.wait(async function() {
    element = await locate({ driver, queryType, query, timeout: _timeout, raiseException });
    return !!element;
  }, _timeout);

  return await locate({ driver, queryType, query, timeout: _timeout, raiseException });
}

/**
 * Locator that keeps looking for the queried element until it's visible or timed out
 *
 * @param {Object} config Configuration
 * @param {WebDriver} config.driver
 * @param {'css' | 'text' | 'testId'} config.queryType
 * @param {queryType} config.query
 * @param {number} timeout milliseconds
 * @param {boolean} raiseException
 * @returns {null | WebElement}
 */
async function locateUntilVisible(config = { driver: null, queryType, query, timeout, raiseException: false }) {
  const { driver, queryType, query, timeout, raiseException } = config;
  const _timeout = timeout || TIMEOUT.action;
  let element = null;
  await driver.wait(async function() {
    element = await locate({ driver, queryType, query, timeout: _timeout, raiseException });
    if (!element) return null;
    scrollIntoView({ driver, element });
    element = await locate({ driver, queryType, query, timeout: _timeout, raiseException });
    if (!element) return null;
    return await element.isDisplayed();
  }, _timeout);

  return await locate({ driver, queryType, query, timeout: _timeout, raiseException });
}

const SCREEN_TYPE = {
  desktop: { width: 1024, height: 768 },
  iphone11: { width: 414, height: 896 }
};

/**
 * Configures screen for desktop browsers
 *
 * @param {Object} config Configuration
 * @param {WebDriver} config.driver
 * @param {Object} config.type Screen type
 * @param {number} config.type.width
 * @param {number} config.type.height
 */
async function configureScreen(config = { driver, type: SCREEN_TYPE.desktop }) {
  const { driver, type } = config;
  const _type = type || SCREEN_TYPE.desktop;

  return await driver
    .manage()
    .window()
    .setRect(_type);
}

/**
 * Configures screen for desktop browsers
 *
 * @param {Object} config Configuration
 * @param {WebDriver} config.driver
 * @param {string} config.host Domain with protocol. Example: https://google.com
 * @param {string} config.path Path. Example: /search
 */
async function loadPage(config = { driver, host, path }) {
  const { driver, host, path } = config;

  await driver.get(`${host}${path}`);
}

/**
 * Checks if the current context is `data:` URL context
 *
 * @param {Object} config Configuration
 * @param {WebDriver} config.driver
 */
async function onDataUrlContext(config = { driver }) {
  const { driver } = config;

  return new URL(await driver.getCurrentUrl()).protocol === 'data:';
}

/**
 * Attempts to cleanup session specific persistent data
 *
 * @param {Object} config Configuration
 * @param {WebDriver} config.driver
 */
async function cleanupSession(config = { driver }) {
  const { driver } = config;
  if (await onDataUrlContext({ driver })) return;
  await driver.manage().deleteAllCookies();
  await driver.executeScript(`localStorage.clear();`);
}

/**
 * Attempts to capture screenshot and store as a file
 *
 * @param {Object} config Configuration
 * @param {WebDriver} config.driver
 * @param {Timestamp} config.timestamp
 * @param {string} config.targetPath
 * @param {string} config.nameSuffix
 */
async function captureScreenshot(config = { driver: null, timestamp: 0, targetPath: '', nameSuffix: '' }) {
  const { driver, timestamp, targetPath, nameSuffix } = config;
  const _timestamp = timestamp || new Date().getTime();
  const _dirPath = targetPath || './tmp/test/screenshots';

  const screenshotB64 = await driver.takeScreenshot();
  const filePath = path.join(_dirPath, `${_timestamp}${nameSuffix || ''}.png`);

  fs.mkdirSync(_dirPath, { recursive: true });
  fs.writeFileSync(filePath, screenshotB64, 'base64');
  return screenshotB64;
}

/**
 * Removes test artifacts
 *
 * @param {Object} config Configuration
 * @param {string} config.testAssetDir
 */
function resetTestEnvironment(config = { testAssetDir: '' }) {
  const { testAssetDir } = config;
  const _testAssetDir = testAssetDir || './tmp/test';
  fs.rmdirSync(_testAssetDir, { recursive: true });
}

exports.scrollIntoView = scrollIntoView;
exports.locate = locate;
exports.locateUntilFound = locateUntilFound;
exports.locateUntilVisible = locateUntilVisible;
exports.configureScreen = configureScreen;
exports.loadPage = loadPage;
exports.waitUntilPathChangeTo = waitUntilPathChangeTo;
exports.onDataUrlContext = onDataUrlContext;
exports.cleanupSession = cleanupSession;
exports.captureScreenshot = captureScreenshot;
exports.resetTestEnvironment = resetTestEnvironment;
exports.SCREEN_TYPE = SCREEN_TYPE;
