import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { InitialStateContext } from "../../reducers/questionReducer";
const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginMessage, setLoginMessage] = useState(false);
  const { dispatch } = useContext(InitialStateContext);

  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Logging in with:", { email, password });
    if (email === "amaresha1a2b@gmail.com" && password === "123") {
      dispatch({
        type: "studentLogin",
      });
      navigate("/studentdashboard");
    } else {
      setLoginMessage(true);
      setTimeout(() => {
        setLoginMessage(false);
      }, 3000);
    }
  };

  return (
    <div className="d-flex row justify-content-center m-0">
      <div className="contact mt-5 mx-5 bg-success-subtle py-2 px-5 col-4 rounded-2 pb-3">
        <h2 className="mt-5 pb-2">Student Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email:</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password:</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
          {loginMessage && (
            <div className="mb-3 pt-2 text-danger">
              <p>Invalid email or password</p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
