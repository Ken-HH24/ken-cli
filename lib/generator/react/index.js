const pkgOption = {
  dependencies: {
    react: '^17.0.2',
    'react-dom': '^17.0.2',
    'react-router-dom': '^6.3.0',
  },
  devDependencies: {
    '@types/react': '^18.0.5',
    '@types/react-dom': '^18.0.1',
  },
};

export default async function (generator) {
  generator.mergePkg(pkgOption);
  generator.render('react/template');
}
