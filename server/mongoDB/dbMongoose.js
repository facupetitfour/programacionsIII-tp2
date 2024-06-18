import mongoose from "mongoose";
const MONGO_URI = process.env.MONGO_URI;

export const connectdb = async () => {
  mongoose
    .connect(MONGO_URI)
    .then((db) => console.log("Data base is connected"))
    .catch((error) => console.log(error));
};
