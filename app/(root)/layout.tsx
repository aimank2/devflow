import LeftSideBar from "@/components/shared/leftSidebar/LeftSideBar";
import Navbar from "@/components/shared/navbar/Navbar";
import RightSidebar from "@/components/shared/rightSidebar/RightSideBar";
import React from "react";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="background-light850_dark100">
      <Navbar />
      <div className="flex justify-between">
        <LeftSideBar />
        <section className=" mx-md:pb-14 flex min-h-screen flex-1 flex-col px-6 pt-36 sm:px-14 ">
          <div className="mx-auto w-full max-w-5xl">{children}</div>
        </section>
        <RightSidebar />
      </div>
    </main>
  );
}

export default Layout;
