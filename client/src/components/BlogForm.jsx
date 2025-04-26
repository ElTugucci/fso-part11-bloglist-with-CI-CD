import React from 'react';
import { useState } from 'react';
const BlogForm = ({ createBlog }) => {
  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');

  const addBlog = (event) => {
    event.preventDefault();
    createBlog({
      title: title,
      author: author,
      url: url,
    });
    setAuthor('');
    setTitle('');
    setUrl('');
  };

  return (
    <div>
      <div>
        <h2>Create new</h2>
        <form onSubmit={addBlog}>
          <div>
            <label htmlFor="title">Title</label>

            <input
              id="title"
              className="title"
              name="Title"
              type="text"
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>

          <div>
            <label htmlFor="author">Author</label>
            <input
              id="author"
              className="author"
              name="Author"
              type="text"
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>

          <div>
            <label htmlFor="url">URL</label>
            <input
              id="url"
              className="url"
              name="URL"
              type="text"
              value={url}
              onChange={({ target }) => setUrl(target.value)}
            />
          </div>
          <div>
            <button type="submit">add blog</button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default BlogForm;
