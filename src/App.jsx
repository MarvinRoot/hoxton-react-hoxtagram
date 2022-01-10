import { useState, useEffect } from 'react'
import './App.css'

function App() {

  const [images, setImages] = useState([])
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')

  useEffect(() => {
    fetch('http://localhost:8000/images').then(resp => resp.json())
    .then(imagesFromServer => setImages(imagesFromServer))

    fetch('http://localhost:8000/comments').then(resp => resp.json())
    .then(commentsFromServer => setComments(commentsFromServer))
  }, [])

  function updateLikes(image){
    //update state
    image.likes ++
    let updatedImages = JSON.parse(JSON.stringify(images))
    
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
  }
  return (
    <div className="App">

    <img className="logo" src="assets/hoxtagram-logo.png" />
    <section className="image-container">
      <form className="comment-form image-card">
        <h2 className="title">New Post</h2>
        <input
          className="comment-input"
          type="text"
          name="title"
          id="title"
          placeholder="Add a title..."
        />
        <input
          className="comment-input"
          type="url"
          name="image"
          id="image"
          placeholder="Add an image url..."
        />
        <button className="comment-button" type="submit">Post</button>
      </form>
      {images.map(image => (
          <article className="image-card">
            <h2 className="title">{image.title}</h2>
            <button className='comment-button' 
            onClick={() => deletePost(image)}>Delete Post</button>
            <img src={image.image} className="image" />
            <div className="likes-section">
              <span className="likes">{image.likes} likes</span>
              <button className="like-button" 
              onClick={() => updateLikes(image)}>♥</button>
            </div>
            <ul className="comments">
              {comments.filter(comment => comment.imageId === image.id).map(comment => (
                <li>{comment.content}
                <button className='comment-button'
                onClick={() => deleteComment(comment)}>Delete Comment</button>
                </li>
                
              ))}
            </ul>
            <form className="comment-form"
            onSubmit={(event) => {
              event.preventDefault()
              addComment(image, newComment)}}>
              <input
              className="comment-input"
              type="text"
              name="comment"
              placeholder="Add a comment..."
              onChange={e => setNewComment(e.target.value)}
              />
          <button className="comment-button" type="submit">Post</button>
        </form>
          </article>
      ))}
      </section>
    </div>
  )
}

export default App
