import React from 'react'
import PropTypes from 'prop-types'
import { create } from 'ladda'

import { COLORS, SIZES, STYLES } from './constants'

const isUndefined = (value) => typeof value === 'undefined'

const OMITTED_PROPS = ['loading', 'progress']
const MAPPED_PROPS = {
  color: 'data-color',
  size: 'data-size',
  style: 'data-style',
  spinnerSize: 'data-spinner-size',
  spinnerColor: 'data-spinner-color',
  spinnerLines: 'data-spinner-lines',
}

const omit = (data, keys) => {
  const result = {}
  Object.keys(data).forEach((key) => {
    if (keys.indexOf(key) === -1) {
      const finalKey = MAPPED_PROPS[key] || key
      result[finalKey] = data[key]
    }
  })

  return result
}

export default class LaddaButton extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    progress: PropTypes.number,
    loading: PropTypes.bool,
    disabled: PropTypes.bool,

    // props
    color: PropTypes.oneOf(COLORS),
    size: PropTypes.oneOf(SIZES),
    style: PropTypes.oneOf(STYLES),
    spinnerSize: PropTypes.number,
    spinnerColor: PropTypes.string,
    spinnerLines: PropTypes.number,

    // legacy props
    'data-color': PropTypes.oneOf(COLORS),
    'data-size': PropTypes.oneOf(SIZES),
    'data-style': PropTypes.oneOf(STYLES),
    'data-spinner-size': PropTypes.number,
    'data-spinner-color': PropTypes.string,
    'data-spinner-lines': PropTypes.number,
  }

  componentDidMount() {
    const { loading, progress } = this.props
    this.laddaInstance = create(this.node)

    if (loading) {
      this.laddaInstance.start()
    }

    if (!isUndefined(progress)) {
      this.laddaInstance.setProgress(progress)
    }
  }

  componentDidUpdate(prevProps) {
    const { loading, progress } = this.props
    if (prevProps.loading !== loading) {
      if (loading) {
        this.laddaInstance.start()
      } else {
        this.laddaInstance.stop()
      }
    }

    if (prevProps.progress !== progress) {
      this.laddaInstance.setProgress(progress)
    }
  }

  componentWillUnmount() {
    this.laddaInstance.remove()
  }

  setNode = (node) => {
    this.node = node
  }

  render() {
    return (
      <button
        {...omit(this.props, OMITTED_PROPS)}
        className={`ladda-button ${this.props.className || ''}`}
        ref={this.setNode}
        disabled={this.props.disabled || this.props.loading}
      >
        <span className="ladda-label">{this.props.children}</span>
      </button>
    )
  }
}
