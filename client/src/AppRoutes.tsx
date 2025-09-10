import { Route, Routes } from "react-router";
import { createContext, useContext } from "react";
import Home from "./components/application-layout/Home";
import PostPage from "./pages/PostPage";
import CreateNewPost from "./pages/CreateNewPost";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import type { User } from "./types";
import PostProtection from "./components/PostProtection";
import LoginScreen from "./components/LoginScreen";


export const UserContext = createContext<User>({
  name: '',
  id: 0,
  token: '',
});

export default function AppRoutes() {


  return (
    <UserContext.Provider value={{ name: 'Guest', id: 0, token: '' }}>

      <Routes>
        <Route path='/' element={<Home />} >

          <Route path="/" element={<LoginScreen />} />

          //Component to maintain post routers
          <Route path="/" element={<PostProtection />}>
            <Route path="/posts/:id" element={<PostPage />} />
            <Route path="posts/newpost" element={<CreateNewPost />} />
          </Route>
        
          <Route path='/signup' element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </UserContext.Provider>

  )


}
