#!/usr/bin/env node

const process = require("process");
const fs = require("fs");
const path = require("path");
const childProcess = require("child_process");

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

if (process.argv.length !== 4) process.exit(1);
const srcDir = process.argv[2];
const destDir = process.argv[3];
const srcFiles = fs.readdirSync(srcDir);
const scriptPath = `./node_modules/webpack/bin/webpack.js`;

srcFiles.forEach(fileName => {
  const srcFileWithPath = path.join(process.cwd(), srcDir, fileName);
  const destFileWithPath = path.join(process.cwd(), destDir, fileName);

  const args = `${srcFileWithPath} --config='config/webpack.public.config.cjs' --output=${destFileWithPath}`.split(' ');
  runScript(scriptPath, args, process.env, function(err) {
    if (err) throw err;
  });
});
