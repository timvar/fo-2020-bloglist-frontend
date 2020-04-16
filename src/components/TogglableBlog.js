import React, { useState, useImperativeHandle } from 'react'

const TogglableBlog = React.forwardRef(({ buttonLabel, children, handleAddLike, user, handleRemoveBlog }, ref) => {
  const [visible, setVisible] = useState(false)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }
  const { url, likes } = children.props.blog
  const { blog } = children.props

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
        {likes} <button onClick={() => handleAddLike(children.props.blog)}>like</button> <br />

        {children.props.blog.user ?
          (children.props.blog.user.username === user.username ? <button onClick={() => handleRemoveBlog(blog)}>remove</button> : '')
          :
          ''}
      </div>
    </>
  )
})

export default TogglableBlog
