import mongoose from 'mongoose';

/*
  * Phone model for working with MongoDB.
  * Defines the phone data structure using Data stored in the 'Phones' collection.
*/

const PhoneSchema = new mongoose.Schema(
{
    company: String,
    series: String,
    screen_diagonal: String
}, { collection: 'Phones' })

const PhoneModel = mongoose.model('phone', PhoneSchema);

export {PhoneModel};