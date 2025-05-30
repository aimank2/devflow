"use client";
import React from "react";
import { useTheme } from "@/context/ThemeProvider";
import Image from "next/image";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { themes } from "@/constants";
function Theme() {
  const { mode, setMode } = useTheme();
  return (
    <Menubar className="relative border-none bg-transparent shadow-none">
      <MenubarMenu>
        <MenubarTrigger className="  focus:bg-light-900 data-[state=open]:bg-light-900 dark:focus:bg-dark-200 dark:data-[state=open]:bg-dark-300">
          {mode === "light" ? (
            <Image
              src="/assets/icons/sun.svg"
              alt="sun"
              width={20}
              height={20}
              className="active-theme"
            />
          ) : (
            <Image
              src="/assets/icons/moon.svg"
              alt="sun"
              width={20}
              height={20}
              className="active-theme"
            />
          )}
        </MenubarTrigger>
        <MenubarContent className=" absolute -right-12 mt-3 min-w-[120px] rounded border bg-white py-2 dark:border-dark-400 dark:bg-dark-300">
          {themes.map((theme, index: number) => {
            return (
              <MenubarItem
                key={theme.value + index}
                className="px-2.5py-2  flex items-center gap-4 dark:focus:bg-dark-400 "
                onClick={() => {
                  setMode(theme.value);
                  if (theme.value !== "system")
                    localStorage.theme = theme.value;
                  else {
                    localStorage.removeItem("theme");
                  }
                }}
              >
                <Image
                  src={theme.icon}
                  alt={theme.value}
                  width={16}
                  height={16}
                  className={`${mode === theme.value && "active-theme"}`}
                />
                <p
                  className={`body-semibold text-light-500 ${mode === theme.value ? "text-primary-500" : "text-dark100_light900"}`}
                >
                  {theme.label}
                </p>
              </MenubarItem>
            );
          })}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}

export default Theme;
