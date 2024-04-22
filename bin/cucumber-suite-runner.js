#!/usr/bin/env node

const process = require('process');
const childProcess = require('child_process');
const { regularTestDrivers, driverSelector, driverGroup } = require('../features/utils/driverSelector');

/**
 * Forks a node script in a child process
 *
 * @param {string} scriptPath
 * @param {Array<string>} args
 * @param {Object} env
 * @param {(null | Error) => any} callback
 */
function runScript(scriptPath, args, env, callback) {
  var invoked = false;
  const process = childProcess.fork(scriptPath, args, { env });

  process.on('error', function(err) {
    if (invoked) return;
    invoked = true;
    callback(err);
  });

  process.on('exit', function(code) {
    if (invoked) return;
    invoked = true;
    var err = code === 0 ? null : new Error('exit code ' + code);
    callback(err);
  });
}

/**
 * Runs seperate test processes sequentially for all of the provided browser platform `browserIds`
 *
 * @param {Array<string>} browserIds
 * @param {Object} config
 * @param {string} config.script
 * @param {Array<string>} config.args
 * @param {string} config.nodeEnv
 */
function runTestProcesses(drivers, config = { script: '', args: [], nodeEnv: '' }) {
  const { script, args, nodeEnv } = config;
  if (!drivers.length) return;

  if (!process.env.ACCEPTANCE_TEST_SERVER) {
    console.error('Acceptance test server URI not provided. Please provide through env var ACCEPTANCE_TEST_SERVER');
    return;
  }

  const currentDriver = drivers[0];
  console.log(`Running tests for ${currentDriver.representation}`);

  const scriptEnv = Object.assign({}, process.env, {
    NODE_ENV: nodeEnv,
    BROWSER_TYPE: currentDriver.id
  });
  const generatedArgs = [];
  generatedArgs.push(currentDriver.group === driverGroup.mobile ? `--tags=not @desktop` : `--tags=not @mobile`);
  const overrideArgs = generatedArgs.concat(args);

  runScript(script, overrideArgs, scriptEnv, function(err) {
    if (err) throw err;
    if (drivers.length < 2) return;

    const remainingIds = drivers.slice(1);
    runTestProcesses(remainingIds, { script, args, nodeEnv });
  });
}

/**
 * Checks which of the drivers in `driverPreference` list are available on host system
 *
 * @param {Array<string>} driverPreference
 */
async function getAvailableDrivers(driverPreference) {
  const nonReadyDriverNames = [];
  const readyDrivers = [];

  for (let accumulator = 0; accumulator < driverPreference.length; accumulator++) {
    let driverName = driverPreference[accumulator];

    try {
      const driver = await driverSelector[driverName].driver();
      await driver.quit();

      readyDrivers.push({
        id: driverName,
        group: driverSelector[driverName].group,
        representation: driverSelector[driverName].representation
      });
    } catch (e) {
      nonReadyDriverNames.push(driverSelector[driverName].representation);
    }
  }

  nonReadyDriverNames.length &&
    console.warn(nonReadyDriverNames.map(name => `Web driver is not available or not ready for ${name}!`).join('\n'));
  readyDrivers.length
    ? console.warn(
        `Tests will${nonReadyDriverNames.length ? ' only' : ''} run for:`,
        readyDrivers.map(driver => driver.representation).join(', ')
      )
    : console.warn(`No ready driver found / chosen`);

  return readyDrivers;
}

const nodeEnv = process.env.NODE_ENV || 'test';
const driverPreference = process.env.BROWSER_TYPE ? [process.env.BROWSER_TYPE] : regularTestDrivers;
const scriptPath = `./node_modules/cucumber/bin/cucumber-js`;
const overrideArgs = process.argv.slice(2);

getAvailableDrivers(driverPreference).then(drivers => {
  runTestProcesses(drivers, { script: scriptPath, args: overrideArgs, nodeEnv });
});
