import React, { useEffect, useMemo, useState } from "react";
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

  const maxCols = useMemo(() => {
    const allLengths = [];
    exercises?.forEach((exercise) => {
      exercise.records?.forEach((record) =>
        allLengths.push(record.setRecord.length)
      );
    });
    return allLengths.sort().pop();
  }, [exercises]);

  return (
    <div className="w-full relative">
      {isHistoryLoading ? (
        <div className="flex justify-center items-center p-[40px]">
          <Loader />
        </div>
      ) : (
        <div className="text-center">
          <h2 className="my-[20px] text-2xl font-semibold">{planName}</h2>

          <table className="w-full divide-y divide-gray-200 text-lg text-sm text-left border-[1px]">
            <tbody>
              {exercises?.map((exercise, idx) => {
                return (
                  <>
                    <tr className="border-y-[1px]">
                      <th className="py-[4px] w-[150px] overflow-hidden border-r-[1px]">
                        {exercise.name}
                      </th>
                      {new Array(maxCols).fill("").map(() => {
                        return (
                          <>
                            <td className="italic text-[10px] max-w-[10px] text-center">
                              {`${idx === 0 ? "S" : ""}`}
                            </td>
                            <td className="italic text-[10px] max-w-[10px] border-r-[1px] border-r-[1px] text-center">
                              {`${idx === 0 ? "R" : ""}`}
                            </td>
                          </>
                        );
                      })}
                    </tr>
                    {exercise.records?.map((record) => {
                      return (
                        <tr key={record.date + Math.random() * 10}>
                          <td className="w-[150px] border-r-[1px]">
                            {record.date}
                          </td>
                          {new Array(maxCols).fill("").map((_, ind) => {
                            const sr = record.setRecord[ind] ?? {
                              weight: "",
                              reps: "",
                            };
                            return (
                              <>
                                <td className="max-w-[10px] text-center">
                                  {sr.weight}
                                </td>
                                <td className="max-w-[10px] border-r-[1px] text-center">
                                  {sr.reps}
                                </td>
                              </>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default History;
