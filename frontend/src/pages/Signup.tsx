import { useState } from "react";
import { Link } from "react-router-dom";
import { IoEye, IoEyeOff } from "react-icons/io5";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  return (
    <div className="w-screen h-screen bg-color-4 text-color-1 flex items-center justify-center">
      <form className="bg-color-3 p-4 rounded-lg flex flex-col w-80">
        <h1 className="text-3xl mb-4 text-center font-bold">Sign Up</h1>
        <label htmlFor="username" className="mb-1 text-xl">
          Username
        </label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mb-2 p-2 rounded-lg bg-color-2"
          placeholder="Enter your username"
          required
        />
        <label htmlFor="password" className="mb-1 text-xl">
          Password
        </label>
        <div className="flex flex-row w-full mb-2">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 rounded-lg bg-color-2 w-full"
            placeholder="Enter your password"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="bg-color-2 p-2 rounded flex items-center justify-center ml-2 hover:scale-105 transition-transform"
          >
            {showPassword ? <IoEyeOff /> : <IoEye />}
          </button>
        </div>
        <label htmlFor="confirmPassword" className="mb-1 text-xl">
          Confirm Password
        </label>
        <div className="flex flex-row w-full mb-2">
          <input
            type={showConfirmPassword ? "text" : "password"}
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="p-2 rounded-lg bg-color-2 w-full"
            placeholder="Confirm your password"
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="bg-color-2 p-2 rounded flex items-center justify-center ml-2 hover:scale-105 transition-transform"
          >
            {showConfirmPassword ? <IoEyeOff /> : <IoEye />}
          </button>
        </div>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <button
          type="submit"
          className="bg-color-2 p-2 rounded-lg w-full hover:scale-105 transition-transform font-bold"
        >
          Sign Up
        </button>
        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="hover:underline">
            Log In
          </Link>
        </p>
      </form>
    </div>
  );
}
