import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Blog } from './Blog'

describe('Testing blog component', () => {
  const blog = {
    title: 'React test library',
    author: 'Somebody',
    url: 'www.testing-library.com',
    likes: 20,
    user: {
      username: 'Vinícius'
    }
  }

  test('should render only title and author by default', async () => {
    const mockUpdate = jest.fn()
    const mockDelete = jest.fn()

    render(<Blog blog={blog} updateBlog={mockUpdate} deleteBlog={mockDelete}/>)

    const element = screen.getByText(
      `${blog.title} ${blog.author}`
    )
    const button = screen.getByText('view')
    let userDetails = screen.queryByText(blog.url && `likes: ${blog.likes}`)

    expect(element).toBeDefined()
    expect(button).toBeDefined()
    expect(userDetails).toBeNull()

    userEvent.click(button)
    userDetails = screen.queryByText(blog.url && `likes: ${blog.likes}`)

    expect(userDetails).toBeDefined()
  })
})