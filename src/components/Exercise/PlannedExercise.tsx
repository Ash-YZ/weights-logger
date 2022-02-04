import React, { useState } from "react";
import StandardButton from "../Button/StandardButton";
import StandardInput from "../Input/StandardInput";

export interface Exercise {
  name: string;
  reps: string;
  sets: string;
}
interface Props {
  addExercise: (exercise: Exercise) => void;
}

function PlannedExercise({ addExercise }: Props) {
  const initialState: Exercise = {
    name: "",
    reps: "",
    sets: "",
  };
  const [exercise, setExercise] = useState<Exercise>(initialState);

  return (
    <>
      <div className="my-3 flex gap-5 items-center w-full">
        <StandardInput
          label="Exercise:"
          value={exercise.name}
          name="exercise_name"
          onChange={(e) => setExercise({ ...exercise, name: e.target.value })}
        />
      </div>
      <div className="my-3 flex gap-5 items-center w-full">
        <StandardInput
          label="Sets:"
          value={exercise.sets}
          name="exercise_sets"
          onChange={(e) => setExercise({ ...exercise, sets: e.target.value })}
        />
      </div>
      <div className="my-3 flex gap-5 items-center w-full">
        <StandardInput
          label="Reps"
          value={exercise.reps}
          name="exercise_reps"
          onChange={(e) => setExercise({ ...exercise, reps: e.target.value })}
        />
      </div>
      <div className="my-3 flex mt-5 items-center w-full justify-end">
        <StandardButton
          label="Add to plan"
          onClick={() => {
            addExercise(exercise);
            setExercise(initialState);
          }}
          className="w-full"
        />
      </div>
      <div className="w-full border-b-4 border-white my-10" />
    </>
  );
}

export default PlannedExercise;
