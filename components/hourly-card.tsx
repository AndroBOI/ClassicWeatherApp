import React from "react";
import { HourlyCardProps } from "@/types/props";

const HourlyCard = ({ time, temp, formattedTime }: HourlyCardProps) => {
  return (
    <div className="bg-[hsl(243,23%,30%)] p-3 flex justify-between rounded-md">
      <div>{formattedTime(time)}</div>
      <div>{temp}°</div>
    </div>
  );
};

export default HourlyCard;
