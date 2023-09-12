import { FaSignInAlt, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <h2>
        <Link to="/">Home</Link>
        <Link to="/register">
          <FaSignInAlt></FaSignInAlt>Register
        </Link>
        <Link to="/login">
          <FaUser></FaUser>Login
        </Link>
      </h2>
    </>
  );
};

export default Header;
