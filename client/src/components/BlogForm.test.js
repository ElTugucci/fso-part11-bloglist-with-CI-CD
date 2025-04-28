/**
 * @jest-environment jsdom
 */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import '@testing-library/jest-dom'
import { screen, render } from '@testing-library/react'
import { act } from 'react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('<BlogForm> submits the form and passes correct details to event handler', async () => {
  const addBlog = jest.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={addBlog} />)

  const titleInput = screen.getByRole('textbox', { name: /title/i })
  const authorInput = screen.getByRole('textbox', { name: /author/i })
  const urlInput = screen.getByRole('textbox', { name: /url/i })
  const sendButton = screen.getByRole('button', { name: /add blog/i })

  await act(async () => {
    await user.type(titleInput, 'Blog Title test')
    await user.type(authorInput, 'Blog Author test')
    await user.type(urlInput, 'Blog URL test')
    await user.click(sendButton)
  })

  expect(addBlog).toHaveBeenCalledTimes(1)

  const submittedData = addBlog.mock.calls[0][0]
  expect(submittedData.title).toBe('Blog Title test')
  expect(submittedData.author).toBe('Blog Author test')
  expect(submittedData.url).toBe('Blog URL test')
})
