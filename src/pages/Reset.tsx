import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, Link } from "react-router-dom";

import { auth, sendPasswordReset } from "../firebase/firebase";
import StandardButton from "../components/Button/StandardButton";

function Reset() {
  const [email, setEmail] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

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
        <div className="flex flex-col text-center bg-gray-500 p-[15px]">
          <h1 className="text-xl font-semibold mb-[30px]">Reset Password</h1>
          <input
            type="text"
            className="p-[10px] mb-[15px]"
            value={email}
            onChange={(e) => setEmail(e.target.value.trim())}
            placeholder="E-mail Address"
          />
          <StandardButton
            label="Send password reset email"
            onClick={() => sendPasswordReset(email)}
            className="mb-[20px]"
            disabled={!email.trim().length}
          />
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
export default Reset;
