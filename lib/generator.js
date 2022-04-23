import merge from 'lodash/merge.js';
import { render } from 'ejs';
import { globby } from 'globby';
import { readFileSync } from 'fs';
import { join, resolve } from 'path';
import { isBinaryFileSync } from 'isbinaryfile';
import { writeFileTree, __dirname } from './utils.js';

const PKG_ORDER = [
  'name',
  'version',
  'description',
  'type',
  'main',
  'author',
  'license',
  'scripts',
  'dependencies',
  'devDependencies',
];

class Generator {
  constructor() {
    this.pkg = {
      name: 'project',
      version: '1.0.0',
      description: '',
      main: 'src/index.tsx',
      author: '',
      license: 'ISC',
    };
    this.files = {};
    this.renderData = {};
  }

  mergePkg(pkgOption) {
    this.pkg = merge(this.pkg, pkgOption);
  }

  setRenderData(data) {
    this.renderData = merge(this.renderData, data);
  }

  resolveData(additionalData) {
    return merge(additionalData || {}, this.renderData);
  }

  injectFile(filePath, content) {
    this.files[filePath] = content;
  }

  async render(templatePath, additionalData = {}, ejsOption = {}) {
    const basicPath = `${__dirname}/generator/${templatePath}`;
    const _files = await globby(['**/*'], { cwd: basicPath, dot: true });
    const data = this.resolveData(additionalData);
    for (const rawPath of _files) {
      const sourcePath = resolve(basicPath, rawPath);
      const content = this.renderFile(sourcePath, data, ejsOption);
      if (Buffer.isBuffer(content) || /[^\s]/.test(content)) {
        this.injectFile(rawPath, content);
      }
    }
  }

  renderFile(name, data, ejsOption) {
    if (isBinaryFileSync(name)) {
      return readFileSync(name);
    }
    const template = readFileSync(name, { encoding: 'utf-8' });
    return render(template, data, ejsOption);
  }

  sortPkg() {
    let finalPkg = {};
    PKG_ORDER.forEach((PKG) => {
      if (this.pkg[PKG]) {
        finalPkg[PKG] = this.pkg[PKG];
      }
    });
    finalPkg = merge(finalPkg, this.pkg);
    this.pkg = finalPkg;
  }

  generate(projectName = '') {
    this.sortPkg();
    this.injectFile('package.json', JSON.stringify(this.pkg, null, 2) + '\n');

    console.log('test', process.cwd(), projectName, Object.keys(this.files));

    writeFileTree(join(`${process.cwd()}/${projectName}`), this.files);
  }
}

export default Generator;
