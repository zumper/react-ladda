const { NODE_ENV, MODULES_ENV } = process.env

const isEnvTest = NODE_ENV === 'test'
if (!isEnvTest) {
  // force production mode for package builds
  process.env.NODE_ENV = 'production'
}

const useCommonJS = isEnvTest || MODULES_ENV === 'commonjs'
const useESModules = MODULES_ENV === 'esmodules'

module.exports = {
  presets: [
    // for testing with jest/jsdom
    useCommonJS && isEnvTest && '@zumper/babel-preset-react-app/test',
    // building for lib folder
    useCommonJS &&
      !isEnvTest && [
        '@zumper/babel-preset-react-app/commonjs',
        { helpers: true, absoluteRuntime: false },
      ],
    // building for es folder
    useESModules && [
      '@zumper/babel-preset-react-app/esmodules',
      { helpers: true, absoluteRuntime: false },
    ],
    // building for dist folder
    !useCommonJS &&
      !useESModules && ['@zumper/babel-preset-react-app', { helpers: false }],
  ].filter(Boolean),
}
