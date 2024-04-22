const { Given, When, Then, Before } = require('cucumber');
const { Key } = require('selenium-webdriver');
const { locateUntilVisible, waitUntilPathChangeTo } = require('../utils/driver');
const { retryAsync } = require('../utils/generic');
const { loadPage } = require('../flows/navigation');
const { TIMEOUT } = require('../constants');
let host = null;
let driver = null;

Before(function() {
  host = global.host;
  driver = global.driver;
});

Given('guest is on {string} page', { timeout: TIMEOUT.step }, async function(pageName) {
  const path = {
    home: '/',
    halio: '/halio/blue',
    'forgot password': '/forgot-password',
    login: '/sign-in',
    signup: '/sign-up'
  }[pageName];
  await loadPage({ driver, host, path });
});

When(`guest clicks on {string}`, { timeout: TIMEOUT.step }, async function(text) {
  const element = await locateUntilVisible({ driver, queryType: 'text', query: text });
  await retryAsync(async function() {
    await element.click();
  });
});

Then(`guest is redirected to {string} page`, { timeout: TIMEOUT.step }, async function(pageName) {
  const path = {
    home: '/',
    login: '/sign-in',
    signup: '/sign-up',
    'forgot password': '/forgot-password'
  }[pageName];
  await waitUntilPathChangeTo({ driver, path });
});

When(`guest clicks {string} button`, { timeout: TIMEOUT.step }, async function(name) {
  const testId = {
    like: 'likeButton',
    login: 'loginButton',
    'login disabled': 'loginButtonDisabled',
    signup: 'signupButton',
    'signup disabled': 'signupButtonDisabled',
    'reset password': 'resetAndUpdatePasswordButton',
    'reset password disabled': 'resetAndUpdatePasswordButtonDisabled',
    'update password': 'resetAndUpdatePasswordButton',
    'update password disabled': 'resetAndUpdatePasswordButtonDisabled'
  }[name];
  const element = await locateUntilVisible({ driver, queryType: 'testId', query: testId });
  await retryAsync(async function() {
    await element.click();
  });
});

When(`guest double clicks the {string} button`, { timeout: TIMEOUT.step }, async function(name) {
  const testId = {
    like: 'likeButton',
    login: 'loginButton',
    'login disabled': 'loginButtonDisabled',
    signup: 'signupButton',
    'signup disabled': 'signupButtonDisabled',
    'reset password': 'resetAndUpdatePasswordButton',
    'reset password disabled': 'resetAndUpdatePasswordButtonDisabled',
    'update password': 'resetAndUpdatePasswordButton',
    'update password disabled': 'resetAndUpdatePasswordButtonDisabled'
  }[name];
  await retryAsync(async function() {
    const element = await locateUntilVisible({ driver, queryType: 'testId', query: testId });
    await element.click();
    await element.click();
  });
});

When(`presses {string} key on {string} field`, { timeout: TIMEOUT.step }, async function(keyName, fieldName) {
  const key = {
    enter: Key.ENTER
  }[keyName];
  (await locateUntilVisible({ driver, queryType: 'name', query: fieldName, raiseException: true })).sendKeys(key);
});
