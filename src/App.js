import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import CreateBlog from './components/CreateBlog'

const Notification = ({ message, messageClass }) => (
  message ?
    <div className={messageClass}> {message} </div>
    :
    null
)

const ShowBlogs = ({blogs}) => <>{blogs.map(blog => <Blog key={blog.id} blog={blog} />)}</>

const ShowUser = ({ user, handleLogout }) => <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [message, setMessage] = useState(null)
  const [messageClass, setMessageClass] = useState('')
  const createBlogRef = React.createRef()

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
      setMessageClass('error-message')
      setMessage('wrong username or password');
      setTimeout(() => {
        setMessage(null);
      }, 3000);
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
    createBlogRef.current.toggleVisibility()
    try {
      const blog = await blogService.createBlog({
        title,
        author,
        url
      })
      setBlogs(blogs.concat(blog))
      setMessageClass('message')
      setMessage(`a new blog ${blog.title} by ${blog.author} added`);
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    } catch (error) {
      setMessageClass('error-message')
      setMessage('create blog failed');
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    } finally {
      setTitle('')
      setAuthor('')
      setUrl('')
    }
  }

  return (
    <>
      <Notification message={message} messageClass={messageClass} />
      {user ?
        <>
          <h1>blogs</h1>
          <ShowUser user={user} handleLogout={handleLogout} />
          <Togglable buttonLabel='new blog' ref={createBlogRef}>
            <CreateBlog
              handleCreateBlog={handleCreateBlog}
              title={title}
              handleTitle={handleTitle}
              author={author}
              handleAuthor={handleAuthor}
              url={url}
              handleUrl={handleUrl} />
          </Togglable>
          <ShowBlogs
            blogs={blogs}
            user={user}
            handleLogout={handleLogout}
          />
        </>
        :
        <LoginForm
          handleLogin={handleLogin}
          handlePassword={handlePassword}
          handleUsername={handleUsername}
          username={username}
          password={password} />
      }
    </>
  )
}

export default App
