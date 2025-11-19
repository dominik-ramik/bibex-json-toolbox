import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/main.js',
      name: 'bibexJsonToolbox',
      fileName: (format) => `bibex-json-toolbox.${format}.js`
    }
  }
});