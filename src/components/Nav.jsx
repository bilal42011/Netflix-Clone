import { useState, useEffect } from "react"
import { navStyles, netflixLogo } from "../assets"

const Nav = () => {
    const [show, handleShow] = useState(false);

    const transitionNavBar = () => {
        console.log("inside handler, ", show);
        if (window.scrollY > 100) {
            handleShow(true);
        }
        else {
            handleShow(false);
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", transitionNavBar);
        return () => window.removeEventListener("scroll", transitionNavBar);
    }, []);

    console.log(show);

    return (
        <div className={`nav ${show && 'nav__black'}`}>
            <div className="nav__contents">
                <img src={netflixLogo} className="nav__logo" />
                <button>Sign In</button>
            </div>
        </div>
    )
}

export default Nav