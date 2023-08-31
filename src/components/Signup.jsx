import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "../firebase/firebase";

const auth = getAuth(app);

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const createUser = () => {
    createUserWithEmailAndPassword(auth, email, password).then((value) =>
      alert("Success")
    );
    navigate("/");
  };

  return (
    <div className="signuppage">
      <div className="inputForm">
        <label id="signinLabel1">Enter your Email :</label>
        <input
          id="signinInput1"
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="enter your email here"
        />
      </div>
      <div className="inputForm2">
        <label id="signinLabel2">Password :</label>
        <input
          id="signinInput2"
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="enter your password here"
        />
      </div>
      <div className="signinButtons">
        <button onClick={createUser}>Signup</button>
      </div>
    </div>
  );
};

export default Signup;
