import React from 'react'
import PropTypes from 'prop-types'

import { create } from './ladda'
import { COLORS, SIZES, STYLES } from './constants'

const isUndefined = (value) => typeof value === 'undefined'

const MAPPED_PROPS = {
  color: 'data-color',
  size: 'data-size',
  style: 'data-style',
  spinnerSize: 'data-spinner-size',
  spinnerColor: 'data-spinner-color',
  spinnerLines: 'data-spinner-lines',
}

const mapLegacyProps = (props) =>
  Object.keys(props).reduce((mappedProps, key) => {
    const finalKey = MAPPED_PROPS[key] || key
    mappedProps[finalKey] = props[key]
    return mappedProps
  }, {})

export default class LaddaButton extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    progress: PropTypes.number,
    loading: PropTypes.bool,
    disabled: PropTypes.bool,

    // ladda props
    color: PropTypes.oneOf(COLORS),
    size: PropTypes.oneOf(SIZES),
    style: PropTypes.oneOf(STYLES),
    spinnerSize: PropTypes.number,
    spinnerColor: PropTypes.string,
    spinnerLines: PropTypes.number,

    // legacy ladda props
    'data-color': PropTypes.oneOf(COLORS),
    'data-size': PropTypes.oneOf(SIZES),
    'data-style': PropTypes.oneOf(STYLES),
    'data-spinner-size': PropTypes.number,
    'data-spinner-color': PropTypes.string,
    'data-spinner-lines': PropTypes.number,
  }

  constructor() {
    super()
    this.buttonRef = React.createRef()
  }

  componentDidMount() {
    const { loading, progress } = this.props
    this.laddaInstance = create(this.buttonRef.current)

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

  render() {
    const {
      className,
      children,
      disabled,
      loading,
      progress,
      ...otherProps
    } = this.props
    return (
      <button
        {...mapLegacyProps(otherProps)}
        className={`ladda-button ${className || ''}`}
        ref={this.buttonRef}
        disabled={disabled || loading}
      >
        <span className="ladda-label">{children}</span>
      </button>
    )
  }
}
