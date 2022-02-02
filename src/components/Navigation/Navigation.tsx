import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { CgCloseR } from "react-icons/cg";
import Dumbbell from "../../icons/dumbbell.svg";
import Planner from "../../pages/Planner";

function Navigation() {
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  return (
    <Router>
      <nav className=" relative flex items-center justify-between flex-wrap bg-gray-500 p-6 items-center align-middle">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <img src={Dumbbell} alt="Dumbbell Logo" className="h-[40px] mr-5" />
          <span className="font-semibold text-xl tracking-tight">
            Weights Logger
          </span>
        </div>
        <div className="block">
          <GiHamburgerMenu
            className="cursor-pointer"
            onClick={() => setIsMenuVisible(!isMenuVisible)}
          />
        </div>
        {isMenuVisible && (
          <div className="absolute left-0 h-[90vh] w-full bg-gray-500 top-[85px]">
            <div className="flex items-center justify-between flex-wrap bg-gray-500 px-5 items-center align-middle">
              <Link
                to="/planner"
                className="w-full border-b-2 border-t-2 text-center py-5"
                onClick={() => setIsMenuVisible(!isMenuVisible)}
              >
                Planner
              </Link>
            </div>
          </div>
        )}
      </nav>

      <Routes>
        <Route path="/planner" element={<Planner />} />
      </Routes>
    </Router>
  );
}

export default Navigation;
