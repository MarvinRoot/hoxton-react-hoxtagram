
function AddPostForm(props) {

    return (
        <form className="comment-form image-card"
        onSubmit={(e) => {
          e.preventDefault()
          props.addPost(e.target.title.value, e.target.image.value)
          e.target.reset()
        }}>
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
    )
}

export default AddPostForm