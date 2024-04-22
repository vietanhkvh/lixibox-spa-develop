const getCurrentHost = () => process.env.ACCEPTANCE_TEST_SERVER;

/**
 * Executes the given code block `config.times` times at a `config.interval` interval
 *
 * @param {Function} asyncExecutableBlock
 * @param {Object} config
 * @param {number} config.times
 * @param {number} config.interval
 */
async function retryAsync(asyncExecutableBlock, config = { times: 2, interval: 500 }) {
  const { times, interval } = config;
  const _times = times || 2;
  const _interval = interval || 500;

  for (let index = 0; index < _times; index++) {
    try {
      await asyncExecutableBlock();
      break;
    } catch (error) {
      if (
        [
          'TimeoutError',
          'ElementClickInterceptedError',
          'NoSuchElementError',
          'ElementNotInteractableError',
          'WebDriverError'
        ].includes(error.name)
      ) {
        await waitFor(_interval);
      } else {
        throw error;
      }
    }
  }
}

/**
 * Async. delay
 *
 * @param {number} timeout milliseconds
 */
async function waitFor(timeout) {
  await new Promise(resolve => setTimeout(resolve, timeout));
}

exports.getCurrentHost = getCurrentHost;
exports.retryAsync = retryAsync;
exports.waitFor = waitFor;
