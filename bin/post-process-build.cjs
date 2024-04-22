#!/usr/bin/env node

const process = require("process");
const fs = require("fs");
const path = require("path");

const VALID_EXTENSIONS = ['.js', '.css'];

if (process.argv.length < 3) process.exit(1);
const targetDirs = process.argv.slice(2);

// aggregate valid file paths from `targetDirs`
let targetPaths = [];
targetDirs.forEach(targetDir =>
  targetPaths.push(
    ...fs.readdirSync(targetDir)
    .filter(filename => VALID_EXTENSIONS.includes(path.extname(filename).toLowerCase()))
    .map(fileName =>
      path.join(process.cwd(), targetDir, fileName)
    )
  ));

// Strip target assets of sourcemap reference
// TODO: Remove guard clause
if (process.env.REACT_APP_ENV !== 'development') {
  const jsMapRefPattern = /\/\/# sourceMappingURL=.+\.map/;
  const cssMapRefPattern = /\/\*# sourceMappingURL=.+\.map \*\//;

  const processedPaths = targetPaths.filter(targetPath => {
    data = fs.readFileSync(targetPath, { encoding: 'utf8', flag: 'r' });
    return data.match(jsMapRefPattern) || data.match(cssMapRefPattern);
  });

  processedPaths.forEach(targetPath => {
    data = fs.readFileSync(targetPath, { encoding: 'utf8', flag: 'r' });
    processedData = data.replace(jsMapRefPattern, '').replace(cssMapRefPattern, '');
    fs.writeFileSync(targetPath, processedData, { encoding: 'utf8', flag: 'w' });
  });

  console.log(`[Post process build][Sourcemap reference removal]: ${processedPaths.length} out of ${targetPaths.length} assets processed`);
}

process.exit(0);
