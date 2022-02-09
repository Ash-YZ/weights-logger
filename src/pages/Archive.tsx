import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { onValue, ref, remove, update } from "firebase/database";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BiArchiveOut } from "react-icons/bi";

import { auth, db } from "../firebase/firebase";
import StandardButton from "../components/Button/StandardButton";
import Modal from "../components/Modal/Modal";
import { objectFilter } from "../utils/DataUtils";

function Dashboard() {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const [plans, setPlans] = useState<any>();
  const [planToDelete, setPlanToDelete] = useState<string | null>();

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
        const notArchived = objectFilter(savedPlans, (plan) => plan.archived);
        setPlans(notArchived);
      });
    }
  }, [loading]);

  const unArchivePlan = (planId) => {
    const planRef = ref(db, `${user.uid}/plans/${planId}`);
    update(planRef, { archived: false });
  };

  const deletePlan = (planId) => {
    setPlanToDelete(null);
    const planRef = ref(db, `${user.uid}/plans/${planId}`);
    remove(planRef);
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
              <BiArchiveOut
                className="cursor-pointer min-w-[22px] min-h-[22px]"
                onClick={() => unArchivePlan(key)}
              />
            </td>
            <td className="flex py-[10px] px-3 items-center justify-end text-gray-700">
              <AiOutlineCloseCircle
                className="cursor-pointer min-w-[22px] min-h-[22px]"
                onClick={() => setPlanToDelete(key)}
              />
            </td>
          </tr>
        );
      });
    } else {
      ret.push(
        <tr key="no_archived_plans">
          <td className="p-[10px]">No archived plans</td>
        </tr>
      );
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
        <div className="flex flex-col p-[15px]">
          <div className="mb-[30px]">
            <h1 className="text-2xl font-semibold mb-[30px]">Archive</h1>
            {plans && (
              <>
                <h1 className="text-[15px] mb-[10px] text-[16px]">
                  Archived plans:
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
            <Link to="/dashboard">
              <StandardButton label="Back to dashboard" onClick={() => {}} />
            </Link>
          </div>
        </div>
      )}

      {planToDelete && (
        <Modal
          title="Delete plan"
          description="Are you sure you want to delete this plan?<br/>Associated exercise data will also be deleted."
          closeButtonLabel="Cancel"
          onClose={() => setPlanToDelete(null)}
          saveButtonLabel="Confirm"
          onSave={() => deletePlan(planToDelete)}
        />
      )}
    </div>
  );
}
export default Dashboard;
