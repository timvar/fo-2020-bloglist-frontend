import React from 'react'

const CreateBlog = (props) => {
  const {
    handleCreateBlog,
    title,
    handleTitle,
    author,
    handleAuthor,
    url,
    handleUrl
  } = props

  return (
    <>
      <h1>create new</h1>
      <form onSubmit={handleCreateBlog}>
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

export default CreateBlog
