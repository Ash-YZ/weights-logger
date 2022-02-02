import React, { useState } from "react";

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
        <h3 className="text-xl min-w-[100px]">Exercise:</h3>
        <input
          value={exercise.name}
          className="border py-2 px-3 w-full text-black"
          type="text"
          name="exercise_name"
          onChange={(e) => setExercise({ ...exercise, name: e.target.value })}
        />
      </div>
      <div className="my-3 flex gap-5 items-center w-full">
        <h3 className="text-xl min-w-[100px]">Sets:</h3>
        <input
          value={exercise.sets}
          className="border py-2 px-3 text-black"
          type="text"
          name="exercise_sets"
          onChange={(e) => setExercise({ ...exercise, sets: e.target.value })}
        />
      </div>
      <div className="my-3 flex gap-5 items-center w-full">
        <h3 className="text-xl min-w-[100px]">Reps:</h3>
        <input
          value={exercise.reps}
          className="border py-2 px-3 text-black"
          type="text"
          name="exercise_reps"
          id="first_name"
          onChange={(e) => setExercise({ ...exercise, reps: e.target.value })}
        />
      </div>
      <div className="my-3 flex mt-5 items-center w-full justify-end">
        <button
          type="button"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded max-w-[100px] self-end"
          onClick={() => {
            addExercise(exercise);
            setExercise(initialState);
          }}
        >
          Add
        </button>
      </div>
    </>
  );
}

export default PlannedExercise;
