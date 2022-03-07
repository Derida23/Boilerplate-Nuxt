module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false,
  },
  extends: ['@nuxtjs', 'plugin:nuxt/recommended', 'prettier'],
  plugins: ['vue'],
  // add your custom rules here
  rules: {
    semi: [2, 'never'],
    'no-console': 'off',
    'no-prototype-builtins': 'off',
    'vue/max-attributes-per-line': 'off',
    'vue/html-self-closing': 'off',
    'vue/no-mutating-props': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/multiline-html-element-content-newline': 'off',
    'vue/html-indent': 'off',
    'vue/multi-word-component-names': [
      'error',
      {
        ignores: ['default', '404'],
      },
    ],
  },
}
