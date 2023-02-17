import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleBlogChange = (event) => {
    setNewBlog(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()

    createBlog({
      title: newBlog,
      author: author,
      url: url
    })

    setNewBlog('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div className="blogform">
      <h3>Create new blog</h3>
      <form onSubmit={addBlog}>
      Title:
        <input
          id="title"
          type="text"
          placeholder="Add title"
          value={newBlog}
          onChange={handleBlogChange}
        />
        <br />
        Author:
        <input
          id="author"
          type="text"
          placeholder="Add author"
          value={author}
          onChange={handleAuthorChange}
        />
        <br />
        URL:
        <input
          id="url"
          type="text"
          placeholder="Add url"
          value={url}
          onChange={handleUrlChange}
        />
        <button type="submit">Save</button>
      </form>
    </div>
  )
}

export default BlogForm