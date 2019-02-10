const { NODE_ENV, MODULES_ENV } = process.env

// https://github.com/facebook/create-react-app/blob/master/packages/babel-preset-react-app/create.js

const isEnvProduction = NODE_ENV === 'production'
const isEnvDevelopment = NODE_ENV === 'development'
const isEnvTest = NODE_ENV === 'test'

const useCommonJS = isEnvTest || MODULES_ENV === 'commonjs'
const useESModules = MODULES_ENV === 'esmodules'
const areHelpersEnabled = false

let targets
if (useCommonJS) {
  targets = { node: isEnvTest ? 'current' : 6 }
} else if (useESModules) {
  targets = { esmodules: true }
} else {
  targets = { ie: 9 }
}

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        // We want Create React App to be IE 9 compatible until React itself
        // no longer works with IE 9
        targets,
        // Users cannot override this behavior because this Babel
        // configuration is highly tuned for ES5 support
        ignoreBrowserslistConfig: true,
        // If users import all core-js they're probably not concerned with
        // bundle size. We shouldn't rely on magic to try and shrink it.
        useBuiltIns: false,
        // Do not transform modules to CJS (unless useCommonJS)
        modules: useCommonJS ? 'cjs' : false,
        // Exclude transforms that make all code slower
        exclude: ['transform-typeof-symbol'],
      },
    ],
    [
      '@babel/preset-react',
      {
        // Adds component stack to warning messages
        // Adds __self attribute to JSX which React will use for some warnings
        development: isEnvDevelopment || isEnvTest,
        // Will use the native built-in instead of trying to polyfill
        // behavior for any plugins that require one.
        useBuiltIns: true,
      },
    ],
  ],
  plugins: [
    // Necessary to include regardless of the environment because
    // in practice some other transforms (such as object-rest-spread)
    // don't work without it: https://github.com/babel/babel/issues/7215
    '@babel/plugin-transform-destructuring',
    // class { handleClick = () => { } }
    // Enable loose mode to use assignment instead of defineProperty
    // See discussion in https://github.com/facebook/create-react-app/issues/4263
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    // The following two plugins use Object.assign directly, instead of Babel's
    // extends helper. Note that this assumes `Object.assign` is available.
    // { ...todo, completed: true }
    [
      '@babel/plugin-proposal-object-rest-spread',
      {
        useBuiltIns: true,
      },
    ],
    // Polyfills the runtime needed for async/await, generators, and friends
    // https://babeljs.io/docs/en/babel-plugin-transform-runtime
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: false,
        helpers: areHelpersEnabled,
        regenerator: true,
        // https://babeljs.io/docs/en/babel-plugin-transform-runtime#useesmodules
        // We should turn this on once the lowest version of Node LTS
        // supports ES Modules.
        useESModules,
      },
    ],
    // Remove PropTypes from production build
    isEnvProduction && [
      'babel-plugin-transform-react-remove-prop-types',
      {
        removeImport: true,
      },
    ],
    // Adds syntax support for import()
    '@babel/plugin-syntax-dynamic-import',
    // Transform dynamic import to require
    useCommonJS && 'babel-plugin-dynamic-import-node',
    useCommonJS && [
      '@babel/plugin-transform-modules-commonjs',
      { loose: true },
    ],
  ].filter(Boolean),
}
