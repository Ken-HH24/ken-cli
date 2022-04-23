import merge from 'lodash/merge.js';
import { resolve, dirname } from 'path';
import fsExtra from 'fs-extra';
import { fileURLToPath } from 'url';
const { writeFileSync, ensureDirSync } = fsExtra;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export function mergePkg({ generator, features, pkgMap, featureName }) {
  let finalPkg = {};
  const featureValue = Array.isArray(features[featureName])
    ? features[featureName]
    : [features[featureName]];

  featureValue.forEach((feature) => {
    finalPkg = merge(finalPkg, pkgMap[feature]);
  });

  generator.mergePkg(finalPkg);
}

export function writeFileTree(dir, files) {
  Object.keys(files).forEach((name) => {
    const filePath = resolve(dir, name);
    ensureDirSync(dirname(filePath));
    writeFileSync(filePath, files[name]);
  });
}

export { __filename, __dirname };
