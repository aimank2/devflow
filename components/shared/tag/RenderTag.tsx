import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import React from "react";

interface Props {
  _id: number | string;
  name: string;
  totalQuestions?: number;
  showCount?: boolean;
}
function RenderTag({ _id, name, totalQuestions, showCount }: Props) {
  return (
    <Link href={`/tag/${_id}`} className="flex justify-between gap-2">
      <Badge className="subtle-medium background-light800_dark300 rounded-md border-none px-4 py-2 uppercase text-light-500">
        {name}
      </Badge>
      {showCount && (
        <p className="small-medium text-dark500_light700">{totalQuestions}</p>
      )}
    </Link>
  );
}

export default RenderTag;
