import React, { useState } from "react";
import { arrayMoveImmutable } from "array-move";
import Plan from "../components/Plan/Plan";
import PlannedExercise, {
  Exercise,
} from "../components/Exercise/PlannedExercise";

function Planner() {
  const [exercises, setExercises] = useState<Array<Exercise>>([]);

  const addExercise = (exercise: Exercise) =>
    setExercises([...exercises, exercise]);

  const removeExercise = (indexToRemove: number) =>
    setExercises(
      exercises.filter((exercise, arrayIndex) => arrayIndex !== indexToRemove)
    );

  const reorder = (direction: "UP" | "DOWN", index: number) => {
    const moveTo = direction === "UP" ? index - 1 : index + 1;
    if (moveTo > -1 && moveTo < exercises.length)
      setExercises(arrayMoveImmutable(exercises, index, moveTo));
  };

  return (
    <>
      <div className="mt-10">
        <Plan exercises={exercises} remove={removeExercise} reorder={reorder} />
      </div>

      <div className="mt-10">
        <PlannedExercise addExercise={addExercise} />
      </div>
    </>
  );
}

export default Planner;
