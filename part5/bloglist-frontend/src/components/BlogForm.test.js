import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BlogForm } from './BlogForm'

describe('Testing blog form component', () => {
  const mockAddBlog = jest.fn()

  test('<BlogForm /> updates parent state and calls onSubmit', () => {
    const { container } = render(<BlogForm addBlog={mockAddBlog} />)

    const input = container.querySelector('#title')
    const createButton = container.querySelector('#create')

    userEvent.type(input, 'Submiting...')
    userEvent.click(createButton)

    expect(mockAddBlog.mock.calls).toHaveLength(1)
    expect(mockAddBlog.mock.calls[0][0].title).toBe('Submiting...' )
  })
})