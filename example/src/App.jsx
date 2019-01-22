import React, { Component } from 'react'
import LaddaButton, {
  GREEN,
  RED,
  BLUE,
  PURPLE,
  MINT,
  XS,
  S,
  L,
  XL,
  EXPAND_LEFT,
  EXPAND_RIGHT,
  EXPAND_UP,
  EXPAND_DOWN,
  CONTRACT,
  CONTRACT_OVERLAY,
  SLIDE_LEFT,
  SLIDE_RIGHT,
  SLIDE_UP,
  SLIDE_DOWN,
  ZOOM_IN,
  ZOOM_OUT,
} from '@zumper/react-ladda'

import 'ladda/dist/ladda.min.css'
import './demo.css'

class App extends Component {
  state = {
    expLeft: { loading: false, progress: 0 },
    expRight: { loading: false, progress: 0 },
    expRightProgress: { loading: false, progress: 0 },
    expUp: { loading: false, progress: 0 },
    expDown: { loading: false, progress: 0 },
    expContract: { loading: false, progress: 0 },
    expContractProgress: { loading: false, progress: 0 },
    expOverlay: { loading: false, progress: 0 },
    expSlideLeft: { loading: false, progress: 0 },
    expSlideRight: { loading: false, progress: 0 },
    expSlideUp: { loading: false, progress: 0 },
    expSlideDown: { loading: false, progress: 0 },
    expZoomIn: { loading: false, progress: 0 },
    expZoomOut: { loading: false, progress: 0 },
    xSmall: { loading: false, progress: 0 },
    small: { loading: false, progress: 0 },
    large: { loading: false, progress: 0 },
    xLarge: { loading: false, progress: 0 },
  }

  onClick = (name) => () => {
    let progress = 0
    const interval = setInterval(() => {
      progress = Math.min(progress + Math.random() * 0.1, 1)
      this.setState((state) => ({
        [name]: {
          loading: progress < 1,
          progress,
        },
      }))

      if (progress === 1) {
        clearInterval(interval)
      }
    }, 200)
  }

