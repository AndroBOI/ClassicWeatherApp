import React from "react";
import { DailyCardProps } from "@/types/props";

const DailyCard = ({ day, max, min, precipitation, getDailyIcon }: DailyCardProps) => {
  return (
    <div className="rounded-md bg-gray-700 h-[9rem] p-3 flex flex-col justify-center items-center space-y-5">
      <div>
        {new Date(day).toLocaleDateString("en-us", {
          weekday: "short",
        })}
      </div>
      <div>
        <img className="h-10 w-10" src={getDailyIcon(precipitation)} alt="" />
      </div>
      <div className="flex text-xs justify-between w-full">
        <div>{max}°</div>
        <div>{min}°</div>
      </div>
    </div>
  );
};

export default DailyCard;
