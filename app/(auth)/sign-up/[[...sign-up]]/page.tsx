import React from "react";
import { SignUp } from "@clerk/nextjs";

function Page() {
  return <SignUp forceRedirectUrl={"/"} fallbackRedirectUrl={"/"} />;
}

export default Page;
