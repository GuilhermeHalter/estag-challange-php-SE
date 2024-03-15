import "../css/HeaderStyle.css"
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <nav className="navbar">
            <ul>
                <li >
                    <Link to={"/"} className="Option">Home</Link>
                </li>
                <li>
                    <Link to={"/products"} className="Option">Products</Link>
                </li>
                <li>
                    <Link to={"/categories"} className="Option">Category</Link>
                </li>
                <li>
                    <Link to={"/history"} className="Option">History</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Header;