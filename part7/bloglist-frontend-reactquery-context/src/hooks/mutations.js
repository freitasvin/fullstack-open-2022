import { useContext } from 'react'
import { createBlog, putBlog, removeBlog } from '../services/blogs'
import { useMutation, useQueryClient } from 'react-query'
import { NotificationContext } from '../contexts/NotificationContext'

export const useCreateBlog = () => {
  const queryClient = useQueryClient()
  const { showNotificationDispatcher } = useContext(NotificationContext)

  return useMutation(createBlog, {
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData('blogs')
      queryClient.setQueryData('blogs', blogs.concat(newBlog))
      showNotificationDispatcher({
        text: `A new blog ${newBlog.title} by ${newBlog.author} added`,
        errorType: 'success',
        displayTime: 5,
      })
    },
    onError: () => {
      showNotificationDispatcher({
        text: 'Error on add a new blog',
        errorType: 'error',
        displayTime: 5,
      })
    },
  })
}

export const useUpdateBlog = () => {
  const queryClient = useQueryClient()
  const { showNotificationDispatcher } = useContext(NotificationContext)

  return useMutation('blogs', putBlog, {
    onSuccess: (updatedBlog) => {
      const blogs = queryClient.getQueryData('blogs')
      queryClient.setQueryData(
        blogs.map((blog) => (blog.id !== updatedBlog.id ? blog : updatedBlog))
      )
      showNotificationDispatcher({
        text: 'The blog was successfully updated',
        errorType: 'success',
        displayTime: 5,
      })
    },
    onError: () => {
      showNotificationDispatcher({
        text: 'Error on update a blog',
        errorType: 'error',
        displayTime: 5,
      })
    },
  })
}

export const useDeleteBlog = () => {
  const queryClient = useQueryClient()
  const { showNotificationDispatcher } = useContext(NotificationContext)

  return useMutation('blogs', removeBlog, {
    onSuccess: (deletedBlog) => {
      queryClient.invalidateQueries()
      showNotificationDispatcher({
        text: `Blog ${deletedBlog.title} was successfully deleted`,
        errorType: 'success',
        displayTime: 5,
      })
    },
    onError: () => {
      showNotificationDispatcher({
        text: 'Blog was not deleted',
        errorType: 'error',
        displayTime: 5,
      })
    },
  })
}
