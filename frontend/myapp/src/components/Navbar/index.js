import { Link } from "react-router-dom";
import { useState } from "react"
import "./index.css"
import { FcGenericSortingDesc } from "react-icons/fc";

const Navbar = () => {
    const [show, setShow] = useState(false)

    const isLoggin = localStorage.getItem("isLoggin") === "true"
    const navItems = () => {
        setShow(!show)
    }
    return (
        <nav className="nav-container">
            <div>
                <h3>fitjob</h3>

            </div>
            <ul className={`ul-container ${show ? "show-menu" : ""}`}>

                <li> <Link to="/">Home</Link></li>
                {isLoggin ? (<li><Link to="/jobs">job</Link></li>) : (<>
                    <li><Link to="/register">Register</Link></li>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/profile">Profile</Link></li></>)}


            </ul>
            <FcGenericSortingDesc className="home-icon" onClick={navItems} value={show} />


        </nav>
    );
};

export default Navbar;
