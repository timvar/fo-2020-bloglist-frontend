import React from 'react'

import PropTypes from 'prop-types'

const Blog = ({ blog, handleAddLike, user, handleRemoveBlog }) => (
  <>
    {blog.title} {blog.author} <br />
    {blog.url} <br />
    {blog.likes} <button onClick={() => handleAddLike(blog)}>like</button> <br />
    {blog.user ?
      (blog.user.username === user.username ? <button onClick={() => handleRemoveBlog(blog)}>remove</button> : '') :
      ''}
  </>
)

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default Blog
