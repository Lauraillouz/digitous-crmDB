import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/register">New account</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/contacts">Home</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
