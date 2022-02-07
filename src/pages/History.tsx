import React, { useEffect, useState } from "react";
import { onValue, ref } from "firebase/database";
import { useLocation } from "react-router-dom";
import { db } from "../firebase/firebase";
import { Exercise } from "../components/Exercise/PlannedExercise";
import Loader from "../components/Loader/Loader";

function History() {
  const [isHistoryLoading, setIsHistoryLoading] = useState(false);
  const [planName, setPlanName] = useState<string>();
  const [exercises, setExercises] = useState<Array<Exercise>>([]);
  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      setIsHistoryLoading(true);
      const { planId } = location.state as any;
      const exercisesRef = ref(db, `plans/${planId}`);
      onValue(exercisesRef, (snapshot) => {
        const plan = snapshot.val();
        setPlanName(plan.name);
        setExercises(plan.exercises);
        setIsHistoryLoading(false);
      });
    }
  }, []);

  return (
    <div className="w-full relative">
      {isHistoryLoading ? (
        <div className="flex justify-center items-center p-[40px]">
          <Loader />
        </div>
      ) : (
        <div className="text-center">
          <h2 className="my-[20px] text-2xl font-semibold">{planName}</h2>
        </div>
      )}
    </div>
  );
}

export default History;
