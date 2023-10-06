import { useRef, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";
import { useLoginMutation } from "./authApiSlice";

import usePersist from "../../hooks/usePersist";

const Login = () => {
  const userRef = useRef();
  const emailRef = useRef();
  const errRef = useRef();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const [persist, setPersist] = usePersist(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    userRef?.current?.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const handlePwdInput = (e) => setPassword(e.target.value);
  const handleEmailInput = (e) => setEmail(e.target.value);
  const handleToggle = (e) => setPersist((prev) => !prev);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { accessToken } = await login({
        email,
        password,
      }).unwrap();
      dispatch(setCredentials({ accessToken }));
      setEmail("");
      setPassword("");
      setUsername("");
      navigate("/dash/items");
    } catch (err) {
      if (!err.status) {
        setErrMsg("No Server Response");
      } else if (err.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg(err.data?.message);
      }
      errRef.current.focus();
    }
  };

  const errClass = errMsg ? "errmsg" : "offscreen";

  let content;
  if (isLoading) content = <p>Loading...</p>;

  content = (
    <section className="w-auto md:w-[400px] sm:w-screen h-screen bg-emerald-900 p-5">
      <header>
        <h1>User Login</h1>
      </header>
      <main className="">
        <p ref={errRef} className={errClass} aria-live="assertive">
          {errMsg}
        </p>

        <form className="form public-form" onSubmit={handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input
            className="form__input text-black"
            type="email"
            id="email"
            ref={emailRef}
            value={email}
            onChange={handleEmailInput}
            autoComplete="off"
            required
          />

          <label htmlFor="password">Password:</label>
          <input
            className="form__input text-black"
            type="password"
            id="password"
            onChange={handlePwdInput}
            value={password}
            required
          />
          <button className="form__submit-button bg-white text-emerald-950 py-6 mt-5 rounded-sm">
            Login
          </button>

          <label htmlFor="persist" className="form__persist">
            <input
              hidden
              type="checkbox"
              className="form__checkbox "
              id="persist"
              onChange={handleToggle}
              checked={true}
            />
          </label>
        </form>
      </main>
      <footer>
        <Link to="/">Back to Home</Link>
      </footer>
    </section>
  );

  return content;
};

export default Login;
