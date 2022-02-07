import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  auth,
  logInWithEmailAndPassword,
  signInWithGoogle,
} from "../firebase/firebase";
import StandardButton from "../components/Button/StandardButton";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate("/dashboard");
  }, [user, loading]);

  return (
    <div>
      {error ? (
        <h1 className="mt-[30px] text-center">
          Error. Please try again later.
        </h1>
      ) : (
        <div className="flex flex-col text-center bg-gray-500 p-[15px]">
          <h1 className="text-xl font-semibold mb-[30px]">Login</h1>
          <input
            type="text"
            className="p-[10px] mb-[15px]"
            value={email}
            onChange={(e) => setEmail(e.target.value.trim())}
            placeholder="E-mail Address"
          />
          <input
            type="password"
            className="p-[10px] mb-[15px]"
            value={password}
            onChange={(e) => setPassword(e.target.value.trim())}
            placeholder="Password"
          />
          <StandardButton
            label="Login"
            onClick={() => logInWithEmailAndPassword(email, password)}
            className="mb-[10px] w-full"
            disabled={!email.trim().length && !password.trim().length}
          />
          <p className="text-center mb-[10px]">OR</p>
          <StandardButton
            label="Login with Google"
            onClick={signInWithGoogle}
            className="mb-[20px]"
          />

          <div className="mb-[20px]">
            <Link to="/reset">Forgot Password</Link>
          </div>
          <div>
            <Link to="/register">
              Don&apos;t have an account? Register now.
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
export default Login;
