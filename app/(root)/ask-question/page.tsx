import Question from "@/components/forms/Question";
import { getUserById } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

async function AskaQuestion() {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");
  const mongoUser = await getUserById({ userId });
  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">Ask a Question</h1>
      <div className="mt-9"></div>
      <Question mongoUserId={JSON.stringify(mongoUser._id)} />
    </div>
  );
}

export default AskaQuestion;
