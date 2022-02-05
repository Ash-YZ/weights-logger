import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { onValue, ref, remove } from "firebase/database";
import { CgRemove } from "react-icons/cg";
import { auth, db } from "../firebase/firebase";
import StandardButton from "../components/Button/StandardButton";

function Dashboard() {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const [plans, setPlans] = useState<any>();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      navigate("/");
    }
  }, [user, loading]);

  useEffect(() => {
    const plansRef = ref(db, `plans/`);
    onValue(plansRef, (snapshot) => {
      const savedPlans = snapshot.val();
      setPlans(savedPlans);
    });
  }, []);

  const deletePlan = (planId) => {
    const planRef = ref(db, `plans/${planId}`);
    remove(planRef);
  };

  const getPlansList = () => {
    const ret = [];
    if (plans) {
      Object.entries(plans).forEach(([key, value]) => {
        ret.push(
          <li key={key} className="flex justify-between w-1/2 items-center">
            <Link
              to="/planner"
              state={{ planId: key }}
              className="text-xl w-[80%]"
            >
              {(value as any)?.name}
            </Link>

            <CgRemove
              className="cursor-pointer text-white min-w-[20px] min-h-[20px]"
              onClick={() => deletePlan(key)}
            />
          </li>
        );
      });
    }

    return ret;
  };

  return (
    <div>
      {error ? (
        <h1 className="mt-[30px] text-center">
          Error. Please try again later.
        </h1>
      ) : (
        <div className="flex flex-col p-[30px]">
          <div className="mb-[30px]">
            <h1 className="text-2xl font-semibold mb-[30px]">Welcome back!</h1>
            {plans && (
              <>
                <h1 className="text-2xl mb-[10px]">Saved plans:</h1>
                <div className="mb-[10px]">
                  <ul>{getPlansList()}</ul>
                </div>
              </>
            )}
          </div>
          <div>
            <Link to="/planner">
              <StandardButton label="Create a new plan" onClick={() => {}} />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
export default Dashboard;