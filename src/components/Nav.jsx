import { useState, useEffect, useRef } from "react"
import { navStyles, netflixLogo, netflexAvatar } from "../assets"

const user = true;

const Nav = () => {
    const [show, handleShow] = useState(false);

    const navRef = useRef();

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

    useEffect(() => {
        const styles = getComputedStyle(navRef.current);
        console.log("STYLES: ", styles.position);
        if (user) {
            navRef.current.style.setProperty('position', "fixed");
            root.style.setProperty('--nav-total-width', "100%");
        }
        else {
            navRef.current.style.setProperty('position', "absolute");
            root.style.setProperty('--nav-total-width', "83.33333333333334%");
        }
    }, [user]);

    console.log(show);

    return (
        <div className={`nav ${(show && user) && 'nav__black'}`}
            ref={navRef}>
            <div className="nav__contents">
                <img src={netflixLogo} className="nav__logo" />
                {
                    !user && <button className="signIn__button">Sign In</button>
                }
                {
                    user && <img src={netflexAvatar} className="nav__avatar" />
                }
            </div>
        </div>
    )
}

export default Nav