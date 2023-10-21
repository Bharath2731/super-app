import React from "react";
import Signup from "./components/Signup";
import Category from './components/Category'
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/register' element={<Signup/>}/>
        <Route exact path='/category' element={<Category/>}/>
        {/* <Signup /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
