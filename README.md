# @zumper/react-ladda

A React wrapper for [Ladda buttons](https://github.com/hakimel/Ladda). [Example](https://github.com/jsdir/react-ladda/blob/master/example/README.md)

## NOTE

This is a fork of [react-ladda](https://www.npmjs.com/package/react-ladda); [see here](https://github.com/jsdir/react-ladda/pull/58)

## Installation

`@zumper/react-ladda` can be installed directly through npm:

```sh
# with NPM
$ npm install --save @zumper/react-ladda

# with yarn
$ yarn add @zumper/react-ladda
```

## Usage

`LaddaButton` is a React component that renders a [Ladda button](https://github.com/hakimel/Ladda). You can change the button's loading state and progress using the `loading` and `progress` props.

```js
import React, { Component } from 'react'
import LaddaButton, { XL, SLIDE_UP } from '@zumper/react-ladda'

class MyButton extends Component {
  state = { loading: false, progress: 0 }

  onClick = () => {
    this.setState((state) => ({
      loading: true,
      progress: 0.5,
    }))
  }

  render() {
    const { loading, progress } = this.state
    return (
      <LaddaButton
        loading={loading}
        progress={progress}
        onClick={this.onClick}
        color="mint"
        size={XL}
        style={SLIDE_UP}
        spinnerSize={30}
        spinnerColor="#ddd"
        spinnerLines={12}
      >
        Click Here!
      </LaddaButton>
    )
  }
}

export default MyButton
```

## Including styles

Although this package doesn't include the styles for the Ladda buttons, there are many different ways to include them. You can read about [how to manage CSS](https://github.com/hakimel/Ladda#css) in the Ladda docs.

### With Webpack

If you are using webpack (or [create-react-app](https://facebook.github.io/create-react-app/)) to build your project you can easily import the required styles directly from the `ladda` package.

```js
// import the ladda theme directly from the ladda package.
import 'ladda/dist/ladda.min.css'

// optionally import the themeless styles to style the buttons yourself.
import 'ladda/dist/ladda-themeless.min.css'
```

### With SCSS

If you are using scss (or [create-react-app](https://facebook.github.io/create-react-app/)) on your project you can import the scss styles directly from the ladda package.

```scss
// import themeless styles directly from the ladda package
@import '~ladda/css/ladda';

// OR import the themed styles
@import '~ladda/css/ladda-themed';
```

## Props

All of the native [Ladda button options](https://github.com/hakimel/Ladda#html) are supported through props:

| Prop                                    | Type      | Description                                           |
| --------------------------------------- | --------- | ----------------------------------------------------- |
| `loading`                               | `boolean` | Displays the button's loading indicator               |
| `progress`                              | `number`  | Number from 0.0 to 1.0                                |
| `color` or `data-color`                 | `string`  | Color applied to the button (A [color](#colors))      |
| `size` or `data-size`                   | `string`  | A [button size](#sizes)                               |
| `style` or `data-style`                 | `string`  | A [button style](#styles)                             |
| `spinnerSize` or `data-spinner-size`    | `number`  | Number representing the size of the spinner in pixels |
| `spinnerColor` or `data-spinner-color`  | `string`  | Color applied to the spinner (eg. `#eee`)             |
| `spinnerLiones` or `data-spinner-lines` | `number`  | Number of spokes in the spinner                       |

## Colors, Sizes and Styles

Ladda comes with a variety of different [sizes and styles](http://lab.hakim.se/ladda/) that you can use. Button sizes and styles can be directly imported from `@zumper/react-ladda`:

```js
import LaddaButton, { GREEN, XS, EXPAND_LEFT } from '@zumper/react-ladda'
```

### Colors

- `GREEN`
- `RED`
- `BLUE`
- `PURPLE`
- `MINT`

### Sizes

- `XS`
- `S`
- `L`
- `XL`

### Styles

- `CONTRACT`
- `CONTRACT_OVERLAY`
- `EXPAND_LEFT`
- `EXPAND_RIGHT`
- `EXPAND_UP`
- `EXPAND_DOWN`
- `SLIDE_LEFT`
- `SLIDE_RIGHT`
- `SLIDE_UP`
- `SLIDE_DOWN`
- `ZOOM_IN`
- `ZOOM_OUT`
