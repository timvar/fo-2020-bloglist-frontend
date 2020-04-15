import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

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

const ShowBlogs = (props) => {
  const {
    blogs,
    user,
    handleLogout,
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
      <h2>blogs</h2>
      <ShowUser user={user} handleLogout={handleLogout} />
      <CreateBlog
        handleCreateBlog={handleCreateBlog}
        title={title}
        handleTitle={handleTitle}
        author={author}
        handleAuthor={handleAuthor}
        url={url}
        handleUrl={handleUrl} />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </>
  )
}

const ShowUser = ({ user, handleLogout }) => (
  <>
    <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
  </>
)


const LoginForm = ({ handleLogin, handleUsername, handlePassword, username, password }) => {
  return (
    <>
      <h1>log in to application</h1>
      <form onSubmit={handleLogin}>
        <div>
          username
            <input
            type="text"
            value={username}
            name="Username"
            onChange={handleUsername}
          />
        </div>
        <div>
          password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={handlePassword}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </>
  )
}


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleTitle = event => {
    setTitle(event.target.value)
  }

  const handleAuthor = event => {
    setAuthor(event.target.value)
  }

  const handleUrl = event => {
    setUrl(event.target.value)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
    } catch (error) {
      console.log('wrong username or password')
    } finally {
      setUsername('')
      setPassword('')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }

  const handleUsername = (event) => {
    setUsername(event.target.value)
  }

  const handlePassword = event => {
    setPassword(event.target.value)
  }

  const handleCreateBlog = async (event) => {
    event.preventDefault()
    try {
      const blog = await blogService.createBlog({
        title,
        author,
        url
      })
      setBlogs(blogs.concat(blog))
    } catch (error) {
      console.log('create blog failed')
    }
  }

  return (
    <div>
      {user ?
        <ShowBlogs
          blogs={blogs}
          user={user}
          handleLogout={handleLogout}
          handleAuthor={handleAuthor}
          handleTitle={handleTitle}
          handleUrl={handleUrl}
          author={author}
          title={title}
          url={url}
          handleCreateBlog={handleCreateBlog}
        />
        :
        <LoginForm
          handleLogin={handleLogin}
          handlePassword={handlePassword}
          handleUsername={handleUsername}
          username={username}
          password={password} />
      }
    </div>
  )
}

export default App
