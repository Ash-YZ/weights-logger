import React, { useEffect, useState } from "react";
import { onValue, ref, set } from "firebase/database";
import { Link, useLocation } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import { Exercise } from "../components/Exercise/PlannedExercise";
import { auth, db } from "../firebase/firebase";
import Dropdown from "../components/Dropdown/Dropdown";
import SetCounter from "../components/SetCounter/SetCounter";
import Timer from "../components/Timer/Timer";
import StandardButton from "../components/Button/StandardButton";
import { isDateToday } from "../utils/DataUtils";
import ToastNotification from "../components/Notification/ToastNotification";

function Training() {
  const location = useLocation();
  const { planId } = location.state as any;

  const [planName, setPlanName] = useState<string>();
  const [exercises, setExercises] = useState<Array<Exercise>>([]);
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      const exercisesRef = ref(db, `${user.uid}/plans/${planId}`);
      onValue(exercisesRef, (snapshot) => {
        const plan = snapshot.val();
        setPlanName(plan?.name);
        setExercises(plan?.exercises);
      });
    }
  }, [loading]);

  const [selectedExercise, setSelectedExercise] = useState<number>(-1);

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

    set(ref(db, `${user.uid}/plans/${planId}`), {
      name: planName,
      exercises,
    }).catch(() => {
      toast.error("Error saving progress");
    });
  };

  return (
    <>
      <ToastNotification />
      <h1 className="text-xl text-center my-[20px]">Logging - {planName}</h1>
      <Dropdown
        label="Choose an exercise"
        allSelectionMadeLabel="All plan exercises logged today"
        warningMessage="Current exercise progress will be reset"
        parentSelectedOption={selectedExercise}
        setParentSelectedOption={setSelectedExercise}
        options={exercises.map((e) => {
          return {
            name: e.name,
            isPreviouslySelected: e.records && isDateToday(e.records[0].date),
          };
        })}
        selectOption={(index: number) => setSelectedExercise(index)}
        className="text-lg"
        autoSelectSingleOption
      />

      {selectedExercise > -1 ? (
        <div className="mt-[20px]">
          <SetCounter
            selectedExercise={selectedExercise}
            repTarget={exercises[selectedExercise]?.reps}
            totalSets={parseInt(exercises[selectedExercise].sets, 10)}
            updatePlan={updatePlan}
            notes={exercises[selectedExercise].notes}
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

      {selectedExercise === -1 && (
        <Link to="/dashboard">
          <StandardButton
            label="Return to dashboard"
            onClick={() => {}}
            className="w-full mt-[30px]"
            type="secondary"
          />
        </Link>
      )}
    </>
  );
}
export default Training;
