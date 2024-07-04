"use client";

import Image from "next/image";
import Link from "next/link";
import chevronRight from "@/public/assets/icons/chevron-right.svg";
import RenderTag from "../tag/RenderTag";
function RightSidebar() {
  return (
    <div className="mt-30 background-light900_dark200 sticky right-0  hidden h-screen w-[350px]  overflow-y-auto border-none px-6 pb-8 pt-36 shadow-sm lg:block">
      <div className="flex h-full flex-col gap-16">
        <div className="text-dark300_light900 flex flex-col gap-8">
          <p className="h3-bold">Top Questions</p>
          <Link
            href={"/"}
            className=" flex flex-row items-center justify-between gap-6"
          >
            <p className="text-sm">
              Best practices for data fetching in a Next.js application with
              Server-Side Rendering (SSR)?
            </p>
            <Image src={chevronRight} width={20} height={20} alt="go to link" />
          </Link>
          <Link
            href={"/"}
            className=" flex flex-row items-center justify-between gap-6"
          >
            <p className="text-xs">
              Is it only me or the font is bolder than necessary?
            </p>
            <Image src={chevronRight} width={20} height={20} alt="go to link" />
          </Link>
        </div>
        <div className="text-dark300_light900 flex flex-col gap-8 ">
          <p className="h3-bold">Popular Tags</p>
          <div className="flex flex-col gap-3">
            {tags.map((tag) => {
              return (
                <RenderTag
                  key={tag._id}
                  _id={tag._id}
                  name={tag.name}
                  totalQuestions={tag.totalQuestions}
                  showCount={tag.showCount}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RightSidebar;
export const tags = [
  { _id: 1, name: "REACT JS", totalQuestions: 5, showCount: true },
  { _id: 1, name: "REACT JS", totalQuestions: 5, showCount: true },
];
