import { useState } from 'react'

export const Toggleable = ({ children, buttonLabel }) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div style={{marginBottom: '10px', marginTop: '10px'}}>
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