"use server";

import { CreateUserParams, DeleteUserParams, UpdateUserParams } from "@/types";
import User from "../db/user.model";
import { connectToDb } from "../mongoose";
import { revalidatePath } from "next/cache";
import Question from "../db/question.model";

export async function getUserById(params: any) {
  try {
    connectToDb();
    const { userId } = params;
    const user = await User.findOne({ clerkId: userId });
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function createUser(userData: CreateUserParams) {
  try {
    connectToDb();
    const newUser = await User.create(userData);
    return newUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function updateUser(data: UpdateUserParams) {
  try {
    connectToDb();
    const { clerkId, updateData, path } = data;
    await User.findOneAndUpdate({ clerkId }, updateData, { new: true });
    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function deleteUser(params: DeleteUserParams) {
  try {
    connectToDb();
    const { clerkId } = params;
    const user = await User.findOneAndDelete({ clerkId });
    if (!user) {
      throw new Error("user not found");
    } else {
      // const userQuestionIds = await Question.find({
      //   author: user._id,
      // }).distinct("_id");

      await Question.deleteMany({ author: user._id });

      const deletedUser = await User.findByIdAndDelete(user._id);
      return deletedUser;

      // TODO: dlete user answers ,comments, etc...
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}
