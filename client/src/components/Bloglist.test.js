/**
 * @jest-environment jsdom
 */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import Blog from './Blog';
import { renderWithProviders } from '../util/renderWithProviders';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('<Blog />', () => {
  const blog = {
    id: '12345',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://example.com',
    likes: 5,
    user: { name: 'Arto Hellas' },
    comments: [],
  };

  const renderBlog = () => {
    return renderWithProviders(<Blog />, {
      preloadedState: { blogs: [blog] },
      route: `/blogs/${blog.id}`,
      path: '/blogs/:id',
    });
  };

  beforeEach(() => {
    localStorage.setItem('loggedBlogappUser', JSON.stringify({ name: 'Arto Hellas' }));
  });

  afterEach(() => {
    localStorage.clear();
  });

  test('renders blog', async () => {
    renderBlog();
    await screen.findByText(blog.title);
    expect(screen.getByText(blog.title)).toBeInTheDocument();
    expect(screen.getByText(/by\s+Edsger W\. Dijkstra/)).toBeInTheDocument();
    expect(screen.getByText(blog.url)).toBeInTheDocument();
    expect(screen.getByText('delete')).toBeInTheDocument();
  });
});
