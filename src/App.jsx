import { useState, useEffect } from 'react'
import './App.css'

function App() {

  const [images, setImages] = useState([])
  const [comments, setComments] = useState([])

  useEffect(() => {
    fetch('http://localhost:8000/images').then(resp => resp.json())
    .then(imagesFromServer => setImages(imagesFromServer))

    fetch('http://localhost:8000/comments').then(resp => resp.json())
    .then(commentsFromServer => setComments(commentsFromServer))
  }, [])
  return (
    <div className="App">

    <img className="logo" src="assets/hoxtagram-logo.png" />
    
      {images.map(image => (
        <section className="image-container">
          <article className="image-card">
            <h2 className="title">{image.title}</h2>
            <img src={image.image} className="image" />
            <div className="likes-section">
              <span className="likes">{image.likes} likes</span>
              <button className="like-button">♥</button>
            </div>
            <ul className="comments">
              {comments.filter(comment => comment.imageId === image.id).map(comment => (
                <li>{comment.content}</li>
              ))}
            </ul>
          </article>
        </section>
      ))}
      
    </div>
  )
}

export default App
