import React, { useState, useContext } from "react";
import { UserContext } from "./user/UserContext";
import { useNavigate } from "react-router-dom";

function SignUp({ setLoggingIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [name, setName] = useState("");
  const [phone_number, setPhone_number] = useState(0);
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [dob, setDob] = useState("");
  const [errors, setErrors] = useState([]);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  
  function handleSubmit(e) {
    e.preventDefault();
    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        password_confirmation: passwordConfirmation,
        name,
        phone_number,
        dob,
        email,
        address
      }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          navigate("/")
          setUser(user)
          return setLoggingIn(loggingIn => !loggingIn)
        });
      } else {
        r.json().then((err) => setErrors(err.errors));
    }
    });

    setUsername("");
    setPassword("");
    setPasswordConfirmation("");

  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h3>Sign Up</h3>
        <p>
                  {errors}
        </p>
        <label htmlFor="username"> Username </label>
        <input
          type="text"
          id="username"
          autoComplete="off"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password"> Password </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />
        <label htmlFor="password"> Password Confirmation </label>
        <input
          type="password"
          id="password_confirmation"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          autoComplete="current-password"
        />
        <p>More about yourself...</p>
        <label htmlFor="password"> Name </label>
        <input
          type="name"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="name"
        />
        <label htmlFor="phone_number"> Phone Number </label>
        <input
          type="phone_number"
          id="phone_number"
          value={phone_number}
          onChange={(e) => setPhone_number(e.target.value)}
          autoComplete="phone_number"
        />
        <label htmlFor="email"> Email </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />
        <label htmlFor="address"> Address </label>
        <input
          type="address"
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          autoComplete="address"
        />
        <label htmlFor="dob"> DOB </label>
        <input
          type="dob"
          id="dob"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          autoComplete="dob"
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;