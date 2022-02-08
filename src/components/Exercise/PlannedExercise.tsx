import React, { useState } from "react";
import StandardButton from "../Button/StandardButton";
import StandardInput from "../Input/StandardInput";

export interface SetRecord {
  weight: string;
  reps: string;
}
export interface ExerciseRecord {
  date: string;
  setRecord: Array<SetRecord>;
}

export interface Exercise {
  name: string;
  reps: string;
  sets: string;
  records: Array<ExerciseRecord>;
}

interface Props {
  addExercise: (exercise: Exercise) => void;
}

function PlannedExercise({ addExercise }: Props) {
  const initialState: Exercise = {
    name: "",
    reps: "",
    sets: "",
    records: [],
  };
  const [exercise, setExercise] = useState<Exercise>(initialState);

  return (
    <>
      <div className="my-3 flex gap-5 items-center w-full">
        <StandardInput
          placeholder="Exercise"
          value={exercise.name}
          name="exercise_name"
          autoFocus
          onChange={(e) => setExercise({ ...exercise, name: e.target.value })}
          className="w-full"
        />
      </div>
      <div className="my-3 flex gap-5 items-center w-full">
        <StandardInput
          placeholder="Sets"
          value={exercise.sets}
          name="exercise_sets"
          type="number"
          onChange={(e) => setExercise({ ...exercise, sets: e.target.value })}
        />
      </div>
      <div className="my-3 flex gap-5 items-center w-full">
        <StandardInput
          placeholder="Reps"
          value={exercise.reps}
          name="exercise_reps"
          type="number"
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
          disabled={
            !exercise.name.trim().length &&
            !exercise.sets.trim().length &&
            !exercise.reps.trim().length
          }
        />
      </div>
      <div className="w-full border-b-4 border-white my-10" />
    </>
  );
}

export default PlannedExercise;
