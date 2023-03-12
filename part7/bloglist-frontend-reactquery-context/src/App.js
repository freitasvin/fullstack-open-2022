import React, { useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { NotificationContext } from './contexts/NotificationContext'
import { UserContext } from './contexts/UserContext'
import { Navbar, Notification, LoginForm, Blogs, BlogPost, Users, User } from './components'
import { Container } from '@mui/material'

const App = () => {
  const { notification } = useContext(NotificationContext)
  const { user } = useContext(UserContext)

  return (
    <Container sx={{ height: '100vh' }}>
      <Navbar />
      <div>{notification && <Notification />}</div>
      <Routes>
        <Route path="/" element={<Blogs />} />
        <Route path="/login" element={!user ? <LoginForm /> : <Navigate replace to="/" />} />
        <Route path="/users" element={<Users />} />
        <Route path="/user/:id" element={<User />} />
        <Route path="/blogs/:id" element={<BlogPost />} />
      </Routes>
    </Container>
  )
}

export default App
