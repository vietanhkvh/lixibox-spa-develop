const { Given, Then, Before } = require('cucumber');
const { until } = require('selenium-webdriver');
const { locate, captureScreenshot } = require('../utils/driver');
const { TIMEOUT } = require('../constants');
let host = null;
let driver = null;

Before(function() {
  host = global.host;
  driver = global.driver;
});

Given('guest is browsing {string}', { timeout: 10 * 1000 }, async function(page) {
  await driver.get(`${host}${page}`);
});

Then('public session renders the page without error', { timeout: 10 * 1000 }, async function() {
  await driver.wait(until.titleContains('Lixibox'), TIMEOUT.pageLoadExtended);
  await driver.wait(async () => {
    const appRootElement = await locate({ driver, queryType: 'id', query: 'shop-app' });
    const errorElement = await locate({ driver, queryType: 'id', query: 'genericError' });

    if (errorElement) {
      const currentPath = new URL(await driver.getCurrentUrl()).pathname || '';
      const timestamp = new Date().getTime();

      console.log(
        `\nError: ${typeof currentPath} context(authenticatedPageRender) type(GenericUIError) time(${timestamp}) at(${currentPath})`
      );
      await captureScreenshot({ driver, timestamp, nameSuffix: currentPath.replace(/\//g, '_') });
      throw Error(`GenericUIError`);
    }

    if (appRootElement) return true;
    return false;
  }, TIMEOUT.pageLoadExtended);
});
