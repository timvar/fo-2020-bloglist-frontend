import React from 'react'

import PropTypes from 'prop-types'

const Blog = ({ blog, handleAddLike, user, handleRemoveBlog }) => (
  <>
    {blog.title} {blog.author} <br />
    url: {blog.url} <br />
    likes: {blog.likes} <button onClick={() => handleAddLike(blog)}>like</button> <br />
    {blog.user ?
      (blog.user.username === user.username ? <button id="remove-button" onClick={() => handleRemoveBlog(blog)}>remove</button> : '') :
      ''}
  </>
)

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default Blog
