import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "../../../public/assets/images/site-logo.svg";
import { SignedIn, UserButton } from "@clerk/nextjs";
import Theme from "./Theme";
import MobileNav from "./MobileNav";
import GlobalSearch from "../search/Search";
function Navbar() {
  return (
    <nav className="flex-between background-light900_dark200 fixed z-50 w-full gap-5 p-6 shadow-light-300 dark:shadow-none sm:px-12 ">
      <Link href={"/"} className="flex items-center gap-1">
        <Image src={logo} width={23} height={23} alt="dev flow"></Image>
        <p className="h2-bold hidden font-spaceGrotesk text-dark-100 dark:text-light-900 md:block">
          Dev<span className="text-primary-500">Flow</span>
        </p>
      </Link>
      <GlobalSearch />
      <div className="flex items-center gap-5">
        <Theme />
        <SignedIn>
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: { avatarBox: "h-10 w-10" },
              variables: { colorPrimary: "#ff7000" },
            }}
          />
        </SignedIn>
        <MobileNav />
      </div>
    </nav>
  );
}

export default Navbar;
