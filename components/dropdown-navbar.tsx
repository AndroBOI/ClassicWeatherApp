"use client";

import * as React from "react";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Checked = DropdownMenuCheckboxItemProps["checked"];

interface DropdownProps {
  value: boolean;
  setValue: (value: boolean) => void;
}

export function DropdownNavbar({ value, setValue }: DropdownProps) {
  return (
    <div className="flex justify-between p-5">
      <div className="font-bold">Weather App</div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="bg-[#aeaeb71c] border-none text-sm hover:bg-[#aeaeb73d]">
            <img src="/assets/images/icon-units.svg" alt="" />
            <div>Units</div>
            <img src="/assets/images/icon-dropdown.svg" alt="" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 bg-[#aeaeb71c] border-none text-white">
          <DropdownMenuLabel className="text-[#ffffffd3] font-medium">Switch to Imperial</DropdownMenuLabel>
            <DropdownMenuLabel className="text-xs text-gray-500">Temperature</DropdownMenuLabel>
          <DropdownMenuCheckboxItem className="flex justify-between focus:text-white" checked={value} onCheckedChange={setValue}>
            Test
          </DropdownMenuCheckboxItem>
          
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
