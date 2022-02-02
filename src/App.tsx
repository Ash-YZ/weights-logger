import React, { useState } from "react";
import { arrayMoveImmutable } from "array-move";
import PlannedExercise, {
  Exercise,
} from "./components/Exercise/PlannedExercise";
import Plan from "./components/Plan/Plan";

function App() {
  const [exercises, setExercises] = useState<Array<Exercise>>([]);

  const addExercise = (exercise: Exercise) =>
    setExercises([...exercises, exercise]);

  const removeExercise = (indexToRemove: number) =>
    setExercises(
      exercises.filter((exercise, arrayIndex) => arrayIndex !== indexToRemove)
    );

  const reorder = (direction: "UP" | "DOWN", index: number) => {
    console.log("MOVE", direction);
    console.log("index", index);
    const moveTo = direction === "UP" ? index - 1 : index + 1;
    console.log("moveTo", moveTo);
    if (moveTo > -1 && moveTo < exercises.length)
      setExercises(arrayMoveImmutable(exercises, index, moveTo));
  };

  return (
    <div className="bg-gray-700 text-white h-[100vh] w-full p-5">
      <header>
        <h1 className="text-3xl font-bold">Planner</h1>
      </header>

      <div className="mt-10">
        <Plan exercises={exercises} remove={removeExercise} reorder={reorder} />
      </div>

      <div className="mt-10">
        <PlannedExercise addExercise={addExercise} />
      </div>
    </div>
  );
}

export default App;
