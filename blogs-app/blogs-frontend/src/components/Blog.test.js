import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

// Random test
test('renders blog content', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Test'
  }

  const { container } = render(<Blog blog={blog} />)

  const div = container.querySelector('.blog')
  expect(div).toHaveTextContent('Component testing is done with react-testing-library')
})

// 5.13
test('renders title and author, but not url and likes', () => {
  const blog = {
    title: 'Test title',
    author: 'tester',
    url: 'http://exampleurl.url',
    likes: 0
  }

  const { container } = render(<Blog blog={blog} />)

  const div = container.querySelector('.blog')
  screen.debug()

  expect(div).toHaveTextContent(`${blog.title}`)
  expect(div).toHaveTextContent(`${blog.author}`)
  expect(div).not.toHaveTextContent(`${blog.url}`)
  expect(div).not.toHaveTextContent(`${blog.likes}`)
})

// 5.14
test('renders full blog content (also url and likes) when button pressed', () => {
  const user = {
    username: 'juanhy',
    name: 'Juha H',
    password: '1234'
  }

  const blog = {
    title: 'Test title',
    author: 'tester',
    url: 'http://exampleurl.url',
    likes: 0
  }

  const { container } = render(<Blog blog={blog} user={user} />)

  const div = container.querySelector('.blog')

  const viewButton = container.querySelector('.view-button')
  userEvent.click(viewButton)

  const infoDiv = container.querySelector('.blog-info')

  expect(div).toHaveTextContent(`${blog.title}`)
  expect(infoDiv).toHaveTextContent(`${blog.author}`)
  expect(infoDiv).toHaveTextContent(`${blog.url}`)
  expect(infoDiv).toHaveTextContent(`${blog.likes}`)
})

// 5.15
test('if like button pressed twice, eventhandler called twice', () => {
  const user = {
    username: 'juanhy',
    name: 'Juha H',
    password: '1234'
  }

  const blog = {
    title: 'Test title',
    author: 'tester',
    url: 'http://exampleurl.url',
    likes: 10
  }

  const addBlogLike = jest.fn()

  const { container } = render(<Blog blog={blog} user={user} addBlogLike={addBlogLike} />)

  const viewButton = container.querySelector('.view-button')
  userEvent.click(viewButton)

  const likeButton = container.querySelector('.like-button')
  userEvent.click(likeButton)
  userEvent.click(likeButton)

  expect(addBlogLike.mock.calls).toHaveLength(2)
})