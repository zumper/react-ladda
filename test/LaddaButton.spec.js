import React from 'react'
import { findDOMNode } from 'react-dom'
import * as Ladda from 'ladda'

import LaddaButton from '../es/LaddaButton'
import { XL, SLIDE_UP } from '../es/constants'

describe('LaddaButton', () => {
  it('should render the elements correctly', () => {
    // The correct markup that Ladda expects is defined here:
    // https://github.com/hakimel/Ladda#html
    const wrapper = mount(<LaddaButton>child</LaddaButton>)
    const button = wrapper.find('button.ladda-button')
    expect(button).toExist()
    const label = button.find('span.ladda-label')
    expect(label).toExist()
    expect(label).toHaveText('child')
  })

  it('should pass data attributes down to the button', () => {
    const wrapper = render(
      <LaddaButton
        data-color="green"
        data-size={XL}
        data-style={SLIDE_UP}
        data-spinner-size={30}
        data-spinner-color="#ddd"
        data-spinner-lines={12}
      />
    )
    // https://github.com/FormidableLabs/enzyme-matchers/issues/30
    const attributes = wrapper['0'].attribs
    expect(attributes).toHaveProperty('data-color', 'green')
    expect(attributes).toHaveProperty('data-size', XL)
    expect(attributes).toHaveProperty('data-style', SLIDE_UP)
    expect(attributes).toHaveProperty('data-spinner-size', '30')
    expect(attributes).toHaveProperty('data-spinner-color', '#ddd')
    expect(attributes).toHaveProperty('data-spinner-lines', '12')
  })

  it('should not pass blacklisted props to the Ladda button', () => {
    const wrapper = mount(<LaddaButton loading progress={0.5} />)
    const button = wrapper.find('button')
    expect(button).not.toHaveProp('loading')
    expect(button).not.toHaveProp('progress')
  })

  it('should combine classNames correctly', () => {
    const wrapper = mount(<LaddaButton className="custom" />)

    expect(wrapper.find('button.ladda-button.custom')).toExist()
  })

  it('should pass props down to the button', () => {
    const handler = () => {}
    const wrapper = mount(<LaddaButton onClick={handler} />)
    expect(wrapper.find('button')).toHaveProp('onClick', handler)
  })

  it('should allow `loading` and `progress` to be changed in the same state update', () => {
    const wrapper = mount(<LaddaButton />)
    expect(wrapper.html()).not.toContain('ladda-progress')
    wrapper.setProps({ loading: true, progress: 0.4 })
    expect(wrapper.html()).toContain('ladda-progress')
  })

  it('should not disable the button if `props.loading` is falsey', () => {
    const wrapper = mount(<LaddaButton />)
    expect(wrapper.find('button').prop('disabled')).toBeUndefined()
  })

  it('should disable the button if the `props.disabled` is set', () => {
    const wrapper = mount(<LaddaButton disabled />)
    expect(wrapper.find('button')).toHaveProp('disabled', true)
  })

  it('should disable the button if `props.loading` is truthy', () => {
    const wrapper = mount(<LaddaButton loading />)
    expect(wrapper.find('button')).toHaveProp('disabled', true)
  })

  it('should keep the attribute `disabled` after loading', () => {
    const wrapper = mount(<LaddaButton disabled />)
    expect(wrapper.find('button')).toHaveProp('disabled', true)
    wrapper.setProps({ loading: true })
    wrapper.setProps({ loading: false })
    expect(wrapper.find('button')).toHaveProp('disabled', true)
  })

  describe('ladda instance', () => {
    let createStub
    let laddaInstance

    beforeEach(() => {
      laddaInstance = {
        remove: jest.fn(),
        setProgress: jest.fn(),
        start: jest.fn(),
        stop: jest.fn(),
      }
      createStub = jest
        .spyOn(Ladda, 'create')
        .mockImplementation(() => laddaInstance)
    })

    afterEach(() => {
      createStub.mockRestore()
    })

    it('should be maintained for the entire lifecycle of the component', () => {
      const wrapper = mount(<LaddaButton />)
      const node = findDOMNode(wrapper.instance())
      expect(createStub).toHaveBeenCalledWith(node)
      wrapper.unmount()
      expect(laddaInstance.remove).toHaveBeenCalledWith()
    })

    it('should receive setProgress call when progress is set', () => {
      const wrapper = mount(<LaddaButton />)
      expect(laddaInstance.setProgress).not.toHaveBeenCalled()

      wrapper.setProps({ progress: 0.5 })
      expect(laddaInstance.setProgress).toHaveBeenCalledWith(0.5)
      laddaInstance.setProgress.mockReset()

      wrapper.setProps({ progress: 0.6 })
      expect(laddaInstance.setProgress).toHaveBeenCalledWith(0.6)
      laddaInstance.setProgress.mockReset()

      wrapper.setProps({ progress: 0.6 })
      expect(laddaInstance.setProgress).not.toHaveBeenCalled()
    })

    it('should receive start and stop calls when loading is set', () => {
      const wrapper = mount(<LaddaButton />)
      expect(laddaInstance.stop).not.toHaveBeenCalled()
      expect(laddaInstance.start).not.toHaveBeenCalled()

      wrapper.setProps({ loading: true })
      expect(laddaInstance.start).toHaveBeenCalledWith()
      laddaInstance.start.mockReset()

      wrapper.setProps({ loading: true })
      expect(laddaInstance.start).not.toHaveBeenCalled()

      wrapper.setProps({ loading: false })
      expect(laddaInstance.stop).toHaveBeenCalledWith()
      laddaInstance.stop.mockReset()

      wrapper.setProps({ loading: false })
      expect(laddaInstance.stop).not.toHaveBeenCalled()
    })

    describe('when `props.progress` is initially set', () => {
      beforeEach(() => {
        mount(<LaddaButton progress={0.3} />)
      })

      it('should receive a setProgress call ', () => {
        expect(laddaInstance.setProgress).toHaveBeenCalledWith(0.3)
      })
    })

    describe('when `props.loading` is initially set', () => {
      beforeEach(() => {
        mount(<LaddaButton loading />)
      })

      it('should receive a start call', () => {
        expect(laddaInstance.start).toHaveBeenCalledWith()
      })
    })
  })
})
