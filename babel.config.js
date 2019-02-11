const { NODE_ENV, MODULES_ENV } = process.env

const isEnvTest = NODE_ENV === 'test'

const useCommonJS = isEnvTest || MODULES_ENV === 'commonjs'
const useESModules = MODULES_ENV === 'esmodules'

module.exports = {
  presets: [
    useCommonJS && isEnvTest && '@zumper/babel-preset-react-app/test',
    useCommonJS && !isEnvTest && '@zumper/babel-preset-react-app/commonjs',
    useESModules && '@zumper/babel-preset-react-app/esmodules',
    !useCommonJS &&
      !useESModules && ['@zumper/babel-preset-react-app', { helpers: false }],
  ].filter(Boolean),
}
