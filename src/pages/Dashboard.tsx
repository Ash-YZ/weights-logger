import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { auth, logout } from "../firebase/firebase";
import StandardButton from "../components/Button/StandardButton";

function Dashboard() {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      navigate("/");
    }
  }, [user, loading]);
  return (
    <div>
      {error ? (
        <h1 className="mt-[30px] text-center">
          Error. Please try again later.
        </h1>
      ) : (
        <div className="flex flex-col text-center bg-gray-500 p-[30px]">
          <h1 className="text-xl font-semibold mb-[30px]">Welcome back!</h1>
          Logged in as
          <div className="mb-[20px]">{user?.email}</div>
          <StandardButton
            label="Logout"
            onClick={logout}
            className="mb-[20px]"
          />
        </div>
      )}
    </div>
  );
}
export default Dashboard;
