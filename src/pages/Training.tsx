import React, { useEffect, useState } from "react";
import { onValue, ref, set } from "firebase/database";
import { useLocation } from "react-router-dom";
import { Exercise } from "../components/Exercise/PlannedExercise";
import { db } from "../firebase/firebase";
import Dropdown from "../components/Dropdown/Dropdown";
import SetCounter from "../components/SetCounter/SetCounter";
import Timer from "../components/Timer/Timer";

function Training() {
  const location = useLocation();
  const { planId } = location.state as any;

  const [planName, setPlanName] = useState<string>();
  const [exercises, setExercises] = useState<Array<Exercise>>([]);

  useEffect(() => {
    const exercisesRef = ref(db, `plans/${planId}`);
    onValue(exercisesRef, (snapshot) => {
      const plan = snapshot.val();
      setPlanName(plan?.name);
      setExercises(plan?.exercises);
    });
  }, []);

  const [selectedExercise, setSelectedExercise] = useState<number>(-1);

  // useEffect(() => console.log(exercises), [exercises]);

  const updatePlan = (records) => {
    const exercisesCopy = [...exercises];
    exercisesCopy[selectedExercise].records = exercisesCopy[selectedExercise]
      .records
      ? [
          ...exercisesCopy[selectedExercise].records,
          {
            date: new Intl.DateTimeFormat(["en-GB"]).format(new Date()),
            setRecord: records,
          },
        ]
      : [
          {
            date: new Intl.DateTimeFormat(["en-GB"]).format(new Date()),
            setRecord: records,
          },
        ];

    setExercises(exercisesCopy);
    setSelectedExercise(-1);

    set(ref(db, `plans/${planId}`), { name: planName, exercises }).then(() => {
      console.log("SAVED!");
    });
  };

  return (
    <>
      <h1 className="text-xl text-center my-[20px]">Logging - {planName}</h1>

      <Dropdown
        label="Choose an exercise"
        parentSelectedOption={selectedExercise}
        options={exercises.map((e) => e.name)}
        selectOption={(index: number) => setSelectedExercise(index)}
        className="text-lg"
      />

      {selectedExercise > -1 ? (
        <div className="mt-[20px]">
          <SetCounter
            repTarget={exercises[selectedExercise]?.reps}
            totalSets={parseInt(exercises[selectedExercise].sets, 10)}
            updatePlan={updatePlan}
            lastRecord={
              exercises[selectedExercise].records
                ? exercises[selectedExercise].records.slice(-1)[0].setRecord
                : null
            }
          />
        </div>
      ) : (
        <div />
      )}
      {selectedExercise > -1 && (
        <div className="w-full mt-[20px] flex justify-center">
          <Timer />
        </div>
      )}
    </>
  );
}
export default Training;
