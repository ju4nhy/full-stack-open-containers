import { useState, useEffect, useRef } from 'react'
import styles from './app.css'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  // Handle Login
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password, })
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setMessage(`Welcome to Blogs App, ${username}`)
      setTimeOut()
    } catch (exception) {
      setMessage('Error! Wrong username or password')
      setTimeOut()
    }
    console.log('Logging in with', username, password)
    console.log(styles)
  }

  // Handle logout
  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  // Add a new blog
  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()

    checkFormFields(blogObject)

    blogService
      .create(blogObject)
      .then(createdBlog => {
        setBlogs(blogs.concat(createdBlog))
        setMessage(`Added new blog ${createdBlog.title}`)
        setTimeOut()
      })
  }

  // Add Like
  const addLike = (id) => {
    const blogToUpdate = blogs.find(blog => blog.id === id)
    const updatedBlog = { ...blogToUpdate, likes: blogToUpdate.likes + 1 }

    blogService
      .update(id, updatedBlog)
      .then(() => {
        blogService
          .getAll()
          .then(blogs => {
            setBlogs(blogs)
          })
      })
      .catch(() => {
        setMessage('Error! Blog was already removed from the server.')
        setTimeOut()
        setBlogs(blogs.filter(blog => blog.id !== id))
      })
  }

  // Delete blog
  const deleteBlog = (id) => {
    const blogToDelete = blogs.find(blog => blog.id === id)

    if (window.confirm(`Do you really want to delete ${blogToDelete.title} ?`)) {
      blogService
        .forcedelete(id)
        .then(() => {
          setMessage(`${blogToDelete.title} deleted`)
          setTimeOut()
          blogService
            .getAll()
            .then(blogs => {
              setBlogs(blogs)
            })
        })
    }
  }

  // Form field checker
  const checkFormFields = (blogObject) => {
    if (blogObject.title === '') {
      setMessage('Error! Cannot add blog. Title is missing')
      setTimeOut()
    } else if (blogObject.author === '') {
      setMessage('Error! Cannot add blog. Author is missing')
      setTimeOut()
    } else if (blogObject.url === '') {
      setMessage('Error! Cannot add blog. URL is missing')
      setTimeOut()
    }
  }

  // Timeout function
  const setTimeOut = () => {
    setTimeout(() => {
      setMessage(null)
    }, 3000)
  }

  // Sort blogs by likes
  const sortedBlogs = blogs.sort((a, b) => {
    return b.likes - a.likes
  })

  const blogFormRef = useRef()

  return (
    <div className="bg">
      <h1>Blogs Apps</h1>
      <Notification message={message} />
      {user === null || window.localStorage.length === 0 ?
        <Togglable buttonLabel='login'>
          <LoginForm
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
            handleLogin={handleLogin}
          />
        </Togglable>
        :
        <div>
          <p><b>{user.username}</b> logged in</p>
          <button onClick={handleLogout}>Log out</button>
          <Togglable buttonLabel="New blog" ref={blogFormRef}>
            <BlogForm
              createBlog={addBlog}
              blogs={blogs}
            />
          </Togglable>
          <h3>List of blogs</h3>
          {sortedBlogs.map((blog, i) =>
            <Blog
              key={i}
              blog={blog}
              addBlogLike={() => addLike(blog.id)}
              deleteBlog={() => deleteBlog(blog.id)}
              user={user}
            />
          )}
        </div>
      }
    </div>
  )
}

export default App