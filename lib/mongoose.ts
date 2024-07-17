import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDb = async () => {
  mongoose.set("strictQuery", true);
  if (!process.env.MONGODB_URL) return console.log("MISSING  DB URL");

  if (isConnected) return console.log("DB CONNECTED");

  try {
    await mongoose.connect(process.env.MONGODB_URL, { dbName: "devFlow" });
    isConnected = true;
    console.log("CONNECTED");
  } catch (error) {
    console.log(error);
  }
};
