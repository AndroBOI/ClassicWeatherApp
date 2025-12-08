"use client";
import { Search } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Input } from "./ui/input";
import { useWeather } from "@/contexts/WeatherContext";
import { GeoLocation } from "@/types/geolocationtypes";
import { useDebounce } from "@/hooks/useDebouce";
import { Card } from "./ui/card";

const SearchBar = () => {
  const { searchValue, setSearchValue, handleSearch, setCoordinates } =
    useWeather();

  const [cities, setCities] = useState<GeoLocation[]>([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const debouncedSearchValue = useDebounce(searchValue, 500);

  useEffect(() => {
    if (!isOpen) return;
    if (!debouncedSearchValue || debouncedSearchValue.trim().length < 2) {
      setCities([]);
      return;
    }

    const search = async () => {
      setLoading(true);
      setIsOpen(true);
      try {
        const results = await handleSearch(debouncedSearchValue);
        setCities(results || []);
      } catch (error) {
        console.error("Search error:", error);
        setCities([]);
      } finally {
        setLoading(false);
      }
    };

    search();
  }, [debouncedSearchValue, handleSearch, isOpen]);

  const handleCitySelect = (city: GeoLocation) => {
    console.log("Selected city:", city);
    setSearchValue(city.name);
    setCoordinates(city);
    setCities([]);
    setIsOpen(false);
  };

  const handleClick = () => {
    if (cities.length > 0) {
      const firstCity = cities[0];
      setSearchValue(firstCity.name);
      setCoordinates(firstCity); 
      setCities([]);
      setIsOpen(false);
    }
  };

  return (
    <div className="relative">
      <div className="relative">
        <Input
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
            setIsOpen(true);
          }}
          className=" rounded-full shadow-lg pr-10 focus:ring-0 focus:border-none"
          placeholder="Search for a city..."
        />
        <Search
        onClick={handleClick}
          className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400"
          strokeWidth={1}
          size={20}
        />
      </div>

      {isOpen && (loading || cities.length > 0) && (
        <div className="absolute top-full left-0 right-0 mt-2  rounded-lg shadow-lg max-h-64 overflow-y-auto z-50">
          {loading ? (
            <div className="p-4 text-center text-gray-500">Searching...</div>
          ) : (
            cities.map((city, i) => (
              <Card
                key={i}
                onClick={() => handleCitySelect(city)}
                className="p-2 gap-0 hover:bg-primary hover:text-primary-foreground cursor-pointer"
              >
                <div className="font-medium">{city.name}</div>
                {(city.admin1 || city.country) && (
                  <div className="text-sm text-gray-500">
                    {[city.admin1, city.country].filter(Boolean).join(", ")}
                  </div>
                )}
              </Card>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
