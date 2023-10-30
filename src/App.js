import React from "react";
import Signup from "./components/Signup";
import Category from './components/Category'
import UserPage from './components/UserPage'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Movies from './components/Movies'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Signup/>}/>
        <Route exact path='/category' element={<Category/>}/>
        <Route exact path='/user' element={<UserPage/>}/>
        <Route exact path ='/movies' element={<Movies/>} />
        {/* <Signup /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
