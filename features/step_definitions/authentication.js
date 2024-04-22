const { Given, When, Then, Before } = require('cucumber');
const assert = require('assert');
const { locate, locateUntilFound, locateUntilVisible } = require('../utils/driver');
const { isMobileDriver } = require('../utils/driverSelector');
const { retryAsync } = require('../utils/generic');
const { generateNewUserCredentials, primaryTestUserCredentials } = require('../utils/auth');
const { loadPage } = require('../flows/navigation');
const { TIMEOUT } = require('../constants');
let host = null;
let driver = null;
const credential = primaryTestUserCredentials;

Before(function() {
  host = global.host;
  driver = global.driver;
});

Then(`login popup becomes visible`, { timeout: TIMEOUT.step }, async function() {
  await locateUntilVisible({ driver, queryType: 'name', query: 'password', raiseException: true });
  const currentPath = new URL(await driver.getCurrentUrl()).pathname;
  assert.notEqual(currentPath, '/sign-in');
  assert.notEqual(currentPath, '/sign-up');
});

Then('login\\/signup prompt becomes visible', async function() {
  await locateUntilVisible({ driver, queryType: 'text', query: 'Đăng nhập', raiseException: true });
  await locateUntilVisible({ driver, queryType: 'text', query: 'Tạo tài khoản', raiseException: true });
  const currentPath = new URL(await driver.getCurrentUrl()).pathname;
  assert.notEqual(currentPath, '/sign-in');
  assert.notEqual(currentPath, '/sign-up');
});

Given('login\\/signup prompt is visible', async function() {
  await loadPage({ driver, host, path: '/halio/blue' });
  const loginPrompt = await locateUntilVisible({ driver, queryType: 'testId', query: 'likeButton' });
  await retryAsync(async function() {
    await loginPrompt.click();
  });
  await locateUntilVisible({ driver, queryType: 'text', query: 'Đăng nhập', raiseException: true });
});

Given('login popup is visible', async function() {
  await loadPage({ driver, host, path: '/halio/blue' });
  const loginPrompt = await locateUntilVisible({ driver, queryType: 'testId', query: 'likeButton' });
  await retryAsync(async function() {
    await loginPrompt.click();
  });
  await locateUntilVisible({ driver, queryType: 'text', query: 'Đăng nhập', raiseException: true });
});

When(`guest fills up the login form`, { timeout: TIMEOUT.step }, async function() {
  await locateUntilVisible({ driver, queryType: 'name', query: 'email', raiseException: true });
  (await locate({ driver, queryType: 'name', query: 'email', raiseException: true })).sendKeys(credential.email);
  await locateUntilVisible({ driver, queryType: 'name', query: 'password', raiseException: true });
  (await locate({ driver, queryType: 'name', query: 'password', raiseException: true })).sendKeys(credential.password);
});

When(`guest fills up the signup form`, { timeout: TIMEOUT.step }, async function() {
  const newUserCredentials = generateNewUserCredentials();
  await locateUntilVisible({ driver, queryType: 'name', query: 'name', raiseException: true });
  (await locateUntilVisible({ driver, queryType: 'name', query: 'name', raiseException: true })).sendKeys(
    newUserCredentials.name
  );
  await locateUntilVisible({ driver, queryType: 'name', query: 'email', raiseException: true });
  (await locateUntilVisible({ driver, queryType: 'name', query: 'email', raiseException: true })).sendKeys(
    newUserCredentials.email
  );
  await locateUntilVisible({ driver, queryType: 'name', query: 'password', raiseException: true });
  (await locateUntilVisible({ driver, queryType: 'name', query: 'password', raiseException: true })).sendKeys(
    newUserCredentials.password
  );
});

Then(`UI reflects the logged in state`, { timeout: TIMEOUT.step }, async function() {
  if (isMobileDriver()) {
    await loadPage({ driver, host, path: '/user' });
    await locateUntilFound({ driver, queryType: 'css', query: '.user-dashboard-container' });
  } else {
    await locateUntilFound({ driver, queryType: 'css', query: '.user-info-container' });
  }
});
