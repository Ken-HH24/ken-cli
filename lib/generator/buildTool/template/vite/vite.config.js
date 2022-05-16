const path = require('path');
const { defineConfig } = require('vite')
const react = require('@vitejs/plugin-react');

// https://vitejs.dev/config/
module.exports =  defineConfig({
  server: {
    port: 8000,
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, 'src'),
      '@src': path.resolve(__dirname, 'src'),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  plugins: [react()],
})
