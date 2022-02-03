import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { query, collection, getDocs, where } from "firebase/firestore";
import { auth, db, logout } from "../firebase/firebase";
import StandardButton from "../components/Button/StandardButton";

function Dashboard() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      console.log("data", data);
      setName(data.name);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    if (loading) return;
    if (!user) {
      navigate("/");
      return;
    }
    fetchUserName();
  }, [user, loading]);
  return (
    <div>
      {error ? (
        <h1 className="mt-[30px] text-center">
          Error. Please try again later.
        </h1>
      ) : (
        <div className="flex flex-col text-center bg-gray-500 p-[30px]">
          <h1 className="text-xl font-semibold mb-[30px]">Welcome {name}</h1>
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
