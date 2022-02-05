import React from "react";
import { CgRemove } from "react-icons/cg";
import { Exercise } from "../Exercise/PlannedExercise";
import Loader from "../Loader/Loader";

interface Props {
  exercises: Array<Exercise>;
  remove: (index: number) => void;
  isPlanLoading?: boolean;
}

function Plan({ exercises, remove, isPlanLoading }: Props) {
  return (
    <table
      id="plannerTable"
      className="w-full divide-y divide-gray-200 text-lg"
    >
      <thead className="bg-gray-50">
        <tr>
          <th
            scope="col"
            className="px-6 py-3 text-left font-medium text-gray-500 tracking-wider max-w-[50%]"
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
            className="py-4 w-fit text-right flex flex-row justify-end"
          >
            <div className="w-[20px] h-[20px]" />
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
            <td className="px-6 py-4  w-[40%] max-w-[50px] overflow-hidden">
              <div className="text-gray-900">{exercise.name}</div>
            </td>
            <td className="px-6 py-4 w-[20%] text-center">
              <div className="text-gray-900">{exercise.sets}</div>
            </td>
            <td className="px-6 py-4 w-[20%] text-center">
              <div className="text-gray-900">{exercise.reps}</div>
            </td>
            <td className="py-4 w-full text-right flex flex-row justify-end items-center pr-[50%]">
              <CgRemove
                className="cursor-pointer text-gray-500 min-w-[20px] min-h-[20px]"
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
