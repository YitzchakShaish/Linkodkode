import { useState, type FormEvent } from "react";
import type { TypeCreatePost } from "../types";
import { createPost } from "../api/postsApi";
import "./CreateNewPost.css"

export default function CreateNewPost() {

  const [newPost, setNewPost] = useState<TypeCreatePost>({ urlToImg: '', description: '', postersName: '', timePosting: '', ownerID: -1 });
  const [sent, setSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');




  async function sendPost() {

    const postToSend = {
      ...newPost,
      urlToImg: String(newPost.ownerID),
      timePosting: String((new Date()).toLocaleString())
    };
    console.log(postToSend)
    setNewPost(postToSend)
    try {
      const response = await createPost(postToSend);

      if (response.status === 201) {

        //Error/success messages will be displayed for 2 seconds in the center of the screen.
        setSuccessMessage("The post was added successfully.")
        setTimeout(() => {
          setSuccessMessage("");
        }, 2000);

        //After successfully submitting a post.
        // I delete the entire post to allow for a new post to be submitted.
        setNewPost({ urlToImg: '', description: '', postersName: '', timePosting: '', ownerID: -1 })
      }
      if (response.status === 400) {
        setErrorMessage("Invalid or Error: All three fields must be added: postersName, description, timePosting")
        setTimeout(() => {
          setErrorMessage("");
        }, 2000);
      }
      if (response.status === 500) {
        setErrorMessage("Server error: Post not sent. Please try again later.")
        setTimeout(() => {
          setErrorMessage("");
        }, 2000);
      }
      const post = await response.json();
      console.log(response)
      console.log(post)

    } catch (error) {
      console.log(error)
      setErrorMessage("Server error: Post not sent. Please try again later.")
      setTimeout(() => {
        setErrorMessage("");
      }, 2000);
    }
    finally {
      setSent(false)
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSent(true)
    sendPost()
  };




  return (
    <div className="post-form-container">
      {/* //Error/success messages will be displayed for 2 seconds in the center of the screen. */}
      {errorMessage && <p className="message server-error-message">{errorMessage}</p>}
      {successMessage && <p className="message ">{successMessage}</p>}

      <form onSubmit={handleSubmit} className="add-post-form" >
        <label >Enter your name:
          <br />
          <input
            type="text"
            placeholder="postrs name"
            value={newPost.postersName}
            onChange={(e) => setNewPost((prev) => ({ ...prev, postersName: e.target.value }))}
            required
            minLength={3}
          />
        </label>

        <label >Enter your id:
          <br />
          <input
            type="number"
            placeholder="postrs id"
            value={newPost.ownerID}
            onChange={(e) => setNewPost((prev) => ({ ...prev, ownerID: Number(e.target.value) }))}
            required
          />
        </label>

        <label >Enter the description for the post:
          <textarea
            placeholder="description"
            value={newPost.description}
            onChange={(e) => setNewPost((prev) => ({ ...prev, description: e.target.value }))}
            minLength={20}
          />
        </label>
        <button type="submit">{!sent ? <>Create Post</> : <>Created</>}</button>
      </form>
    </div>
  );
}
