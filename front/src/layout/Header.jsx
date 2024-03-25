import "../css/HeaderStyle.css"
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div>
            <nav className="navbar">

                <h1>Suite Store</h1>

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
        </div>

    );
}

export default Header;