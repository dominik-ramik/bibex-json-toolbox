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
      name: 'bibtexJsonToolbox',
      fileName: (format) => `bibtex-json-toolbox.${format}.js`
    }
  }
});