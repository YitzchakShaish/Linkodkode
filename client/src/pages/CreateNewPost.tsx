import { useState, type FormEvent } from "react";
import type { TypeCreatePost } from "../types";
import { creatPost } from "../api/postsApi";
import "./CreateNewPost.css"

export default function CreateNewPost() {

  const [newPost, setNewPost] = useState<TypeCreatePost>({ urlToImg: '', description: '', postersName: '', timePosting: '', ownerID: -1 });
  // const [sent, setSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, SetSuccessMessage] = useState('');




  async function sendPost() {

    console.log(newPost)
    try {
      const response = await creatPost(newPost);

      if (response.status === 201) {
        SetSuccessMessage("The post was added successfully.")
      }
      if (response.status === 400) {
        setErrorMessage("Invalid or Error: All three fields must be added: postersName, description, timePosting")
      }
      if (response.status === 500) {
        setErrorMessage("Error: Server error. Post not sent. Please try again later.")
      }
      const post = await response.json();
      console.log(response)
      console.log(post)

    } catch (error) {
      console.log(error)
      setErrorMessage("Error: Server error. Post not sent. Please try again later.")
    }
  }

  function handleSubmit(e: FormEvent) {
    // e.preventDefault();
    setNewPost((prev) => {
      return { ...prev, urlToImg: newPost.ownerID.toString(), timePosting: (new Date()).toLocaleString().toString() }

    })

    // setNewPost((prev) => ({
    //   ...prev,
    //   urlToImg: String(newPost.ownerID),
    //   timePosting: String((new Date()).toLocaleString())
    // }))
    console.log(newPost)

    sendPost()
  };


  if (errorMessage) {
    return <p className="message server-error-message">{errorMessage}</p>
  }

  return (
    <div className="post-form-container">


      <form onSubmit={handleSubmit} className="add-post-form" >
        <label >Enter your name:
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
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
}
