"use server";

import { CreateQuestionParams, GetQuestionsParams } from "@/types";
import Question from "../db/question.model";
import Tag from "../db/tag.modle";
import { connectToDb } from "../mongoose";
import User from "../db/user.model";
import { revalidatePath } from "next/cache";

export async function createQuestion(params: CreateQuestionParams) {
  try {
    connectToDb();

    const { title, content, tags, author, path } = params;

    const question = await Question.create({
      title,
      content,
      author,
      tag: [],
    });
    const tagDocuments = [];

    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        {
          name: { $regex: new RegExp(`^${tag}$`, "i") },
        },
        { $setOnInsert: { name: tag }, $push: { question: question._id } },
        { upsert: true, new: true }
      );
      tagDocuments.push(existingTag._id);
    }
    await Question.findByIdAndUpdate(question._id, {
      $push: { tags: { $each: tagDocuments } },
    });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}
export async function getQuestions(params: GetQuestionsParams) {
  try {
    connectToDb();
    const question = await Question.find({})
      .populate({
        path: "tags",
        model: Tag,
      })
      .populate({ path: "author", model: User })
      .sort({ createdAt: -1 });
    return question;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
