import React, { useEffect, useState } from "react";
import { arrayMoveImmutable } from "array-move";
import { ref, push, set, onValue } from "firebase/database";
import Plan from "../components/Plan/Plan";
import PlannedExercise, {
  Exercise,
} from "../components/Exercise/PlannedExercise";
import { db } from "../firebase/firebase";
import StandardButton from "../components/Button/StandardButton";
import Modal from "../components/Modal/Modal";
import StandardInput from "../components/Input/StandardInput";

interface Props {
  savedPlanId?: string;
}

function Planner({ savedPlanId = "-Mv3_sEpgcCaAHHC9ADb" }: Props) {
  const [planName, setPlanName] = useState<string>();
  const [exercises, setExercises] = useState<Array<Exercise>>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [planId, setPlanId] = useState<string>();
  const [isPlanLoading, setIsPlanLoading] = useState(false);

  useEffect(() => {
    if (savedPlanId) {
      setIsPlanLoading(true);
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
      push(ref(db, `plans/`), { name: planName, exercises }).then((resp) => {
        setPlanId(resp.key);
        setIsSaving(false);
        setIsModalOpen(false);
      });
    } else {
      set(ref(db, `plans/${planId}`), { name: planName, exercises }).then(
        () => {
          setIsSaving(false);
          setIsModalOpen(false);
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
        onClick={() => setIsModalOpen(true)}
        className="w-full"
        disabled={exercises.length === 0}
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
            onChange={(e) => setPlanName(e.target.value)}
          />
        </Modal>
      )}
    </div>
  );
}

export default Planner;
