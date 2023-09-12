import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout, reset } from "../../features/userSlice";

const Header = () => {
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const Logout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <>
      <header>
        <Link to="/">Home</Link>
        {user ? (
          <section>
            <h1>Welcome {user.username}</h1>
            <button onClick={Logout}>
              <FaSignOutAlt></FaSignOutAlt>Logout
            </button>
          </section>
        ) : (
          <section>
            <Link to="/register">
              <FaSignInAlt></FaSignInAlt>Register
            </Link>
            <Link to="/login">
              <FaUser></FaUser>Login
            </Link>
          </section>
        )}
      </header>
    </>
  );
};

export default Header;
