import "./Login.scss";
import Spinner from "../../components/Spinner/Spinner";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { login, reset } from "../../features/auth/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  useEffect(() => {
    if (isError) {
      alert(message);
    }
    if (isSuccess || user) {
      navigate("/home");
    }
    dispatch(reset());
  }, [dispatch, navigate, isError, isSuccess, user, message]);

  const onSubmit = (e) => {
    e.preventDefault();
    const userData = { email, password };
    dispatch(login(userData));
  };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="login">
      <div className="login__container">
        <div className="login__header">
          <h1 className="login__title">Hello Again</h1>
          <p className="login__subtitle">Welcome Back!</p>
        </div>
        <section className="login__form">
          <form onSubmit={onSubmit}>
            <div className="form__control">
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={onChange}
                placeholder="Email"
                required
                className="form__input"
              />
            </div>
            <div className="form__control">
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={onChange}
                placeholder="Password"
                required
                className="form__input"
              />
            </div>
            <button type="submit" className="btn">
              Login
            </button>
            <p className="small__text">
              Not registered yet? <Link to="/register">Create an account</Link>
            </p>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Login;
