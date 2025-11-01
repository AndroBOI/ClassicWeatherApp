"use client"

import * as React from "react"
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type Checked = DropdownMenuCheckboxItemProps["checked"]


interface DropdownProps {
  value: boolean,
  setValue: (value: boolean) => void
}


export function DropdownNavbar ({value, setValue}: DropdownProps) {
  

  return (
    <div className="flex justify-between p-5">
      <div className="font-bold">Weather App</div>
 <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Open</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>View</DropdownMenuLabel>
          <DropdownMenuCheckboxItem
          checked={value}
          onCheckedChange={setValue}
        >
          Test
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
    </div>
   
  )
}
