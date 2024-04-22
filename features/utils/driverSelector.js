const { Builder, Capabilities } = require('selenium-webdriver');
const { Options: SafariOptions } = require('selenium-webdriver/safari');

const driverGroup = Object.freeze({
  mobile: 'mobile',
  desktop: 'desktop'
});

const regularTestDrivers = ['chrome', 'chromeAndroid', 'safari'];

const driverSelector = {
  chrome: {
    driver: () => {
      const capabilities = Capabilities.chrome();
      capabilities.set('chromeOptions', { w3c: false });
      return new Builder().withCapabilities(capabilities).build();
    },
    group: driverGroup.desktop,
    representation: 'Chrome'
  },
  chromeAndroid: {
    driver: () => {
      const capabilities = Capabilities.chrome();
      capabilities.set('chromeOptions', { w3c: false, androidPackage: 'com.android.chrome' });
      return new Builder().withCapabilities(capabilities).build();
    },
    group: driverGroup.mobile,
    representation: 'Chrome Android'
  },
  firefox: {
    driver: () => {
      const capabilities = Capabilities.firefox();
      capabilities.set('firefoxOptions', { w3c: false });
      return new Builder().withCapabilities(capabilities).build();
    },
    group: driverGroup.desktop,
    representation: 'Firefox'
  },
  safari: {
    driver: () => {
      const capabilities = Capabilities.safari();
      capabilities.set('safariOptions', { w3c: false });
      return new Builder().withCapabilities(capabilities).build();
    },
    group: driverGroup.desktop,
    representation: 'Safari'
  },
  safariPreview: {
    driver: () => {
      const options = new SafariOptions();
      options.setTechnologyPreview(true);
      return new Builder()
        .forBrowser(`Safari Technology Preview`)
        .usingServer('http://localhost:8888')
        .setSafariOptions(options)
        .build();
    },
    group: driverGroup.desktop,
    representation: 'Safari Technology Preview'
  },
  safariPreviewSmall: {
    driver: () => {
      const options = new SafariOptions();
      options.setTechnologyPreview(true);
      return new Builder()
        .forBrowser(`Safari Technology Preview`)
        .usingServer('http://localhost:8888')
        .setSafariOptions(options)
        .build();
    },
    group: driverGroup.desktop,
    representation: 'Safari Technology Preview - Small Screen'
  },
  safariMobile: {
    driver: () => {
      const capabilities = new Capabilities({
        platformName: 'ios',
        'safari:useSimulator': true
      });
      const options = new SafariOptions(capabilities);
      return new Builder()
        .forBrowser('safari')
        .setSafariOptions(options)
        .build();
    },
    group: driverGroup.mobile,
    representation: 'Safari Mobile'
  }
};

const getBrowserType = () => process.env.BROWSER_TYPE || 'chrome';

const getDriver = () => {
  return driverSelector[getBrowserType()].driver();
};

const isMobileDriver = () => driverGroup.mobile === driverSelector[getBrowserType()].group;

exports.getDriver = getDriver;
exports.isMobileDriver = isMobileDriver;
exports.getBrowserType = getBrowserType;
exports.driverSelector = driverSelector;
exports.regularTestDrivers = regularTestDrivers;
exports.driverGroup = driverGroup;
