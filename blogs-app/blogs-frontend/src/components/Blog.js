import { useState } from 'react'

const Blog = ({ blog, addBlogLike, deleteBlog, user }) => {
  const [blogInfo, setBlogInfo] = useState(false)

  let buttonText = 'View'

  blogInfo ? buttonText = 'Hide' : buttonText = 'View'

  const handleBlogInfoChange = () => {
    setBlogInfo(!blogInfo)
  }

  return (
    <div id="blog" className="blog">
      <p>{blog.title} written by {blog.author}</p>
      <p><button id="view-button" className="view-button" onClick={handleBlogInfoChange}>{buttonText}</button></p>
      <div className="blog-info">
        {blogInfo ?
          <>
            <ul>
              <li>Author: {blog.author}</li>
              <li>URL: {blog.url}</li>
              <li>Likes: {blog.likes}
                <button id="like-button" className="like-button" onClick={addBlogLike}>Like</button>
              </li>
            </ul>
            <button id="delete-button" className="delete-button" onClick={deleteBlog} style={{ display: blog.author === user.username || blog.author === user.name ? 'block' : 'none' }}>Delete</button>
          </>
          : <></>
        }
      </div>
    </div>
  )
}

export default Blog