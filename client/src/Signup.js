import React, { useState, useContext } from "react";
import { UserContext } from "./user/UserContext";
import { useNavigate } from "react-router-dom";

function SignUp({ setLoggingIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [name, setName] = useState("");
  const [phone_number, setPhone_number] = useState([]);
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [dob, setDob] = useState([]);
  const [errors, setErrors] = useState([]);
  const [error, setError] = useState([]);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  
  function handleSubmit(e) {
    e.preventDefault();

    if(!Number.isInteger(parseInt(dob))){
      setErrors(["Must have unique username", "Must have password and matching password confirmation", "Phone number must be 10 numbers", "DOB must be must be 6 numbers, eg. 010100 for January 1st 2000"])
  } else {
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
        r.json().then((error) => setErrors(error.errors));
    }
    });

    setPassword("");
    setPasswordConfirmation("");
    setError("")
  }
  }

  return (
    <div>
      <form class="w-full max-w-sm" onSubmit={handleSubmit}>
        <h3 class="text-3xl text-sky-500 text-center p-4">Sign Up</h3>
        <b class="text-red-500 m-7 pb-5">{errors?.map((err) => (
            <ul key={err}>{err}</ul>
          ))}</b>
        <b class="text-red-500">{error}</b>
        <div class="md:flex md:items-center mb-6 pt-5">
          <div class="md:w-1/3">
            <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="username"> Username </label>
          </div>
          <div class="md:w-2/3">
            <input
              class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              type="text"
              id="username"
              autoComplete="off"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        </div>
        <div class="md:flex md:items-center mb-6">
          <div class="md:w-1/3">
            <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="password"> Password </label>
          </div>
          <div class="md:w-2/3">
            <input
              class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>
        </div>
        <div class="md:flex md:items-center mb-6">
          <div class="md:w-1/3">
            <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="password"> Password Confirmation </label>
          </div>
          <div class="md:w-2/3">
            <input
              class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              type="password"
              id="password_confirmation"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              autoComplete="current-password"
            />
          </div>
        </div>
        <p>More about yourself...</p>
        <div class="md:flex md:items-center mb-6">
          <div class="md:w-1/3">
            <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="password"> Name </label>
          </div>
          <div class="md:w-2/3">
            <input
              class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              type="name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
            />
          </div>
        </div>
        <div class="md:flex md:items-center mb-6">
          <div class="md:w-1/3">
            <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="phone_number"> Phone Number </label>
          </div>
          <div class="md:w-2/3">
            <input
              class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              type="phone_number"
              id="phone_number"
              value={phone_number}
              placeholder="1234567890"
              onChange={(e) => setPhone_number(e.target.value)}
              autoComplete="phone_number"
            />
          </div>
        </div>
        <div class="md:flex md:items-center mb-6">
          <div class="md:w-1/3">

          <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="email"> Email </label>
          </div>
          <div class="md:w-2/3">
            <input
              class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>
        </div>
        <div class="md:flex md:items-center mb-6">
          <div class="md:w-1/3">
            <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="address"> Address </label>
          </div>
          <div class="md:w-2/3">
            <input
              class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              type="address"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              autoComplete="address"
            />
          </div>
        </div>
        <div class="md:flex md:items-center mb-6">
          <div class="md:w-1/3">
            <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="dob"> DOB </label>
          </div>
          <div class="md:w-2/3">
            <input
              class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              type="dob"
              id="dob"
              value={dob}
              placeholder="MMDDYY"
              onChange={(e) => setDob(e.target.value)}
              autoComplete="dob"
            />
          </div>
        </div>
        <div class="md:w-1/3"></div>
          <div class="md:w-2/3">
            <button class="flex-shrink-0 bg-sky-600 hover:bg-sky-500 border-sky-600 hover:sky-teal-700 text-sm border-4 text-white py-1 px-2 mr-3 my-2 rounded" type="submit">Sign Up</button>
          </div>

      </form>
    </div>
  );
}

export default SignUp;