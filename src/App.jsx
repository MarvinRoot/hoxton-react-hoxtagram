import { useState, useEffect } from 'react'
import './App.css'
import AddPostForm from './components/AddPostForm'
import Post from './components/Post'

function App() {

  const [images, setImages] = useState([])
  const [comments, setComments] = useState([])

  useEffect(() => {
    fetch('http://localhost:8000/images').then(resp => resp.json())
    .then(imagesFromServer => setImages(imagesFromServer))

    fetch('http://localhost:8000/comments').then(resp => resp.json())
    .then(commentsFromServer => setComments(commentsFromServer))
  }, [])

  function updateLikes(image){
    //update state
    const updatedImages = JSON.parse(JSON.stringify(images))
    const match = updatedImages.find(target => target.id === image.id)
    match.likes++
    setImages(updatedImages)
    //update server
    return fetch(`http://localhost:8000/images/${image.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(image)
    })
  }

  function deletePost(image) {
    //update state
    let updatedImages = images.filter(targetImage => {
      return image.id != targetImage.id
    })
    setImages(updatedImages)

    //update server
    return fetch(`http://localhost:8000/images/${image.id}`, {
      method: 'DELETE'
  })
  }

  function deleteComment(comment) {
    //update state
    let updatedComments = comments.filter(targetComment => {
      return comment.content != targetComment.content
    })
    setComments(updatedComments)
    //update server
    return fetch(`http://localhost:8000/comments/${comment.id}`, {
      method: 'DELETE'
    })
  }

  function addComment(image, text){
    //update state
    let updatedComments = JSON.parse(JSON.stringify(comments))
    updatedComments.push({content: text, imageId: image.id})
    setComments(updatedComments)
    //update server
    return fetch('http://localhost:8000/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({content: text, imageId: image.id})
    }).then(resp => resp.json())
    fetch('http://localhost:8000/images/${image.id}/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({content: text, imageId: image.id})
    }).then(resp => resp.json())
  }

  function addPost(title, url) {
    //update state
    let updatedImages = JSON.parse(JSON.stringify(images))
    updatedImages.push({title: title, image: url, likes: 0, comments: []})
    setImages(updatedImages)
    //update server
    return fetch('http://localhost:8000/images', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({title: title, image: url, likes: 0, comments: []})
    }).then(resp => resp.json())
  }

  return (
    <div className="App">

      <img className="logo" src="assets/hoxtagram-logo.png" />
      <section className="image-container">
        
        <AddPostForm addPost = {addPost}/>

        {images.map(image => (
          <Post image = {image} 
          deletePost = {deletePost} 
          updateLikes = {updateLikes} 
          comments = {comments} 
          deleteComment = {deleteComment} 
          addComment = {addComment}/>
        ))}
      </section>
    </div>
  )
}

export default App
