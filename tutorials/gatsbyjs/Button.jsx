/**
 * @prettier
 */
import React, { Component } from 'react'

class Button extends Component {
  constructor(props) {
    super(props)
    this.state = {
      clicked: false
    }
  }

  render() {
    const { clicked } = this.state
    return (
      <button
        type="button"
        onClick={() => {
          this.setState({
            clicked: !clicked
          })
        }}
      >
        {clicked ? 'clicked' : 'click me'}
      </button>
    )
  }
}

export default Button
