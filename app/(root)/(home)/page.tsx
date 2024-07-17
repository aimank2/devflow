import QuestionCard, { QuestionProps } from "@/components/cards/QuestionCard";
import Filter from "@/components/shared/filters/Filter";
import NoResult from "@/components/shared/NoResult";
import LocalSearchBar from "@/components/shared/search/localSearchBar";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants";
import { getQuestions } from "@/lib/actions/question.action";
import Link from "next/link";

export default async function Home() {
  const questions = await getQuestions({});
  return (
    <>
      <div className=" flex w-full  flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900 ">All Questions</h1>
        <Link
          href={"/ask-question"}
          className="flex justify-end max-sm:w-full max-sm:justify-start"
        >
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900 max-sm:w-full ">
            Ask a Question
          </Button>
        </Link>
      </div>
      <div className="mt-11 flex flex-row  justify-between gap-5  max-sm:flex-col sm:items-center md:flex-col">
        <LocalSearchBar />
        <Filter filters={HomePageFilters} otherClasses="min-h-[56px]" />
      </div>
      <div className="mt-10 flex w-full flex-col gap-6">
        {questions.length > 0 ? (
          <>
            {questions.map((question) => (
              <QuestionCard
                key={question._id}
                _id={question._id}
                title={question.title}
                tags={question.tags}
                author={question.author}
                upvotes={question.upvotes}
                views={question.views}
                answers={question.answers}
                createdAt={question.createdAt}
              />
            ))}
          </>
        ) : (
          <NoResult
            title={"There is no question to show "}
            description={
              "Be the first to break the silence! 🚀 Ask a question and kickstart the descussion. Our query could be next big thing others learn from . Get involved!"
            }
            link={""}
            linkTitle={"Ask a Question"}
          />
        )}
      </div>
    </>
  );
}
