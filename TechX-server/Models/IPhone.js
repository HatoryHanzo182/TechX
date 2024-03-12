import mongoose from 'mongoose';

/*
  * Phone model for working with MongoDB.
  * Defines the phone data structure using Data stored in the 'Phones' collection.
*/

const IPhoneSchema = new mongoose.Schema(
{
  _id: String,
  category: String,
  brand: String,
  model: String,
  price: Number,
  color: String,
  memory: String,
  displaySize: String,
  description: String,
  os: String,
  camera: String,
  processor: String,
  images: [String]
}, { collection:  'Iphone' })

const IPhoneModel = mongoose.model('phone', IPhoneSchema);

export {IPhoneModel};