import React from 'react'
import { useField } from '../hooks/useField'
import { useCreateBlog } from '../hooks/mutations'
import { Box, Typography, TextField, Button } from '@mui/material'

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
      <Typography variant="h4">create new</Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <div>
          <TextField id="title" label="Title" variant="outlined" />
        </div>
        <div>
          <TextField id="author" label="Author" variant="outlined" />
        </div>
        <div>
          <TextField id="url" label="Url" variant="outlined" />
        </div>
        <Button type="submit">create</Button>
      </Box>
    </div>
  )
}
