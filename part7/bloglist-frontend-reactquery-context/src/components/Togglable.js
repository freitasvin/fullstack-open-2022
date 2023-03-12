import React from 'react'
import { useState } from 'react'
import PropTypes from 'prop-types'
import { Button } from '@mui/material'

export const Togglable = ({ children, buttonLabel }) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div style={{ marginBottom: '10px', marginTop: '10px' }}>
      <div hidden={visible}>
        <Button variant="contained" onClick={toggleVisibility}>
          {buttonLabel}
        </Button>
      </div>
      <div hidden={!visible}>
        {children}
        <Button onClick={toggleVisibility}>cancel</Button>
      </div>
    </div>
  )
}

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}
