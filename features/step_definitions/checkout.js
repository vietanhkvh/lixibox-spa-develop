const { Given, When, Then, Before } = require('cucumber');
const { isMobileDriver } = require('../utils/driverSelector');
const { waitUntilPathChangeTo, locateUntilVisible, loadPage } = require('../utils/driver');
const { retryAsync } = require('../utils/generic');
const { findAndNavigateToProductPage } = require('../flows/navigation');
const { login } = require('../flows/authentication');
const { TIMEOUT } = require('../constants');
let host = null;
let driver = null;
const credential = {
  email: 'primarytestuser@gmail.com',
  password: '12345678'
};

Before(function() {
  host = global.host;
  driver = global.driver;
});

Given('added a product to cart', { timeout: TIMEOUT.step }, async function() {
  await findAndNavigateToProductPage({ driver });

  const orderButtonLabel = isMobileDriver() ? 'Xem giỏ hàng' : 'ĐẶT HÀNG NGAY';
  await retryAsync(
    async function() {
      let addToCartButton = await locateUntilVisible({
        driver,
        queryType: 'text',
        query: 'Thêm vào giỏ',
        timeout: 3000
      });
      await addToCartButton.click();
      await locateUntilVisible({ driver, queryType: 'text', query: orderButtonLabel, timeout: 1000 });
    },
    { times: 3, interval: 1000 }
  );

  await retryAsync(async function() {
    let orderButton = await locateUntilVisible({ driver, queryType: 'text', query: orderButtonLabel, timeout: 3000 });
    await orderButton.click();
    await waitUntilPathChangeTo({ driver, path: '/check-out/cart', timeout: 3000 });
  });
});

Given('navigated to cart page', { timeout: TIMEOUT.step }, async function() {});

Given('attempted to procceed to payment page', { timeout: TIMEOUT.step }, async function() {
  const checkoutContinueButtonLabel = isMobileDriver() ? 'Đặt hàng' : 'ĐẶT HÀNG';
  let checkoutContinueButton = await locateUntilVisible({
    driver,
    queryType: 'text',
    query: checkoutContinueButtonLabel
  });
  await checkoutContinueButton.click();

  if (isMobileDriver()) {
    await waitUntilPathChangeTo({ driver, path: '/sign-in' });
  } else {
    await locateUntilVisible({ driver, queryType: 'testId', query: 'signInButton' });
  }
});

Given('logged in successfully and redirected to payment page', { timeout: TIMEOUT.step }, async function() {
  await login({ driver, host, credential, loginPageLoaded: true });
  await waitUntilPathChangeTo({ driver, path: '/check-out/payment' });
});

When('user continues', { timeout: TIMEOUT.step }, async function() {});

Then('user should see order placement confirmation', { timeout: TIMEOUT.step }, async function() {
  const paymentConfirmationButtonLabel = isMobileDriver() ? 'Tiến hành đặt hàng' : 'THANH TOÁN';
  await retryAsync(
    async function() {
      const paymentConfirmationButton = await locateUntilVisible({
        driver,
        queryType: 'text',
        query: paymentConfirmationButtonLabel,
        raiseException: true
      });
      await paymentConfirmationButton.click();
      await waitUntilPathChangeTo({ driver, path: '/check-out/success', timeout: 1000 });
    },
    { times: 3, interval: 1000 }
  );
});
