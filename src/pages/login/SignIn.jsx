import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import "react-phone-number-input/style.css";
import { AuthContext } from "../../context/AuthContext";
import TextField from "@mui/material/TextField";

const SignIn = () => {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { signin } = useContext(AuthContext);

  const handleSubmitLogin = async (e) => {
    e.preventDefault();

    try {
      if (email === "" || password === "") {
        setError("Please fill all fields");
      } else {
        setError("");
        await signin(email, password);
        navigate("/");
      }
    } catch (err) {
      setError(err.message);
      console.log(err.message);
    }
  };

  return (
    <div className="form_container">
      <div className="form_box signin">
        <div className="form_title">
          <h3>Log in</h3>
          {error && <p className="err_login">{error}</p>}
        </div>

        <form className="form_login" onSubmit={handleSubmitLogin}>
          <TextField
            id="outlined-number"
            label="Email"
            type="email"
            InputLabelProps={{
              shrink: true,
            }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="verfy_code_input"
          />
          <TextField
            id="outlined-number"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            className="verfy_code_input"
          />
          <div className="btn_box">
            <Button
              type="submit"
              variant="contained"
              size="medium"
              className="login_btn"
            >
              Log in
            </Button>

            <div className="form_bottom">
              <p>Don't have an account?</p>
              <Link to="/sign-up">
                <button>Sign up</button>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
