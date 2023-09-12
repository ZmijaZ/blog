import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, reset } from "../../features/userSlice";
import { toast } from "react-toastify";
import Loader from "./Loader";

const LoginForm = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  //form destructuring
  const { username, password } = form;

  const { user, isError, isLoading, isSuccess, message } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      return toast.error(message);
    }

    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, message, isSuccess, isError, dispatch, navigate]);

  const onSubmit = (e) => {
    e.preventDefault();

    if (!(username && password)) {
      return toast.error("Fill the entire form");
    }
    const user = {
      username,
      password,
    };

    dispatch(login(user));
  };

  const onChange = (e) => {
    const { value, name } = e.target;

    setForm((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  if (isLoading) {
    return <Loader></Loader>;
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Username: "
          value={username}
          onChange={onChange}
          pattern="[A-Za-z]+"
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password: "
          value={password}
          onChange={onChange}
        />
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default LoginForm;
