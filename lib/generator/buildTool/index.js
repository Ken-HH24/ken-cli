import { mergePkg } from '../../utils.js';

const buildToolPkgMap = {
  webpack: {
    scripts: {
      start: 'webpack serve',
      build: 'webpack',
    },
    dependencies: {
      webpack: '^5.72.0',
      'webpack-cli': '^4.9.2',
      '@babel/core': '^7.17.9',
      '@babel/preset-env': '^7.16.11',
      'babel-loader': '^8.2.4',
      'ts-loader': '^9.2.8',
      'css-loader': '^6.7.1',
      'less-loader': '^10.2.0',
      'style-loader': '^3.3.1',
    },
    devDependencies: {
      'clean-webpack-plugin': '^4.0.0',
      'html-webpack-plugin': '^5.5.0',
      'webpack-dev-server': '^4.8.1',
    },
  },

  vite: {
    scripts: {
      start: 'vite',
      build: 'vite build',
    },
    dependencies: {
      vite: '^2.9.5',
    },
    devDependencies: {
      '@vitejs/plugin-react': '^1.3.0',
    },
  },
};

export default async function (generator, features) {
  mergePkg({
    generator,
    features,
    pkgMap: buildToolPkgMap,
    featureName: 'buildTool',
  });

  await generator.render(`buildTool/template/${features.buildTool}`);
}
