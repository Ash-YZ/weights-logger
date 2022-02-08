import React, { useEffect, useMemo, useState } from "react";
import { onValue, ref } from "firebase/database";
import { Link, useLocation } from "react-router-dom";
import { db } from "../firebase/firebase";
import { Exercise } from "../components/Exercise/PlannedExercise";
import Loader from "../components/Loader/Loader";
import StandardButton from "../components/Button/StandardButton";

function History() {
  const [isHistoryLoading, setIsHistoryLoading] = useState(false);
  const [planName, setPlanName] = useState<string>();
  const [exercises, setExercises] = useState<Array<Exercise>>([]);
  const location = useLocation();
  const [planId, setPlanId] = useState<string>();

  useEffect(() => {
    if (location.state) {
      setIsHistoryLoading(true);
      const { planId: statePlanId } = location.state as any;
      const exercisesRef = ref(db, `plans/${statePlanId}`);
      onValue(exercisesRef, (snapshot) => {
        const plan = snapshot.val();
        setPlanName(plan.name);
        setExercises(plan.exercises);
        setIsHistoryLoading(false);
        setPlanId(statePlanId);
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
        <div className="text-center relative">
          <h2 className="my-[20px] text-2xl font-semibold">{planName}</h2>
          <div className="max-w-[100%] overflow-x-scroll relative">
            <table className="w-full divide-y divide-gray-200 text-lg text-sm text-left border-[1px] max-w-[150px] fixed bg-gray-600 mb-[30px]">
              <tbody>
                <tr className="h-[25px]">
                  <td className="italic text-[10px] max-w-[10px] border-r-[1px] border-r-[1px] text-center" />
                </tr>
                {exercises?.map((exercise) => {
                  return (
                    <React.Fragment key={exercise.name + Math.random() * 10}>
                      <tr className="border-y-[1px] h-[25px]">
                        <th className="py-[4px] w-[150px] overflow-hidden border-r-[1px] min-w-[150px]">
                          {exercise.name}
                        </th>
                      </tr>
                      {exercise.records?.map((record) => {
                        return (
                          <tr
                            className="h-[25px]"
                            key={record.date + Math.random() * 10}
                          >
                            <td className="w-[150px] border-r-[1px]">
                              {record.date}
                            </td>
                          </tr>
                        );
                      })}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>

            <table className="w-full divide-y divide-gray-200 text-lg text-sm text-left border-[1px] mb-[30px]">
              <tbody>
                <tr className="h-[25px]">
                  <td className="italic text-[10px] max-w-[10px] border-r-[1px] border-r-[1px] text-center" />
                  {new Array(maxCols).fill("").map((_, i) => {
                    return (
                      <td
                        key={Math.random() * 10}
                        colSpan={2}
                        className="italic text-[10px] max-w-[10px] border-r-[1px] border-r-[1px] text-center"
                      >
                        Set {`${i + 1}`}
                      </td>
                    );
                  })}
                </tr>
                {exercises?.map((exercise, idx) => {
                  return (
                    <React.Fragment key={exercise.name + Math.random() * 10}>
                      <tr className="border-y-[1px] h-[25px]">
                        <th className="py-[4px] w-[150px] overflow-hidden border-r-[1px] min-w-[150px]">
                          {exercise.name}
                        </th>
                        {new Array(maxCols).fill("").map(() => {
                          return (
                            <React.Fragment
                              key={exercise.name + Math.random() * 10}
                            >
                              <td className="italic text-[10px] max-w-[10px] text-center ">
                                {`${idx === 0 ? "W" : ""}`}
                              </td>
                              <td className="italic text-[10px] max-w-[10px] border-r-[1px] border-r-[1px] text-center">
                                {`${idx === 0 ? "R" : ""}`}
                              </td>
                            </React.Fragment>
                          );
                        })}
                      </tr>
                      {exercise.records?.map((record) => {
                        return (
                          <tr
                            className="h-[25px]"
                            key={record.date + Math.random() * 10}
                          >
                            <td className="w-[150px] border-r-[1px]">
                              {record.date}
                            </td>
                            {new Array(maxCols).fill("").map((_, ind) => {
                              const sr = record.setRecord[ind] ?? {
                                weight: "",
                                reps: "",
                              };
                              return (
                                <React.Fragment
                                  key={exercise.name + Math.random() * 10}
                                >
                                  <td className="min-w-[30px] text-center border-r border-dotted border-gray-300">
                                    {sr.weight}
                                  </td>
                                  <td className="min-w-[30px] border-r-[1px] text-center">
                                    {sr.reps}
                                  </td>
                                </React.Fragment>
                              );
                            })}
                          </tr>
                        );
                      })}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
          <Link
            to="/planner"
            state={{ planId }}
            className="text-[15px] w-full inline-block mt-[20px]"
          >
            <StandardButton
              label="Back to planner"
              onClick={() => {}}
              className="w-full"
              disabled={!planId}
            />
          </Link>
        </div>
      )}
    </div>
  );
}

export default History;
