import Image from "next/image";
import React from "react";
import { Input } from "../../ui/input";

function LocalSearchBar() {
  return (
    <div className="relative  w-full ">
      <div className="background-light800_darkgradient relative flex min-h-[56px] grow items-center justify-between gap-4 rounded-xl px-4">
        <Image
          src={"/assets/icons/search.svg"}
          alt="search"
          width={24}
          height={24}
          className="cursor-pointer"
        />
        <Input
          type="text"
          placeholder="Search"
          value={""}
          className="paragraph-regular no-focus placeholder background-light800_darkgradient border-none shadow-none outline-none"
        />
      </div>
    </div>
  );
}

export default LocalSearchBar;
