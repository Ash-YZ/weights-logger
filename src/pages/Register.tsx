import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "../firebase/firebase";
import StandardButton from "../components/Button/StandardButton";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const register = () => {
    if (!name) alert("Please enter name");
    registerWithEmailAndPassword(name, email, password);
  };

  useEffect(() => {
    if (loading) return;
    if (user) navigate("/dashboard");
  }, [user, loading]);

  return (
    <div>
      {error ? (
        <h1 className="mt-[30px] text-center">
          Error. Please try again later.
        </h1>
      ) : (
        <div className="flex flex-col text-center bg-gray-500 p-[30px]">
          <h1 className="text-xl font-semibold mb-[30px]">Register</h1>
          <input
            type="text"
            className="p-[10px] mb-[15px]"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full name"
          />
          <input
            type="text"
            className="p-[10px] mb-[15px]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail address"
            autoComplete="off"
          />
          <input
            type="password"
            className="p-[10px] mb-[15px]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            autoComplete="new-password"
          />
          <StandardButton
            label="Register"
            onClick={register}
            className="mb-[10px]"
            disabled={
              !name.trim().length &&
              !email.trim().length &&
              !password.trim().length
            }
          />
          <p className="text-center mb-[10px]">OR</p>
          <StandardButton
            label="Register with Google"
            onClick={signInWithGoogle}
            className="mb-[20px]"
          />
          <div>
            <Link to="/">Already have an account? Login now.</Link>
          </div>
        </div>
      )}
    </div>
  );
}
export default Register;
