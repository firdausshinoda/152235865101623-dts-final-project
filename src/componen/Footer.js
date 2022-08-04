import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <ul className="nav justify-content-center pb-2">
            <li className="nav-item">
                <Link to="/" className="nav-link py-2 px-4 text-dark">Copyright © 2022. Created with ❤ from Firdaus N.S.</Link>
            </li>
            <li className="nav-item">
                <Link to="/" className="nav-link py-2 px-4 text-dark">Pricing</Link>
            </li>
            <li className="nav-item">
                <Link to="/" className="nav-link py-2 px-4 text-dark">Become a contributor</Link>
            </li>
            <li className="nav-item">
                <Link to="/" className="nav-link py-2 px-4 text-dark">API</Link>
            </li>
            <li className="nav-item">
                <Link to="/" className="nav-link py-2 px-4 text-dark">Staff picks</Link>
            </li>
            <li className="nav-item">
                <Link to="/" className="nav-link py-2 px-4 text-dark">Free icons</Link>
            </li>
        </ul>
    )
}

export default Footer;