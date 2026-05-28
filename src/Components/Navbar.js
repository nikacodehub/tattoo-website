import {Link} from "react-router-dom";
import {useState} from "react";
import "./Navbar.css"

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className={`navbar ${isOpen ? "navbar-open" : ""}`}>
            <Link
                to="/"
                className="navbar-home"
                aria-label="Go to home page"
                onClick={() => setIsOpen(false)}
            >
                <span className="navbar-home-roof"></span>
                <span className="navbar-home-body"></span>
            </Link>

            <button
                className="navbar-toggle"
                type="button"
                aria-label={isOpen ? "Close navigation" : "Open navigation"}
                aria-expanded={isOpen}
                onClick={() => setIsOpen(!isOpen)}
            >
                <span></span>
                <span></span>
                <span></span>
            </button>

            <div className="navbar-menu">
                <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
                <Link to="/about" onClick={() => setIsOpen(false)}>About</Link>
                <Link to="/booking" onClick={() => setIsOpen(false)}>Booking</Link>
                <Link to="/contact" onClick={() => setIsOpen(false)}>Contact</Link>
                <Link to="/flash" onClick={() => setIsOpen(false)}>Flash</Link>
                <Link to="/portfolio" onClick={() => setIsOpen(false)}>Portfolio</Link>
            </div>
        </nav>
    );
}

export default Navbar;
