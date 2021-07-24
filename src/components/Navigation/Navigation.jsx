import { Link } from "react-router-dom";

function Navigation() {
    return (
            <ul>
                <li>
                    <Link to="/">HOME</Link>
                </li>
                <li>
                    <Link to="/addmovie">ADD MOVIE</Link>
                </li>
            </ul>
    );
}

export default Navigation;