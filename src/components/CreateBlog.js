import React, { useState } from 'react'
import PropTypes from 'prop-types'

const CreateBlog = ({ handleAddBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitle = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthor = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrl = (event) => {
    setUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    handleAddBlog({
      title,
      author,
      url
    })
    setAuthor('')
    setTitle('')
    setUrl('')
  } 

  return (
    <>
      <h1>create new</h1>
      <form onSubmit={addBlog}>
        <div>
          title:
            <input
            type="text"
            value={title}
            name="title"
            onChange={handleTitle}
          />
        </div>
        <div>
          author:
            <input
            type="text"
            value={author}
            name="author"
            onChange={handleAuthor}
          />
        </div>
        <div>
          url:
            <input
            type="text"
            value={url}
            name="url"
            onChange={handleUrl}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  )
}

CreateBlog.propTypes = {
  handleAddBlog: PropTypes.func.isRequired
}

export default CreateBlog
