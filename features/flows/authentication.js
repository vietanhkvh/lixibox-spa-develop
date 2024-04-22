const { Key } = require('selenium-webdriver');
const { loadPage, locate, locateUntilVisible } = require('../utils/driver');
const { retryAsync } = require('../utils/generic');
const { TIMEOUT } = require('../constants');

/**
 * Login flow
 *
 * @param {Object} config Configuration
 * @param {WebDriver} config.driver
 * @param {string} config.host
 * @param {Object} config.credential
 * @param {string} config.credential.email
 * @param {string} config.credential.password
 * @param {boolean} config.loginPageLoaded
 * @param {string} postLoginPath
 */
async function login(config = { driver: null, host: '', credential, loginPageLoaded: false, postLoginPath: null }) {
  const { driver, credential, host, loginPageLoaded, postLoginPath } = config;
  loginPageLoaded || (await loadPage({ driver, host, path: '/sign-in' }));

  await retryAsync(async function() {
    await locateUntilVisible({ driver, queryType: 'name', query: 'email', raiseException: true });
    (await locate({ driver, queryType: 'name', query: 'email', raiseException: true })).sendKeys(credential.email);
    await locateUntilVisible({ driver, queryType: 'name', query: 'password', raiseException: true });
    (await locate({ driver, queryType: 'name', query: 'password', raiseException: true })).sendKeys(
      credential.password,
      Key.ENTER
    );
  });

  postLoginPath &&
    (await driver.wait(async function() {
      const currentUrl = new URL(await driver.getCurrentUrl()).pathname;
      return currentUrl === postLoginPath;
    }, TIMEOUT.flow));
}

exports.login = login;
