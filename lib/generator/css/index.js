import { mergePkg } from '../../utils.js';

const cssPkgMap = {
  tailwindcss: {
    devDependencies: {
      postcss: '^8.4.12',
      tailwindcss: '^3.0.24',
      autoprefixer: '^10.4.4',
      'postcss-loader': '^6.2.1',
    },
  },

  less: {
    dependencies: {
      less: '^4.1.2',
    },
  },
};

export default async function (generator, features) {
  mergePkg({ generator, features, featureName: 'css', pkgMap: cssPkgMap });
  features.css.forEach((cssFeature) => {
    generator.render(`css/template/${cssFeature}`);
  });
}
