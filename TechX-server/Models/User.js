import mongoose from 'mongoose';

/*
  * User model for working with MongoDB.
  * Defines the user data structure using Data stored in the 'Users' collection.
*/

const UserSchema = new mongoose.Schema(
{
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone_number: { type: String, required: true },
    delivery_address: { type: String, required: true },
    favourites: { type: [mongoose.Schema.Types.ObjectId], required: true }
}, { collection: 'Users' });

const UserModel = mongoose.model('user', UserSchema);

export { UserModel };