import mongoose, { Document, Schema } from "mongoose";

interface IBook extends Document {
  course: string;
  title: string;
  author: string;
  publisher: string;
  year: number;
}

const BookSchema: Schema = new Schema({
  course: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  publisher: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
});

export default mongoose.model<IBook>("Book", BookSchema, "books");
