import React, { useEffect, useState } from "react";
import StandardInput from "../Input/StandardInput";
import { SetRecord } from "../Exercise/PlannedExercise";
import StandardButton from "../Button/StandardButton";

interface Props {
  repTarget: string;
  totalSets: number; // 1 based
  updatePlan: (records: Array<SetRecord>) => void;
  lastRecord?: Array<SetRecord>;
  selectedExercise: number;
}

function SetCounter({
  repTarget,
  totalSets,
  updatePlan,
  lastRecord,
  selectedExercise,
}: Props) {
  const [setCount, setSetCount] = useState(1);
  const [setRecords, setSetRecords] = useState<Array<SetRecord>>([]);
  const [thisSetRecord, setThisSetRecord] = useState<SetRecord>({
    weight: "",
    reps: "",
  });

  useEffect(() => {
    setSetCount(1);
    setThisSetRecord({
      weight: "",
      reps: "",
    });
    setSetRecords([]);
  }, [selectedExercise]);

  return (
    <div>
      <div className="flex gap-3 justify-evenly my-[20px]">
        <div className="text-center text-lg flex flex-col border-2 py-[5px] px-[30px] w-1/3">
          <div>Sets</div>
          <div>
            {setCount} / {totalSets}
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            setThisSetRecord({
              ...thisSetRecord,
              reps: repTarget,
            });
          }}
          className="flex flex-col items-center text-lg flex flex-col border-2 py-[5px] px-[30px] w-1/3"
        >
          <div>Reps</div>
          <div>{repTarget}</div>
        </button>
        {lastRecord && (
          <button
            type="button"
            className="text-center text-lg flex flex-col border-2 py-[5px] px-[30px] w-1/3 cursor-pointer items-center bg-blue-500"
            onClick={() => {
              setThisSetRecord({
                ...thisSetRecord,
                weight: lastRecord[setCount - 1].weight,
              });
            }}
          >
            <div>Weight</div>
            <div>{lastRecord ? lastRecord[setCount - 1]?.weight : ""}</div>
          </button>
        )}
      </div>

      {lastRecord && (
        <div className="text-center mb-[20px] font-semibold flex flex-col">
          <div className="mb-[10px] text-lg">Reps hit last workout</div>
          <div className="flex justify-center">
            <div className="flex w-full flex-wrap justify-center gap-1">
              {lastRecord.map((record, idx) => {
                return (
                  <div
                    key={Math.random() * 10}
                    className={`flex flex-col items-center justify-center px-[9px] py-[3px] w-fit border-[4px] border-white ${
                      setCount - 1 === idx ? "border-blue-500" : ""
                    }`}
                  >
                    <div className="text-sm">Set {idx + 1}</div>
                    <div>{record.reps}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
      <div className="flex gap-5 justify-center items-center">
        <StandardInput
          label="Weight"
          value={thisSetRecord.weight}
          name="set_weight"
          type="number"
          onChange={(e) => {
            setThisSetRecord({ ...thisSetRecord, weight: e.target.value });
          }}
          className="w-[50%] text-center"
        />

        <StandardInput
          label="Reps"
          value={thisSetRecord.reps}
          name="set_reps"
          type="number"
          onChange={(e) => {
            setThisSetRecord({ ...thisSetRecord, reps: e.target.value });
          }}
          className="w-[50%] text-center"
        />
      </div>

      <StandardButton
        label={`${setCount > totalSets - 1 ? "Done" : "Next Set"}`}
        onClick={() => {
          if (setCount === totalSets) {
            setSetCount(0);
            updatePlan([...setRecords, thisSetRecord]);
            setSetRecords([]);
          } else {
            setSetRecords([...setRecords, thisSetRecord]);
            setSetCount(setCount + 1);
          }

          setThisSetRecord({ weight: "", reps: "" });
        }}
        className="w-full mt-[20px]"
        disabled={
          setCount > totalSets ||
          thisSetRecord.weight.trim().length === 0 ||
          thisSetRecord.reps.trim().length === 0
        }
      />
    </div>
  );
}

export default SetCounter;
