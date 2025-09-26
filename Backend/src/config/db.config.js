// this is data base configuration file
// import { MongoClient, ServerApiVersion } from "mongodb";
// import "dotenv/config";
// const client = new MongoClient(process.env.MONGODB_URI, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });

import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
