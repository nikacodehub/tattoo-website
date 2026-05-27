import {Link} from "react-router-dom";
import "./Navbar.css"

function Navbar() {
    return (
        <nav>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/booking">Booking</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/flash">Flash</Link>
            <Link to="/portfolio">Portfolio</Link>
        </nav>
    );
}

export default Navbar;