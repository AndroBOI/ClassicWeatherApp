"use client";

import { SearchIcon } from "lucide-react";
import React, {useState} from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {getWeatherNow} from "@/scripts/app.js"
const Content = ({ value }: { value: boolean }) => {
 const[city, setCity] = useState("")
  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()

      const data = await getWeatherNow(city)

      console.log(data)
  }



  return (
    <div>
      <div className="flex justify-center items-center">
        <form onSubmit={handleSubmit} className="flex w-lg gap-3">
          <div className="relative w-full">       
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            
            <Input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Search for a place..."
              className="pl-9 placeholder:text-[#ffffff8b] text-xs"
            />
          </div>
          <Button type="submit">Search</Button>
        </form>
      </div>

      <div className="mt-4">
        {value ? (
          <div className="text-green-600">Value is True</div>
        ) : (
          <div className="text-red-600">Value is False</div>
        )}
      </div>
    </div>
  );
};

export default Content;
