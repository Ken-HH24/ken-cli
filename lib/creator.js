import inquirer from 'inquirer';
import { execa } from 'execa';
import { join } from 'path';
import Generator from './generator.js';

class Creator {
  constructor({
    projectName = 'byte-project',
    promptList = [],
    templateList = [],
  }) {
    this.projectName = projectName;
    this.promptRes = {};
    this.generator = new Generator(this.projectName);
    this.promptList = promptList;
    this.templateList = templateList;
  }

  async startPrompt() {
    const modules = [];

    // 引入需要用户主动配置的模块
    for (const module of this.promptList) {
      const moduleFile = await import(`../lib/promptModules/${module}.js`);
      modules.push(moduleFile.default);
    }

    this.promptRes = await inquirer.prompt(modules);
  }

  async startGenerate() {
    const hasTailwindcss = this.promptRes.css.includes('tailwindcss');

    this.generator.setRenderData({
      hasTailwindcss,
      importCss: hasTailwindcss,
    });

    // 引入所有生成模块
    for (const feature of this.templateList) {
      const generatorFile = await import(`./generator/${feature}/index.js`);
      const func = generatorFile.default;
      await func(this.generator, this.promptRes);
    }

    this.generator.generate(this.projectName);
  }

  async startInstall() {
    const child = execa('npm install', [], {
      cwd: join(process.cwd(), this.projectName),
    });
    child.stdout.on('data', (buffer) => {
      process.stdout.write(buffer);
    });

    child.on('close', (code) => {
      if (code !== 0) {
        console.log('❗️ error happen');
        return;
      }
    });
  }
}

export default Creator;
