
import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import About from "./Pages/About";
import Booking from "./Pages/Booking";
import Contact from "./Pages/Contact";
import Flash from "./Pages/Flash";
import Home from"./Pages/Home";
import Portfolio from "./Pages/Portfolio";
import BlackGreyPortfolio from "./Pages/BlackGreyPortfolio";
import ColorPortfolio from "./Pages/ColorPortfolio";

import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

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
      <Route path="/portfolio/black-grey" element={<BlackGreyPortfolio /> }/>
      <Route path="/portfolio/color" element={<ColorPortfolio /> }/>
    </Routes>
    <Footer />
    </BrowserRouter>
  )
  
}

export default App;
