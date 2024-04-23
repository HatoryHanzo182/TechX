import mongoose from 'mongoose';

/*
  * Console model for working with MongoDB.
  * Defines the console data structure using Data stored in the 'Console' collection.
*/

const ConsoleSchema = new mongoose.Schema(
{
  _id: mongoose.Schema.Types.ObjectId,
  category: String,
  brand: String,
  model: String,
  price: Number,
  color: [String],
  memory: String,
  description: String,
  os: String,
  processor: String,
  RAM: String,
  CPU: String,
  GPU: String,
  images: [String],
  incarousel: Boolean
}, { collection:  'Console' })

const ConsoleModel = mongoose.model('console', ConsoleSchema);

export { ConsoleModel };