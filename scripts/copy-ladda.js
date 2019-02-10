const path = require('path')
const fs = require('fs-extra')
const replace = require('replace-in-file')

// NOTE: Ladda and spin.js are not properly configured and conflict with modern build tools.
// The authors of those packages are not interested in following conventions. Here we side-step
// those issues by bundling ladda and spin directly with our package. This ensures that our es,
// lib and dist builds will work with webpack and rollup.
// https://github.com/hakimel/Ladda/issues/90
// https://github.com/fgnass/spin.js/issues/356

const laddaSource = path.resolve(
  path.join(__dirname, '..', 'node_modules', 'ladda', 'js', 'ladda.js')
)
const spinSource = path.resolve(
  path.join(__dirname, '..', 'node_modules', 'spin.js', 'spin.js')
)
const laddaDest = path.resolve(path.join(__dirname, '..', 'src', 'ladda.js'))
const spinDest = path.resolve(path.join(__dirname, '..', 'src', 'spin.js'))

const copyLadda = async () => {
  await fs.remove(laddaDest)
  await fs.remove(spinDest)
  await fs.copy(laddaSource, laddaDest)
  await fs.copy(spinSource, spinDest)
  await replace({
    files: laddaDest,
    from: /import {Spinner} from 'spin.js';/,
    to: "import {Spinner} from './spin';",
  })
  await replace({
    files: spinDest,
    from: /var __assign.*var defaults/s,
    to: 'var defaults',
  })
  await replace({
    files: spinDest,
    from: /__assign/g,
    to: 'Object.assign',
  })
}

copyLadda()
