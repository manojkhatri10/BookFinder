import mongoose, { Document, Schema } from "mongoose";

// Define the Book schema
const BookSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String, required: true },
  averageRating: { type: Number, default: 0 }, // Store the average rating
  ratings: [{ type: Number }], // Store individual ratings
});

// Create the Book model
const Book = mongoose.models.Book || mongoose.model("Book", BookSchema);

export default Book;
