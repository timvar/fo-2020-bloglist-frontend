import React, { useState, useImperativeHandle } from 'react'

const TogglableBlog = React.forwardRef(({ buttonLabel, children }, ref) => {
  const [visible, setVisible] = useState(false)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }
  const { author, title } = children.props.blog

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return { toggleVisibility }
  })

  return (
    <>
      <div style={hideWhenVisible} className='initialContent'>
        {title} {author} <button onClick={toggleVisibility}>{buttonLabel}</button>
      </div>
      <div style={showWhenVisible} className='togglableContent'>
        {children} <button onClick={toggleVisibility}>hide</button><br />
      </div>
    </>
  )
})

TogglableBlog.displayName = 'TogglableBlog'

export default TogglableBlog
