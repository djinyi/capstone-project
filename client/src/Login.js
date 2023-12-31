import React, { useState, useContext } from "react";
import { UserContext } from "./user/UserContext";
import { useNavigate } from "react-router-dom";

function LogIn({ setLoggingIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(UserContext);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          setUser(user)
          navigate("/")
          setLoggingIn(loggingIn => !loggingIn)
        })
      } else {
        r.json().then((err) => {
          setErrors(err.error)
          setPassword("")
        })
    }

    });
  }


  return (
    <div>
      <form className="w-full max-w-sm" onSubmit={handleSubmit}>
        <h3 className="text-3xl text-sky-500 text-center pt-4">Login</h3>
        <p>
          <b className="text-red-500 m-7 pb-4">{errors}</b>
        </p>
        <div className="md:flex md:items-center mb-6 mt-3">
          <div className="md:w-1/3">
        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="username"> Username </label>
        </div>
        <div className="md:w-2/3">
        <input
        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-sky-500"
          type="text"
          id="username"
          autoComplete="off"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="password"> Password </label>
        </div>
        <div className="md:w-2/3">
        <input
        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-sky-500"
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
                  </div>
        </div>
        {/* <div className="md:w-1/3"></div> */}
          <div className="flex items-center justify-center">
        <button className="flex-shrink-0 bg-sky-600 hover:bg-sky-500 border-sky-600 hover:sky-teal-700 text-sm border-4 text-white py-1 px-2 mr-3 my-2 rounded" type="submit">Login</button>
      </div>
      </form>
    </div>
  );
}

export default LogIn;