  render() {
    return (
      <article className="examples">
        <div className="intro">
          <h1>Ladda</h1>
          <p>
            A UI concept which merges loading indicators into the action that
            invoked them. Primarily intended for use with forms where it gives
            users immediate feedback upon submit rather than leaving them
            wondering while the browser does its thing. For a real-world
            example, check out any of the forms on{' '}
            <a href="http://slides.com">slides.com</a>.
          </p>
        </div>
        <section className="button-demo">
          <h3>expand-left</h3>
          <LaddaButton
            loading={this.state.expLeft.loading}
            onClick={this.onClick('expLeft')}
            color={GREEN}
            style={EXPAND_LEFT}
          >
            Submit
          </LaddaButton>
        </section>
        <section className="button-demo">
          <h3>expand-right</h3>
          <LaddaButton
            loading={this.state.expRight.loading}
            onClick={this.onClick('expRight')}
            color={GREEN}
            style={EXPAND_RIGHT}
          >
            Submit
          </LaddaButton>
        </section>

        <section className="button-demo">
          <h3>expand-up</h3>
          <LaddaButton
            loading={this.state.expUp.loading}
            onClick={this.onClick('expUp')}
            color={GREEN}
            style={EXPAND_UP}
          >
            Submit
          </LaddaButton>
        </section>

        <section className="button-demo">
          <h3>expand-down</h3>
          <LaddaButton
            loading={this.state.expDown.loading}
            onClick={this.onClick('expDown')}
            color={GREEN}
            style={EXPAND_DOWN}
          >
            Submit
          </LaddaButton>
        </section>

        <section className="button-demo">
          <h3>contract</h3>
          <LaddaButton
            loading={this.state.expContract.loading}
            onClick={this.onClick('expContract')}
            color={RED}
            style={CONTRACT}
          >
            Submit
          </LaddaButton>
        </section>

        <section className="button-demo">
          <h3>contract-overlay</h3>
          <LaddaButton
            loading={this.state.expOverlay.loading}
            onClick={this.onClick('expOverlay')}
            color={RED}
            style={CONTRACT_OVERLAY}
          >
            Submit
          </LaddaButton>
        </section>

        <section className="button-demo">
          <h3>zoom-in</h3>
          <LaddaButton
            loading={this.state.expZoomIn.loading}
            onClick={this.onClick('expZoomIn')}
            color={RED}
            style={ZOOM_IN}
          >
            Submit
          </LaddaButton>
        </section>

        <section className="button-demo">
          <h3>zoom-out</h3>
          <LaddaButton
            loading={this.state.expZoomOut.loading}
            onClick={this.onClick('expZoomOut')}
            color={RED}
            style={ZOOM_OUT}
          >
            Submit
          </LaddaButton>
        </section>

        <section className="button-demo">
          <h3>slide-left</h3>
          <LaddaButton
            loading={this.state.expSlideLeft.loading}
            onClick={this.onClick('expSlideLeft')}
            color={BLUE}
            style={SLIDE_LEFT}
          >
            Submit
          </LaddaButton>
        </section>

        <section className="button-demo">
          <h3>slide-right</h3>
          <LaddaButton
            loading={this.state.expSlideRight.loading}
            onClick={this.onClick('expSlideRight')}
            color={BLUE}
            style={SLIDE_RIGHT}
          >
            Submit
          </LaddaButton>
        </section>

        <section className="button-demo">
          <h3>slide-up</h3>
          <LaddaButton
            loading={this.state.expSlideUp.loading}
            onClick={this.onClick('expSlideUp')}
            color={BLUE}
            style={SLIDE_UP}
          >
            Submit
          </LaddaButton>
        </section>

        <section className="button-demo">
          <h3>slide-down</h3>
          <LaddaButton
            loading={this.state.expSlideDown.loading}
            onClick={this.onClick('expSlideDown')}
            color={BLUE}
            style={SLIDE_DOWN}
          >
            Submit
          </LaddaButton>
        </section>

        <h3 id="progress">Built-in progress bar</h3>

        <section className="progress-demo">
          <h3>expand-right</h3>
          <LaddaButton
            loading={this.state.expRightProgress.loading}
            progress={this.state.expRightProgress.progress}
            onClick={this.onClick('expRightProgress')}
            color={PURPLE}
            style={EXPAND_RIGHT}
          >
            Submit
          </LaddaButton>
        </section>

        <section className="progress-demo">
          <h3>contract</h3>
          <LaddaButton
            loading={this.state.expContractProgress.loading}
            progress={this.state.expContractProgress.progress}
            onClick={this.onClick('expContractProgress')}
            color={PURPLE}
            style={CONTRACT}
          >
            Submit
          </LaddaButton>
        </section>

        <h3 id="sizes">Sizes</h3>

        <section className="progress-demo">
          <h3>Extra Small</h3>
          <LaddaButton
            loading={this.state.xSmall.loading}
            onClick={this.onClick('xSmall')}
            color={MINT}
            size={XS}
            style={EXPAND_RIGHT}
          >
            Submit
          </LaddaButton>
        </section>

        <section className="progress-demo">
          <h3>Small</h3>
          <LaddaButton
            loading={this.state.small.loading}
            onClick={this.onClick('small')}
            color={MINT}
            size={S}
            style={EXPAND_RIGHT}
          >
            Submit
          </LaddaButton>
        </section>

        <section className="progress-demo">
          <h3>Large</h3>
          <LaddaButton
            loading={this.state.large.loading}
            onClick={this.onClick('large')}
            color={MINT}
            size={L}
            style={EXPAND_RIGHT}
          >
            Submit
          </LaddaButton>
        </section>

        <section className="progress-demo">
          <h3>Extra Large</h3>
          <LaddaButton
            loading={this.state.xLarge.loading}
            onClick={this.onClick('xLarge')}
            color={MINT}
            size={XL}
            style={EXPAND_RIGHT}
          >
            Submit
          </LaddaButton>
        </section>
        <footer>
          <small class="outro">
            Example of{' '}
            <a href="https://www.npmjs.com/package/@zumper/react-ladda">
              @zumper/react-ladda
            </a>{' '}
            (<a href="https://github.com/zumper/react-ladda">Github</a>)<br />
          </small>
          <small class="outro">
            A React wrapper for{' '}
            <a href="https://github.com/hakimel/Ladda">Ladda</a> (
            <a href="https://lab.hakim.se/ladda/">Example</a>)
          </small>
        </footer>
      </article>
    )
  }
}

export default App
