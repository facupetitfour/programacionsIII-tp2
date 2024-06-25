import { Schema, model } from "mongoose";

const productsSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
    },
    description: {
      type: String,
      unique: true,
    },
    price: {
      type: String,
      required: true,
    },
    img:{
      type: String,
      required: false
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Products", productsSchema);
