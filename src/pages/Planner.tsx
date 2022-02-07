import React, { useEffect, useState } from "react";
import { onValue, push, ref, set } from "firebase/database";
import { Link, useLocation, useNavigate } from "react-router-dom";

import Plan from "../components/Plan/Plan";
import PlannedExercise, {
  Exercise,
} from "../components/Exercise/PlannedExercise";
import { db } from "../firebase/firebase";
import StandardButton from "../components/Button/StandardButton";
import Modal from "../components/Modal/Modal";
import StandardInput from "../components/Input/StandardInput";

function Planner() {
  const [planName, setPlanName] = useState<string>();
  const [tempPlanName, setTempPlanName] = useState<string>();
  const [exercises, setExercises] = useState<Array<Exercise>>([]);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [planId, setPlanId] = useState<string>();
  const [isPlanLoading, setIsPlanLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state) {
      setIsPlanLoading(true);
      const savedPlanId = (location.state as any).planId;
      const exercisesRef = ref(db, `plans/${savedPlanId}`);
      onValue(exercisesRef, (snapshot) => {
        const plan = snapshot.val();
        setPlanId(savedPlanId);
        setPlanName(plan.name);
        setExercises(plan.exercises);
        setIsPlanLoading(false);
      });
    }
  }, []);

  const addExercise = (exercise: Exercise) => {
    setExercises([...exercises, exercise]);
    setIsAddModalOpen(false);
  };

  const removeExercise = (indexToRemove: number) =>
    setExercises(
      exercises.filter((exercise, arrayIndex) => arrayIndex !== indexToRemove)
    );

  const savePlan = async () => {
    setIsSaving(true);

    if (!planId) {
      push(ref(db, `plans/`), { name: tempPlanName, exercises }).then(
        (resp) => {
          setIsSaving(false);
          setIsSaveModalOpen(false);
          setPlanId(resp.key);
          setPlanName(tempPlanName);
        }
      );
    } else {
      set(ref(db, `plans/${planId}`), { name: planName, exercises }).then(
        () => {
          setIsSaveModalOpen(false);
          setIsSaving(false);
        }
      );
    }
  };

  return (
    <div className="w-full relative">
      <div className="text-center">
        <h2 className="my-[20px] text-2xl font-semibold">{planName}</h2>
      </div>
      <div className="mt-0">
        <Plan
          exercises={exercises}
          remove={removeExercise}
          isPlanLoading={isPlanLoading}
        />
      </div>
      <div className="mt-10">
        <StandardButton
          label="Add an exercise"
          onClick={() => setIsAddModalOpen(true)}
          className="w-full mb-[10px]"
        />
      </div>

      <StandardButton
        label={`Save ${planId ? "updates to" : ""} plan`}
        onClick={() => {
          if (!planName) setIsSaveModalOpen(true);
          else savePlan();
        }}
        className="w-full mb-[10px]"
        disabled={exercises.length === 0}
      />

      <Link to="/training" state={{ planId }}>
        <StandardButton
          label="Start training!"
          onClick={() => {}}
          className="w-full"
          disabled={!planId}
        />
      </Link>

      <StandardButton
        label="Create a new plan"
        onClick={() => {
          navigate("/planner", { replace: true });
          window.location.reload();
        }}
        className="w-full mt-[20px]"
        type="secondary"
      />

      <Link to="/dashboard">
        <StandardButton
          label="Return to dashboard"
          onClick={() => {}}
          className="w-full mt-[10px]"
          type="secondary"
        />
      </Link>

      {isSaveModalOpen && (
        <Modal
          title="Plan Name"
          description="Give your plan a name"
          closeButtonLabel="Cancel"
          onClose={() => setIsSaveModalOpen(false)}
          saveButtonLabel="Save"
          onSave={() => savePlan()}
          isLoading={isSaving}
        >
          <StandardInput
            value={planName}
            name="plan_name"
            onChange={(e) => setTempPlanName(e.target.value)}
            autoFocus
          />
        </Modal>
      )}

      {isAddModalOpen && (
        <Modal
          title="Add"
          description="Add an exercise"
          closeButtonLabel="Cancel"
          onClose={() => setIsAddModalOpen(false)}
        >
          <PlannedExercise addExercise={addExercise} />
        </Modal>
      )}
    </div>
  );
}

export default Planner;
