import Link from "next/link";
import React from "react";
import RenderTag from "../shared/tag/RenderTag";
import Metric from "../shared/Metric";
import { formatNumber, getTimestamp } from "@/lib/utils";
export interface QuestionProps {
  _id: number | string;
  title: string;
  tags: { _id: string; name: string }[];
  author: { _id: string; name: string; picture: string };
  upvotes: number;
  views: number;
  answers: Array<object>;
  createdAt: Date;
}
function QuestionCard({
  title,
  _id,
  tags,
  author,
  answers,
  upvotes,
  createdAt,
  views,
}: QuestionProps) {
  return (
    <div className="card-wrapper rounded-[10px] p-9 sm:px-11">
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <div>
          <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
            {getTimestamp(createdAt)}
          </span>
          <Link href={`/question/${_id}`}>
            <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
              {title}
            </h3>
          </Link>
        </div>
      </div>
      <div className="mt-3.5 flex flex-wrap gap-2">
        {tags?.map((tag, index) => (
          <RenderTag
            key={tag._id + index}
            _id={tag._id}
            name={tag.name}
            totalQuestions={0}
          />
        ))}
      </div>
      <div className=" mt-6 flex w-full justify-between  ">
        <div className="  items-start">
          <Metric
            imgUrl={"/assets/icons/avatar.svg"}
            alt="user"
            value={author.name}
            title={getTimestamp(createdAt)}
            href={`/profile/${author._id}`}
            textStyles="small-medium  text-dark400_light700"
          />
        </div>
        <div className="flex  flex-row gap-3">
          <Metric
            imgUrl="/assets/icons/like.svg"
            alt="Up votes"
            value={formatNumber(upvotes)}
            title={"Votes"}
            textStyles="small-medium  text-dark400_light800"
          />
          <Metric
            imgUrl="/assets/icons/message.svg"
            alt="message"
            value={formatNumber(answers.length)}
            title={"Answers"}
            textStyles="small-medium  text-dark400_light800"
          />
          <Metric
            imgUrl="/assets/icons/eye.svg"
            alt="eye"
            value={formatNumber(views)}
            title={"Views"}
            textStyles="small-medium  text-dark400_light800"
          />
        </div>
      </div>
    </div>
  );
}

export default QuestionCard;
