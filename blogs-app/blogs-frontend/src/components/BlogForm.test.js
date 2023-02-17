import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

// 5.16
test('<BlogForm /> updates parent state and calls onSubmit', () => {
  const createBlog = jest.fn()

  render(<BlogForm createBlog={createBlog} />)

  const titleInput = screen.getByPlaceholderText('Add title')
  const authorInput = screen.getByPlaceholderText('Add author')
  const urlInput = screen.getByPlaceholderText('Add url')
  const sendButton = screen.getByText('Save')

  userEvent.type(titleInput, 'testing title...')
  userEvent.type(authorInput, 'testing author...')
  userEvent.type(urlInput, 'testing url...')
  userEvent.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('testing title...')
  expect(createBlog.mock.calls[0][0].author).toBe('testing author...')
  expect(createBlog.mock.calls[0][0].url).toBe('testing url...')
})