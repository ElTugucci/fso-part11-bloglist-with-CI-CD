// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { blogLike, blogDelete, commentAdd } from '../reducers/blogReducer'
import { setError } from '../reducers/errorReducer'
import { setNotification } from '../reducers/notificationReducer'

const Blog = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const [showDelete, setShowDelete] = useState(false)
  const loggedUser = JSON.parse(localStorage.getItem('loggedBlogappUser'))
  const navigate = useNavigate()

  const blogs = useSelector((state) => state.blogs)

  // Find the blog based on the ID
  const blog = blogs.find((b) => b.id === id)

  // Effect hook to show or hide the delete button based on user ownership
  useEffect(() => {
    if (blog && blog.user && loggedUser) {
      setShowDelete(loggedUser.name === blog.user.name)
    }
  }, [blog, loggedUser])

  const like = () => {
    try {
      dispatch(blogLike(id))
    } catch (exception) {
      console.log('Error updating blog:', exception)
    }
  }

  const deleteBlog = async () => {
    if (blog && window.confirm(`Do you want to delete ${blog.title} by ${blog.author}?`)) {
      try {
        dispatch(blogDelete(blog.id))
        dispatch(setNotification(`${blog.title} deleted successfully`, 5))
        navigate('/')
      } catch (exception) {
        console.log(exception)
        dispatch(setError(`${exception.response.data.error}`, 5))
      }
    }
  }

  const addCommentHandler = async (event) => {
    event.preventDefault()
    const comment = event.target.comment.value
    event.target.comment.value = ''
    try {
      dispatch(commentAdd(id, comment))
    } catch (error) {
      console.error('Error adding comment:', error)
    }
  }

  // Loading state if no blog is found
  if (!blog) {
    return <h1>Loading...</h1>
  }

  return (
    <div style={{ paddingTop: 10, paddingLeft: 2, marginBottom: 5 }}>
      <h2>{blog.title}</h2>
      <div>by {blog.author}</div>
      <a href={blog.url}>{blog.url}</a>
      <div>
        likes: {blog.likes}
        <button onClick={like}>like</button>
      </div>
      added by {blog.user && blog.user.name}
      {showDelete && (
        <button className="deleteButton" onClick={deleteBlog}>
          delete
        </button>
      )}
      <h4>comments</h4>
      <form onSubmit={addCommentHandler}>
        <input className="comment" />
        <button type="submit">add</button>
      </form>
      {blog.comments && blog.comments.length > 0 ? (
        <ul>
          {blog.comments.map((c, index) => (
            <li key={index}>{c}</li>
          ))}
        </ul>
      ) : (
        <div>no comments</div>
      )}
    </div>
  )
}

export default Blog
