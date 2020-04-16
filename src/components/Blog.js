import React from 'react'

import PropTypes from 'prop-types'

const Blog = ({ blog }) => (
  <>
    {blog.title} {blog.author}
  </>
)

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default Blog
