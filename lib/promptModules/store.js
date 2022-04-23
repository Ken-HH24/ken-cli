const storeModules = {
  name: 'store',
  description: 'select store for your project',
  type: 'checkbox',
  choices: [
    {
      name: 'redux',
      value: 'redux',
    },
    {
      name: 'recoil',
      value: 'recoil',
    },
  ],
}

export default storeModules;