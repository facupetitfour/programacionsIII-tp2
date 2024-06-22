import mongoose from "mongoose";
import "dotenv/config"

const MONGO_URI = process.env.MONGO_URI;

export const connectdb = async () => {
  mongoose
    .connect(MONGO_URI)
    .then((db) => console.log("Data base is connected"))
    .catch((error) => console.log("Error to connect DB:",error.message));
};
