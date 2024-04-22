const { until } = require('selenium-webdriver');
const { waitUntilPathChangeTo, locateUntilVisible } = require('../utils/driver');
const { TIMEOUT } = require('../constants');

/**
 * Login flow
 *
 * @param {Object} config Configuration
 * @param {WebDriver} config.driver
 */
async function findAndNavigateToProductPage(config = { driver: null }) {
  const { driver } = config;

  const product = await locateUntilVisible({ driver, queryType: 'css', query: `[href^='/shop/']`, timeout: 3000 });
  const productPath = new URL(await product.getAttribute('href')).pathname;
  product.click();
  await waitUntilPathChangeTo({ driver, path: productPath });
}

/**
 * Page load
 *
 * @param {Object} config Configuration
 * @param {WebDriver} config.driver
 * @param {string} config.host
 * @param {string} config.path
 */
async function loadPage(config = { driver: null, host, path: '' }) {
  const { driver, host, path } = config;
  const _path = path || '/';

  await driver.get(`${host}${_path}`);
  await waitUntilPathChangeTo({ driver, path: _path, timeout: TIMEOUT.pageInitialLoad });
  await driver.wait(until.titleContains('Lixibox'), TIMEOUT.pageInitialLoad);
}

exports.loadPage = loadPage;
exports.findAndNavigateToProductPage = findAndNavigateToProductPage;
