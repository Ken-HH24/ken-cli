const buildToolModules = {
  name: 'buildTool',
  description: 'select your buildTool',
  type: 'list',
  choices: [
    {
      name: 'webpack',
      value: 'webpack',
    },
    {
      name: 'vite',
      value: 'vite',
    },
  ],
};

export default buildToolModules;
