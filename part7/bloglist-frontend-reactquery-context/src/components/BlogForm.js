import React from 'react'
import { useField } from '../hooks/useField'
import { useCreateBlog } from '../hooks/mutations'

export const BlogForm = () => {
  const { reset: resetTitle, ...titleProps } = useField('text')
  const { reset: resetAuthor, ...authorProps } = useField('text')
  const { reset: resetUrl, ...urlProps } = useField('text')
  const { mutate: createBlog } = useCreateBlog()

  const handleSubmit = async (event) => {
    event.preventDefault()

    const blogData = {
      title: titleProps.value,
      author: authorProps.value,
      url: urlProps.value,
    }

    createBlog({ blogData: blogData })

    resetTitle()
    resetAuthor()
    resetUrl()
  }

  return (
    <div>
      <h1>create new</h1>
      <form onSubmit={handleSubmit}>
        <div>
          title
          <input id="title" {...titleProps} />
        </div>
        <div>
          author
          <input id="author" {...authorProps} />
        </div>
        <div>
          url
          <input id="url" {...urlProps} />
        </div>
        <button id="create-button" type="submit">
          create
        </button>
      </form>
    </div>
  )
}
