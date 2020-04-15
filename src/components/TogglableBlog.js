import React, { useState, useImperativeHandle } from 'react'

const TogglableBlog = React.forwardRef(({ buttonLabel, children}, ref) => {
  const [visible, setVisible] = useState(false)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }
  const { url, likes } = children.props.blog

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return { toggleVisibility }
  })

  return (
    <>
      <div style={hideWhenVisible}>
        {children} <button onClick={toggleVisibility}>{buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {children} <button onClick={toggleVisibility}>hide</button><br />
        {url} <br />
        {likes} <button>like</button> <br />
      </div>
    </>
  )
})

export default TogglableBlog
