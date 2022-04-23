import { Command } from 'commander';
import Creator from '../lib/creator.js';

const program = new Command();

async function run(projectName) {
  const creator = new Creator({
    projectName,
    promptList: ['css', 'buildTool', 'store'],
    templateList: ['css', 'buildTool', 'store', 'react', 'ts', 'others'],
  });
  await creator.startPrompt();
  await creator.startGenerate();
  // creator.startInstall();
}

program
  .version('0.1.0')
  .command('create <name>')
  .description('create a new project')
  .action(async (name) => {
    run(name);
  });

program.parse();
