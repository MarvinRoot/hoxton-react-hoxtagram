function Post(props) {
    return (
        <article className="image-card">
              <h2 className="title">{props.image.title}</h2>
              <button className='comment-button' 
              onClick={() => props.deletePost(props.image)}>Delete Post</button>
              <img src={props.image.image} className="image" />
              <div className="likes-section">
                <span className="likes">{props.image.likes} likes</span>
                <button className="like-button" 
                onClick={() => props.updateLikes(props.image)}>♥</button>
              </div>
              <ul className="comments">
                {props.comments.filter(comment => comment.imageId === props.image.id).map(comment => (
                  <li>{comment.content}
                  <button className='comment-button'
                  onClick={() => props.deleteComment(comment)}>Delete Comment</button>
                  </li>
                  
                ))}
              </ul>
              <form className="comment-form"
              onSubmit={(e) => {
                e.preventDefault()
                props.addComment(props.image, e.target.comment.value)
                e.target.reset()}}>

                <input
                className="comment-input"
                type="text"
                name="comment"
                placeholder="Add a comment..."
                />
            <button className="comment-button" type="submit">Post</button>
          </form>
            </article>
    )
}
export default Post