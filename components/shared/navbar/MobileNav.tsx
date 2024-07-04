"use client";
import Image from "next/image";
import logo from "@/public/assets/images/site-logo.svg";
import bugerMenu from "@/public/assets/icons/hamburger.svg";
import { usePathname } from "next/navigation";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { SignOutButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { sidebarLinks } from "@/constants";
export const NavContent = () => {
  const pathname = usePathname();
  return (
    <section className="flex h-full flex-col gap-6 pt-16">
      {sidebarLinks.map((sidebarLink) => {
        const isActive =
          pathname === sidebarLink.route ||
          (pathname.includes(sidebarLink.route) && sidebarLink.route);
        return (
          <SheetClose asChild key={sidebarLink.route}>
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
              <p className={`${isActive ? "base-bold" : "base-medium"}`}>
                {sidebarLink.label}
              </p>
            </Link>
          </SheetClose>
        );
      })}
    </section>
  );
};
function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger>
        <Image
          src={bugerMenu}
          alt="menu"
          width={36}
          height={36}
          className="invert-colors sm:hidden"
        />
      </SheetTrigger>
      <SheetContent
        side={"left"}
        className="background-light900_dark200 border-none"
      >
        <Link href={"/"} className="flex items-center gap-1">
          <Image src={logo} width={23} height={23} alt="dev flow"></Image>
          <p className="h2-bold text-dark100_light900 font-spaceGrotesk">
            Dev<span className="text-primary-500">Flow</span>
          </p>
        </Link>
        <div className="flex h-full flex-col justify-between pb-10">
          <SheetClose asChild>
            <NavContent />
          </SheetClose>

          <SignedOut>
            <div className="flex flex-col gap-3">
              <SheetClose asChild>
                <Link href={"/sign-in"}>
                  <Button className="small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
                    <span className="primary-text-gradient">Sign In</span>
                  </Button>
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link href={"/sign-up"}>
                  <Button className="small-medium light-border-2 btn-tertiary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
                    <span className="text-dark400_light900">Sign Up</span>
                  </Button>
                </Link>
              </SheetClose>
            </div>
          </SignedOut>

          <SignedIn>
            <SheetClose asChild>
              <SignOutButton>
                <Button className="small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
                  <span className="primary-text-gradient">Logout</span>
                </Button>
              </SignOutButton>
            </SheetClose>
          </SignedIn>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default MobileNav;
