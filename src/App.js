import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const ShowBlogs = ({ blogs, user, handleLogout }) => {
  return (
    <>
      <h2>blogs</h2>
      <ShowUser user={user} handleLogout={handleLogout} />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </>
  )
}

const ShowUser = ({ user, handleLogout }) => {
  return (
    <>
      <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
    </>
  )
}

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
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      console.log('wrong username or password')
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

  return (
    <div>
      {user ?
        <ShowBlogs blogs={blogs} user={user} handleLogout={handleLogout} />
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
