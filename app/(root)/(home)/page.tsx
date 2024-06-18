import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="flex-center h-screen ">
      <UserButton afterSignOutUrl="/" />
    </div>
  );
}
