import React from "react";
import { CgRemove } from "react-icons/cg";
import { BsArrowBarDown, BsArrowBarUp } from "react-icons/bs";
import { Exercise } from "../Exercise/PlannedExercise";
import Loader from "../Loader/Loader";

interface Props {
  exercises: Array<Exercise>;
  remove: (index: number) => void;
  reorder: (direction: "UP" | "DOWN", index: number) => void;
  isPlanLoading?: boolean;
}

function Plan({ exercises, remove, reorder, isPlanLoading }: Props) {
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
            className="px-6 py-3 text-left font-medium text-gray-500 tracking-wider max-w-[40%]"
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
          <th
            scope="col"
            className="px-6 py-4 whitespace-nowrap w-fit text-right flex flex-row justify-end gap-5"
          >
            <div className="w-[25px] h-[25px]" />
            <div className="w-[25px] h-[25px]" />
            <div className="w-[25px] h-[25px]" />
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200 text-sm">
        {!exercises.length && (
          <tr>
            <td colSpan={4} className="text-gray-500 text-sm text-center p-3">
              {isPlanLoading ? <Loader isDarkMode /> : "No exercises added yet"}
            </td>
          </tr>
        )}
        {exercises.map((exercise, index) => (
          <tr
            key={`${exercise.name.replaceAll(" ", "")}_${Math.random() * 10}`}
          >
            <td className="px-6 py-4 break-words w-[40%] max-w-[50px]">
              <div className="text-gray-900">{exercise.name}</div>
            </td>
            <td className="px-6 py-4 w-[20%] text-center">
              <div className="text-gray-900">{exercise.sets}</div>
            </td>
            <td className="px-6 py-4 w-[20%] text-center">
              <div className="text-gray-900">{exercise.reps}</div>
            </td>
            <td className="px-6 py-4 w-fit text-right flex flex-row justify-end gap-5 items-center">
              <BsArrowBarUp
                className={`text-black ${
                  index > 0 ? "cursor-pointer" : "text-gray-400"
                } w-[25px] h-[25px]`}
                onClick={() => moveUp(index)}
              />
              <BsArrowBarDown
                className={`text-black ${
                  index < exercises.length - 1
                    ? "cursor-pointer"
                    : "text-gray-400"
                } w-[25px] h-[25px]`}
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
