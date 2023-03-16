import {Routes,Route} from "react-router-dom"
import { useState } from "react";
import Login from './pages/login/Login';
import Layout from './components/Layout';
import Home from './pages/Home/Home';
import Signup from './pages/signup.js/Signup';
import Messenger from './pages/Messenger/Messenger';
import Profile from "./pages/profile/Profile";

function App() {
  
  return (
    <div className="App">
      <Routes>
        <Route path="/*" element={<Layout/>}>
          <Route index element={<Home/>}/>
          <Route path="profile/:id" element={<Profile/>}/>
        </Route>
        <Route path="/login" element={<Login/>}/>
        <Route path="/sign-up" element={<Signup/>}/>
        <Route path="/messenger" element={<Messenger/>}/>
      </Routes>
    </div>
  );
}

export default App;
