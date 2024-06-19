import mongoose from "mongoose";
const MONGO_URI = process.env.MONGO_URI;

export const connectdb = async () => {
  mongoose
    .connect('mongodb://localhost:27017/tp2Programacion')
    .then((db) => console.log("Data base is connected"))
    .catch((error) => console.log(error));
};
