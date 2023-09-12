import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register, reset } from "../../features/userSlice";
import { toast } from "react-toastify";
import Loader from "./Loader";

const RegisterForm = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const { username, password, confirmPassword } = form;

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onSubmit = (e) => {
    e.preventDefault();

    if (!(username && password && confirmPassword)) {
      toast.error("Please enter all fields");
    } else if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      const userData = {
        username: username,
        password: password,
        confirmPassword: confirmPassword,
      };

      dispatch(register(userData));
      console.log("Register form submitted");
    }
  };

  const onChange = (e) => {
    const { name, value } = e.target;

    console.log(name + ": " + value);

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
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          placeholder="Confirm password: "
          value={confirmPassword}
          onChange={onChange}
        />
        <button type="submit">Register!</button>
      </form>
    </>
  );
};

export default RegisterForm;
