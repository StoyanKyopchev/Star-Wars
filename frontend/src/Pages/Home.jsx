import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import backgroundImg from "../Assets/Images/Star_Wars_Logo.png";

const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

function Home() {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setSuccessMessage("");

      const response = await fetch(`${SERVER_BASE_URL}/sign-in`, {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: usernameRef.current.value,
          password: passwordRef.current.value,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(`${data.message}`);
      }
      setSuccessMessage(data.message);

      setTimeout(() => {
        navigate("/table");
      }, 2500);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  }

  return (
    <div className="bg-black min-h-screen flex flex-col md:gap-10">
      <div className="flex justify-center md:h-80">
        <img
          src={backgroundImg}
          alt="Background image of the star wars logo"
          className="2xl:w-2/5 lg:w-1/2 md:w-3/4 w-full"
        />
      </div>
      <div className="flex justify-center">
        <form
          className="flex flex-col items-center max-sm:px-4 w-full md:w-1/2 lg:w-2/5 xl:w-1/3 2xl:w-1/5 group"
          onSubmit={handleSubmit}
          noValidate
        >
          {error && (
            <div className="rounded p-2 mb-2 text-white font-bold bg-red-500 text-center">
              {error}
            </div>
          )}

          {successMessage && (
            <div className="rounded p-2 mb-2 text-white font-bold bg-green-500 text-center">
              {successMessage}
            </div>
          )}

          <h2 className="text-3xl font-bold text-yellow-300">Sign In</h2>
          <label
            className="text-yellow-300 font-bold w-full"
            htmlFor="username"
          >
            Username
            <input
              className="border w-full rounded mt-1 py-1 px-2 text-black font-normal text-base focus:outline-none focus:ring focus:ring-yellow-400 peer invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500"
              type="text"
              name="username"
              ref={usernameRef}
              placeholder=" "
              required
              pattern="[a-zA-Z0-9._%+\-]{3,15}"
            />
            <span className="mt-1 invisible text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:visible">
              Username must be between 3 and 15 characters
            </span>
          </label>
          <label
            className="text-yellow-300 font-bold w-full"
            htmlFor="password"
          >
            Password
            <input
              className="border w-full rounded mt-1 py-1 px-2 text-black font-normal text-base focus:outline-none focus:ring focus:ring-yellow-400 peer invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500"
              type="password"
              name="password"
              placeholder=" "
              required
              pattern=".{7,}"
              ref={passwordRef}
            />
            <span className="mt-1 invisible text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:visible">
              Password must be at least 7 characters
            </span>
          </label>
          <div className="mt-2 flex flex-col md:flex-row gap-3 md:gap-0 justify-between items-center w-full">
            <span className="text-white">
              Don't have an account?{" "}
              <Link
                to="/sign-up"
                className="text-yellow-300 font-bold underline focus:outline-none focus:ring focus:ring-yellow-400"
              >
                Sign Up
              </Link>
            </span>
            <span className="w-3/4 md:w-1/3">
              <button
                className="bg-yellow-300 w-full text-black text-lg font-bold p-2 rounded hover:bg-yellow-400 focus:outline-none focus:ring focus:ring-yellow-500 group-invalid:pointer-events-none group-invalid:opacity-30"
                type="submit"
              >
                Sign In
              </button>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Home;
