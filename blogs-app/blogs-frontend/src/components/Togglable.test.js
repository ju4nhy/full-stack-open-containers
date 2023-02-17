import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Togglable from './Togglable'

describe('<Togglable />', () => {
  let container

  beforeEach(() => {
    container = render(
      <Togglable buttonLabel="New blog">
        <div className="testDiv" >
          Create new blog
        </div>
      </Togglable>
    ).container
  })

  test('renders its children', () => {
    screen.getByText('Create new blog')
  })

  test('at start the children are not displayed', () => {
    const div = container.querySelector('.toggle')
    expect(div).toHaveStyle('display: none')
  })

  test('after clicking the button, children are displayed', () => {
    const button = screen.getByText('New blog')
    userEvent.click(button)

    const div = container.querySelector('.toggle')
    expect(div).not.toHaveStyle('display: none')
  })

  test('toggled content can be closed', () => {
    const button = screen.getByText('New blog')
    userEvent.click(button)

    const closeButton = screen.getByText('Cancel')
    userEvent.click(closeButton)

    const div = container.querySelector('.toggle')
    expect(div).toHaveStyle('display: none')
  })
})