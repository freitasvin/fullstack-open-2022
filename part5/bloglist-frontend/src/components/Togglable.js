import React from 'react'
import { useState } from 'react'
import PropTypes from 'prop-types'

export const Togglable = ({ children, buttonLabel }) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div style={{ marginBottom: '10px', marginTop: '10px' }}>
      <div hidden={visible}>
        <button onClick={toggleVisibility}>{buttonLabel}</button>
      </div>
      <div hidden={!visible}>
        {children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
}

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}