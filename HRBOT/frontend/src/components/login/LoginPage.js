import { useContext, useState } from "react";
import "./Login.css";
import "react-chatbot-kit/build/main.css";
import "../../App.css";
import { useNavigate } from "react-router-dom";
import { Context } from "../../store/Context";

function LoginPage() {
  const { setIsHRCheckin } = useContext(Context);
  const userName = "kubra";
  const password = "kubra";
  const [loginForm, setLoginForm] = useState({
    userName: "",
    password: "",
    checkbox: false,
  });
  const [error, setError] = useState(false);

  const navigation = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setLoginForm((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
    setError(false);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginForm.userName === userName && loginForm.password === password) {
      setError(false);
      setIsHRCheckin(loginForm.checkbox);
      navigation("/dashboard/bot");
    } else {
      setError(true);
    }
  };
  return (
    <>
      <div
        className="main-container"
        style={{
          height: "100vh",
        }}
      >
        <form className="form-container" onSubmit={handleLogin}>
          <div className="input-container">
            <label>Username: </label>
            <input
              type="text"
              name="userName"
              required
              value={loginForm.userName}
              onChange={handleChange}
              placeholder="Enter your password"
              autoComplete="username"
              className={`input-box ${error && "error-container"}`}
            />
          </div>
          <div className="input-container">
            <label>Password: </label>
            <input
              placeholder="Enter your password"
              type="password"
              name="password"
              required
              value={loginForm.password}
              onChange={handleChange}
              autoComplete="current-password"
              className={`input-box ${error && "error-container"}`}
            />
          </div>
          <div className="checkbox-container">
            <label>Login as HR? </label>
            <input
              type="checkbox"
              name="checkbox"
              value={loginForm.checkbox}
              onChange={handleChange}
              autoComplete="new-password"
              defaultChecked={loginForm.checkbox}
            />
          </div>
          <div className="button-container">
            <input className="button" type="submit" />
          </div>
        </form>

        {error && (
          <p style={{ color: "red", marginTop: "10px" }}>Invalid credentials</p>
        )}
      </div>
    </>
  );
}

export default LoginPage;
