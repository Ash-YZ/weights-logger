import React from "react";
import { CgRemove } from "react-icons/cg";
import { BsArrowBarUp, BsArrowBarDown } from "react-icons/bs";
import { Exercise } from "../Exercise/PlannedExercise";

interface Props {
  exercises: Array<Exercise>;
  remove: (index: number) => void;
  reorder: (direction: "UP" | "DOWN", index: number) => void;
}

function Plan({ exercises, remove, reorder }: Props) {
  const moveUp = (index: number) => {
    reorder("UP", index);
  };

  const moveDown = (index: number) => {
    reorder("DOWN", index);
  };

  return (
    <table className="w-full divide-y divide-gray-200 text-lg">
      <thead className="bg-gray-50">
        <tr>
          <th
            scope="col"
            className="px-6 py-3 text-left font-medium text-gray-500 tracking-wider w-[40%]"
          >
            Exercise
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left font-medium text-gray-500 tracking-wider w-[20%] text-center"
          >
            Sets
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left font-medium text-gray-500 tracking-wider w-[20%] text-center"
          >
            Reps
          </th>
          <th scope="col" className="w-[20%]">
            &nbsp;
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {exercises.map((exercise, index) => (
          <tr
            key={`${exercise.name.replaceAll(" ", "")}_${Math.random() * 10}`}
          >
            <td className="px-6 py-4 whitespace-nowrap w-[40%]">
              <div className="text-gray-900">{exercise.name}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap w-[20%] text-center">
              <div className="text-gray-900">{exercise.sets}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap w-[20%] text-center">
              <div className="text-gray-900">{exercise.reps}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap w-fit text-right flex flex-row justify-end gap-5">
              <BsArrowBarUp
                className="cursor-pointer text-black w-[25px] h-[25px]"
                onClick={() => moveUp(index)}
              />
              <BsArrowBarDown
                className="cursor-pointer text-black w-[25px] h-[25px]"
                onClick={() => moveDown(index)}
              />
              <CgRemove
                className="cursor-pointer text-black w-[25px] h-[25px]"
                onClick={() => remove(index)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Plan;
