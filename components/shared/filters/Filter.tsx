"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
interface Prop {
  filters: {
    name: string;
    value: string;
  }[];
  otherClasses?: string;
  containerClasses?: string;
}

function Filter({ filters, otherClasses, containerClasses }: Prop) {
  const active = "";
  return (
    <div className="w-full">
      <div className="  hidden flex-row justify-start gap-3 md:flex">
        {filters.map((item) => {
          return (
            <Button
              key={item.value}
              onClick={() => {}}
              className={`body-medium rounded-lg px-6  py-3  capitalize shadow-none ${active === item.value ? "bg-primary-100" : "hover:bg-light800 bg-light-800 text-light-500 dark:bg-dark-300 dark:text-light-500 dark:hover:bg-dark-300"}`}
            >
              {item.name}
            </Button>
          );
        })}
      </div>
      <div className="block md:hidden">
        <Select>
          <SelectTrigger
            className={`${otherClasses} light-border body-regular background-light800_dark300 text-dark500_light700 rounded-xl px-6 py-2 outline-none`}
          >
            <div className="line-clamp-1 flex-1 text-left">
              <SelectValue placeholder="Select a Filter" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {filters.map((item) => (
                <SelectItem
                  key={item.value}
                  value={item.value}
                  className="hover:background-light800_dark300 cursor-pointer"
                >
                  {item.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

export default Filter;
