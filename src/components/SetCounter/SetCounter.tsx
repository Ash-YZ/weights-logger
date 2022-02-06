import React, { useState } from "react";
import StandardInput from "../Input/StandardInput";
import { SetRecord } from "../Exercise/PlannedExercise";
import StandardButton from "../Button/StandardButton";

interface Props {
  totalSets: number; // 1 based
  updatePlan: (records: Array<SetRecord>) => void;
}

function SetCounter({ totalSets, updatePlan }: Props) {
  const [setCount, setSetCount] = useState(1);
  const [setRecords, setSetRecords] = useState<Array<SetRecord>>([]);
  const [thisSetRecord, setThisSetRecord] = useState<SetRecord>({
    weight: "",
    reps: "",
  });

  return (
    <div>
      <p className="mt-[20px] text-center mb-[20px] font-semibold">
        Set {setCount} / {totalSets}
      </p>
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
        label={`${setCount > totalSets - 1 ? "Complete Set" : "Next Set"}`}
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
