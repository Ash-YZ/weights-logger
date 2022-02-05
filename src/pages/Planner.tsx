import React, { useEffect, useState } from "react";
import { arrayMoveImmutable } from "array-move";
import { onValue, push, ref, set } from "firebase/database";
import { useLocation, useNavigate } from "react-router-dom";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const addExercise = (exercise: Exercise) =>
    setExercises([...exercises, exercise]);

  const removeExercise = (indexToRemove: number) =>
    setExercises(
      exercises.filter((exercise, arrayIndex) => arrayIndex !== indexToRemove)
    );

  const reorder = (from: number, to: number) => {
    setExercises(arrayMoveImmutable(exercises, from - 1, to - 1));
  };

  const savePlan = async () => {
    setIsSaving(true);

    if (!planId) {
      push(ref(db, `plans/`), { name: tempPlanName, exercises }).then(
        (resp) => {
          setIsSaving(false);
          setIsModalOpen(false);
          setPlanId(resp.key);
          setPlanName(tempPlanName);
        }
      );
    } else {
      set(ref(db, `plans/${planId}`), { name: planName, exercises }).then(
        () => {
          setIsModalOpen(false);
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
          reorder={reorder}
          isPlanLoading={isPlanLoading}
        />
      </div>
      <div className="mt-10">
        <PlannedExercise addExercise={addExercise} />
      </div>
      <StandardButton
        label={`Save ${planId ? "updates to" : ""} plan`}
        onClick={() => {
          if (!planName) setIsModalOpen(true);
          else savePlan();
        }}
        className="w-full"
        disabled={exercises.length === 0}
      />
      <StandardButton
        label="Create a new plan"
        onClick={() => {
          navigate("/planner", { replace: true });
          window.location.reload();
        }}
        className="w-full mt-[20px]"
        type="secondary"
      />

      {isModalOpen && (
        <Modal
          title="Plan Name"
          description="Give your plan a name"
          closeButtonLabel="Cancel"
          onClose={() => setIsModalOpen(false)}
          saveButtonLabel="Save"
          onSave={() => savePlan()}
          isLoading={isSaving}
        >
          <StandardInput
            value={planName}
            name="plan_name"
            onChange={(e) => setTempPlanName(e.target.value)}
          />
        </Modal>
      )}
    </div>
  );
}

export default Planner;
