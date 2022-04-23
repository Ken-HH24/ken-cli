import { mergePkg } from '../../utils.js';

const storePkgMap = {
  redux: {
    dependencies: {
      'react-redux': '^8.0.0',
    },
    devDependencies: {
      '@types/react-redux': '^7.1.24',
    },
  },

  recoil: {
    dependencies: {
      recoil: '^0.7.2',
    },
  },
};

export default async function (generator, features) {
  mergePkg({ generator, features, featureName: 'store', pkgMap: storePkgMap });
}
