import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { onValue, ref, update } from "firebase/database";
import { MdOutlineNotStarted } from "react-icons/md";
import { BiArchiveIn } from "react-icons/bi";
import { BsGraphUp } from "react-icons/bs";

import { auth, db } from "../firebase/firebase";
import StandardButton from "../components/Button/StandardButton";
import Modal from "../components/Modal/Modal";
import { objectFilter } from "../utils/DataUtils";
import Loader from "../components/Loader/Loader";

function Dashboard() {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const [plans, setPlans] = useState<any>();
  const [planToArchive, setPlanToArchive] = useState<string | null>();
  const [plansLoading, setPlansLoading] = useState(true);

  useEffect(() => {
    if (loading) return;
    if (!user) {
      navigate("/");
    }
  }, [user, loading]);

  useEffect(() => {
    if (user) {
      const plansRef = ref(db, `${user.uid}/plans/`);
      onValue(plansRef, (snapshot) => {
        const savedPlans = snapshot.val();
        const notArchived = objectFilter(savedPlans, (plan) => !plan.archived);
        setPlans(notArchived);
        setPlansLoading(false);
      });
    }
  }, [loading]);

  const archivePlan = (planId) => {
    setPlanToArchive(null);
    const planRef = ref(db, `${user.uid}/plans/${planId}`);
    update(planRef, { archived: true });
  };

  const getPlansList = () => {
    const ret = [];
    if (Object.keys(plans).length > 0) {
      Object.entries(plans).forEach(([key, value]) => {
        ret.push(
          <tr key={key} className="flex items-center">
            <td className="px-4 w-[80%] text-left">
              <Link
                to="/planner"
                state={{ planId: key }}
                className="text-[15px] w-full inline-block"
              >
                {(value as any)?.name}
              </Link>
            </td>
            <td className="flex py-[10px] px-3 items-center justify-end text-gray-700">
              <Link to="/history" state={{ planId: key }}>
                <div className="scale-[125%]">
                  <BsGraphUp />
                </div>
              </Link>
            </td>
            <td className="flex py-[10px] px-3 items-center justify-end text-gray-700">
              <Link to="/training" state={{ planId: key }}>
                <div className="scale-[165%]">
                  <MdOutlineNotStarted />
                </div>
              </Link>
            </td>
            <td className="flex py-[10px] px-3 items-center justify-end text-gray-700">
              <BiArchiveIn
                className="cursor-pointer min-w-[22px] min-h-[22px]"
                onClick={() => setPlanToArchive(key)}
              />
            </td>
          </tr>
        );
      });
    } else {
      ret.push(
        <tr key="no_saved_plans">
          <td className="p-[10px]">No saved plans</td>
        </tr>
      );
    }

    return ret;
  };

  return (
    <div>
      {plansLoading ? (
        <div className="mt-[80px]">
          <Loader />
        </div>
      ) : error ? (
        <h1 className="mt-[30px] text-center">
          Error. Please try again later.
        </h1>
      ) : (
        <div className="flex flex-col p-[15px]">
          <div className="mb-[30px]">
            <h1 className="text-2xl font-semibold mb-[30px]">Welcome back!</h1>
            {plans && (
              <>
                <h1 className="text-[15px] mb-[10px] text-[18px]">
                  Saved plans:
                </h1>
                <table className="w-full divide-y divide-gray-200 text-lg text-gray-700">
                  <tbody className="bg-gray-200 divide-y divide-gray-300 text-sm tracking-wider">
                    {getPlansList()}
                  </tbody>
                </table>
              </>
            )}
          </div>
          <div>
            <Link to="/planner">
              <StandardButton label="Create a new plan" onClick={() => {}} />
            </Link>
          </div>
          <div className="text-sm mt-[25px] underline cursor-pointer text-blue-200">
            <Link to="/archive">View Archived plans</Link>
          </div>
        </div>
      )}

      {planToArchive && (
        <Modal
          title="Archive plan"
          description="Do you want to archive this plan?<br/>Plans can be restored from the Archive."
          closeButtonLabel="Cancel"
          onClose={() => setPlanToArchive(null)}
          saveButtonLabel="Confirm"
          onSave={() => archivePlan(planToArchive)}
        />
      )}
    </div>
  );
}
export default Dashboard;
