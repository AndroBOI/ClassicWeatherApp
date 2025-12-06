"use client";
import { Search } from "lucide-react";
import React from "react";
import { Input } from "./ui/input";
import { useWeather } from "@/contexts/WeatherContext";

const SearchBar = () => {
  const { searchValue, setSearchValue, handleSearch } = useWeather();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch();
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="relative">
        <Input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="border-1 rounded-full border-black"
        />
        <Search
          onClick={() => handleSearch}
          className="absolute right-0 top-1/2 -translate-1/2"
          strokeWidth={1}
        />
      </div>
    </form>
  );
};

export default SearchBar;
