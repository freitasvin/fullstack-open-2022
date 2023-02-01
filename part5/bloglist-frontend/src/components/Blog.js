import { useState } from 'react'

export const Blog = ({blog}) => {
  const [buttonText, setButtonText] = useState('view')
  const [viewDetails, setViewDetails] = useState(false)

  const handleClickDetails = () => {
    setViewDetails(!viewDetails)
    setButtonText(viewDetails === true ? 'view' : 'hide')
  }

  return (
    <div className='blog'>
      {blog.title} {blog.author}
      <button onClick={handleClickDetails}>{buttonText}</button>
      {viewDetails && 
        <div>
          <div>{blog.url}</div>
          <div>
            {blog.likes}
            <button onClick={() => {}}>like</button>
          </div>
          <div>{blog.user.username}</div>
        </div>
      }
    </div>  
  )
}