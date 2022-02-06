import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { onValue, ref, remove } from "firebase/database";
import { CgRemove } from "react-icons/cg";
import { auth, db } from "../firebase/firebase";
import StandardButton from "../components/Button/StandardButton";
import Modal from "../components/Modal/Modal";

function Dashboard() {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const [plans, setPlans] = useState<any>();
  const [confirmDeleteFor, setConfirmDeleteFor] = useState<string | null>();

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
    setConfirmDeleteFor(null);
    const planRef = ref(db, `plans/${planId}`);
    remove(planRef);
  };

  const getPlansList = () => {
    const ret = [];
    if (plans) {
      Object.entries(plans).forEach(([key, value]) => {
        ret.push(
          <tr key={key}>
            <td className="px-4 w-[90%] text-left">
              <Link
                to="/planner"
                state={{ planId: key }}
                className="text-[15px] w-full inline-block"
              >
                {(value as any)?.name}
              </Link>{" "}
            </td>
            <td className="flex py-[10px] px-4 items-center justify-end">
              <CgRemove
                className="cursor-pointer text-black min-w-[22px] min-h-[22px]"
                onClick={() => setConfirmDeleteFor(key)}
              />
            </td>
          </tr>
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
        <div className="flex flex-col p-[15px]">
          <div className="mb-[30px]">
            <h1 className="text-2xl font-semibold mb-[30px]">Welcome back!</h1>
            {plans && (
              <>
                <h1 className="text-[15px] mb-[10px]">Saved plans:</h1>
                <table className="w-full divide-y divide-gray-200 text-lg text-black">
                  <tbody className="bg-white divide-y divide-gray-200 text-sm">
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
        </div>
      )}

      {confirmDeleteFor && (
        <Modal
          title="Delete plan"
          description="Note: This will delete your training record for this plan too!"
          closeButtonLabel="Cancel"
          onClose={() => setConfirmDeleteFor(null)}
          saveButtonLabel="Confirm"
          onSave={() => deletePlan(confirmDeleteFor)}
        />
      )}
    </div>
  );
}
export default Dashboard;
