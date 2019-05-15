module.exports = {
  runtimeCompiler: true,
  /*
  pages: {
    index: 'src/main.js',
    // when using the entry-only string format,
    // template is inferred to be `public/subpage.html`
    // and falls back to `public/index.html` if not found.
    // Output filename is inferred to be `subpage.html`.
    pie: 'src/second.js',
    addIncome: 'src/addIncome.js'
  },
  */
  devServer: {
        proxy: 'http://localhost:8000',
    }
}
