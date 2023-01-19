const totalLikes = blogs => {
  return blogs.lenght === 0
    ? 0
    : blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const biggerLikes = blogs => {
  return blogs.lenght === 0
    ? 0
    : blogs.reduce((maxLikes, blog) => blog.likes > maxLikes ? blog.likes : maxLikes, 0)
}

const favoriteBlog = blogs => {
  return blogs.lenght === 0
    ? []
    : blogs.filter(blog => blog.likes === biggerLikes(blogs))
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return {}
  } else {
    let authorCounts = blogs.reduce((authorCount, blog) => {
      authorCount[blog.author] = (authorCount[blog.author] || 0) + 1
      return authorCount
    }, {})
    let blogsCount = Math.max(...Object.values(authorCounts))
    let mostFrequent = Object.keys(authorCounts).filter(author => authorCounts[author] === blogsCount)
    return {
      author: mostFrequent[0],
      blogs: blogsCount
    }
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return {}
  } else {
    let likesCounts = blogs.reduce((likesCount, blog) => {
      likesCount[blog.author] = (likesCount[blog.author] || 0) + blog.likes
      return likesCount
    }, {})
    let likesCount = Math.max(...Object.values(likesCounts))
    let mostLiked = Object.keys(likesCounts).filter(blogAuthor => likesCounts[blogAuthor] === likesCount)
    return {
      author: mostLiked[0],
      likes: likesCount
    }
  }
}


module.exports = {
  totalLikes,
  biggerLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}