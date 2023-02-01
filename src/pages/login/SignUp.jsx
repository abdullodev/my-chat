import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import "react-phone-number-input/style.css";
import { AuthContext } from "../../context/AuthContext";
import TextField from "@mui/material/TextField";
import { updateProfile } from "firebase/auth";
import { auth, db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { signup } = useContext(AuthContext);

  const handleSubmitSignUp = async (e) => {
    setIsLoading(true);
    e.preventDefault();

    const date = new Date();
    const nowDate = date.getHours() + ":" + date.getMinutes();

    setError("");
    try {
      if (email === "" || password === "" || username === "") {
        setError("Please fill all fields");
      } else {
        setError("");
        const res = await signup(email, password);

        await setDoc(doc(db, "contacts", res.user.uid), {
          uid: res.user.uid,
          username,
          date: nowDate,
        });

        await setDoc(doc(db, "userChats", res.user.uid), {
          allTexts: [],
        });

        await updateProfile(auth.currentUser, {
          displayName: username,
        });
        navigate("/");
      }
    } catch (err) {
      setIsLoading(false);
      setError(err.message);
    }
  };

  return (
    <div className="form_container">
      <div className="form_box signin">
        <div className="form_title">
          <h3>Sign Up</h3>
          {error && <p className="err_login">{error}</p>}
        </div>

        <form className="form_login" onSubmit={handleSubmitSignUp}>
          <TextField
            id="outlined-number"
            label="User name"
            type="text"
            InputLabelProps={{
              shrink: true,
            }}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="verfy_code_input"
          />
          <TextField
            id="outlined-number"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
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
          <div id="recaptcha-container" className="recaptcha" />
          <div className="btn_box">
            <Button
              type="submit"
              variant="contained"
              size="medium"
              className="login_btn"
            >
              {isLoading ? "Loading..." : "Sign up"}
            </Button>
            <div className="form_bottom">
              <p>Already have an account?</p>
              <Link to="/sign-in">
                <button>Sign in</button>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
