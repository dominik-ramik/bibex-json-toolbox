import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    minify: "terser",
    terserOptions: {
      format: {
        comments: false,
        beautify: false,
      },
      compress: true,
      mangle: true,
    },
    lib: {
      entry: 'src/main.js',
      name: 'bibexJsonToolbox',
      fileName: (format) => `bibex-json-toolbox.${format}.js`
    }
  }
});