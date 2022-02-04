import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { useAuthState } from "react-firebase-hooks/auth";
import Dumbbell from "../../icons/dumbbell.svg";
import { auth, logout } from "../../firebase/firebase";

function Navigation() {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [user] = useAuthState(auth);

  return (
    <nav className=" relative flex items-center justify-between flex-wrap bg-gray-500 p-6 items-center align-middle">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <img src={Dumbbell} alt="Dumbbell Logo" className="h-[40px] mr-5" />
        <span className="font-semibold text-xl tracking-tight">
          Weights Logger
        </span>
      </div>
      {user && (
        <div className="block">
          <GiHamburgerMenu
            className="cursor-pointer"
            onClick={() => setIsMenuVisible(!isMenuVisible)}
          />
        </div>
      )}
      {isMenuVisible && (
        <div className="absolute left-0 h-[90vh] w-full bg-gray-500 top-[85px] z-10">
          <div className="flex items-center justify-between flex-wrap bg-gray-500 px-5 items-center align-middle">
            <Link
              to="/dashboard"
              className="w-full border-b-2 border-t-2 text-center py-5"
              onClick={() => setIsMenuVisible(!isMenuVisible)}
            >
              Dashboard
            </Link>
            <Link
              to="/planner"
              className="w-full border-b-2 text-center py-5"
              onClick={() => setIsMenuVisible(!isMenuVisible)}
            >
              Planner
            </Link>
            <Link
              to="/"
              className="w-full border-b-2 text-center py-5"
              onClick={() => {
                setIsMenuVisible(!isMenuVisible);
                logout();
              }}
            >
              Logout
            </Link>
            <div className="w-full text-center py-20 text-xs">
              Logged in as {user?.email}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navigation;
