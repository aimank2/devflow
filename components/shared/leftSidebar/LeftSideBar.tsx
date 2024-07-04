"use client";
import { Button } from "@/components/ui/button";
import { SignOutButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { sidebarLinks } from "@/constants";
import { usePathname } from "next/navigation";
const SideBarContent = () => {
  const pathname = usePathname();
  return (
    <div className="flex flex-col gap-5">
      {sidebarLinks.map((sidebarLink) => {
        const isActive =
          pathname === sidebarLink.route ||
          (pathname.includes(sidebarLink.route) && sidebarLink.route);
        return (
          <div key={sidebarLink.route}>
            <Link
              href={sidebarLink.route}
              className={`${isActive ? "primary-gradient rounded-lg text-light-900" : "text-dark300_light900"} flex flex-row items-center justify-start gap-4 bg-transparent p-4 `}
            >
              <Image
                src={sidebarLink.imgURL}
                alt={sidebarLink.label}
                width={20}
                height={20}
                className={`${isActive ? "" : "invert-colors"}`}
              />
              <p
                className={`${isActive ? "base-bold" : "base-medium"}  max-lg:hidden`}
              >
                {sidebarLink.label}
              </p>
            </Link>
          </div>
        );
      })}
    </div>
  );
};
function LeftSideBar() {
  return (
    <section className="mt-30 background-light900_dark200 custom-scrollbar sticky left-0 top-0 h-screen w-[266px] overflow-y-auto border-none px-4 pb-8 pt-36  shadow-sm max-lg:w-[85px] max-md:hidden">
      <div className="flex h-full flex-col justify-between">
        <SideBarContent />
        <SignedOut>
          <div className="flex flex-col gap-3 max-lg:hidden">
            <div>
              <Link href={"/sign-in"}>
                <Button className="small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
                  <span className="primary-text-gradient">Sign In</span>
                </Button>
              </Link>
            </div>
            <div>
              <Link href={"/sign-up"}>
                <Button className="small-medium light-border-2 btn-tertiary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
                  <span className="text-dark400_light900">Sign Up</span>
                </Button>
              </Link>
            </div>
          </div>
        </SignedOut>
        <SignedIn>
          <SignOutButton>
            <Button className="small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none  max-md:hidden">
              <span className="primary-text-gradient">Logout</span>
            </Button>
          </SignOutButton>
        </SignedIn>
      </div>
    </section>
  );
}

export default LeftSideBar;
