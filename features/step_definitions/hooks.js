const { BeforeAll, Before, After, AfterAll, setDefaultTimeout } = require('cucumber');
const { getDriver, isMobileDriver, getBrowserType } = require('../utils/driverSelector');
const { cleanupSession, configureScreen, resetTestEnvironment, SCREEN_TYPE } = require('../utils/driver');
const { TIMEOUT } = require('../constants');
const { getCurrentHost } = require('../utils/generic');

setDefaultTimeout(TIMEOUT.step);

BeforeAll(function() {
  global.driver = getDriver();
  global.host = getCurrentHost();
  resetTestEnvironment();
});

Before(async function() {
  const safariSmall = getBrowserType() === 'safariPreviewSmall';
  if (safariSmall) {
    return await configureScreen({ driver: global.driver, type: SCREEN_TYPE.iphone11 });
  }
  if (!isMobileDriver() && !safariSmall) await configureScreen({ driver: global.driver });
});

After(async function() {
  await cleanupSession({ driver: global.driver });
});

AfterAll(async function() {
  await global.driver.quit();
});
