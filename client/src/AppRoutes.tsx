import { Route, Routes } from "react-router";
import Home from "./components/application-layout/Home";
import PostPage from "./pages/PostPage";
import CreateNewPost from "./pages/CreateNewPost";


export default function AppRoutes() {

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path="/posts/:id" element={<PostPage />} />
      <Route path="posts/newpost" element={<CreateNewPost />}/>
    </Routes>

  )


}
