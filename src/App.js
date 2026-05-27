
import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import About from "./Pages/About";
import Booking from "./Pages/Booking";
import Contact from "./Pages/Contact";
import Flash from "./Pages/Flash";
import Home from"./Pages/Home";
import Portfolio from "./Pages/Portfolio";

import Navbar from "./Components/Navbar";

function App() {
  return (
    <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About /> }/>
      <Route path="/booking" element={<Booking /> }/>
      <Route path="/contact" element={<Contact /> }/>
      <Route path="/flash" element={<Flash /> }/>
       <Route path="/portfolio" element={<Portfolio /> }/>
    </Routes>
    </BrowserRouter>
  )
  
}

export default App;
