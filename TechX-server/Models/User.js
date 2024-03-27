import mongoose from 'mongoose';

/*
  * User model for working with MongoDB.
  * Defines the user data structure using Data stored in the 'Users' collection.
*/

const UserSchema = new mongoose.Schema(
{
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
}, { collection: 'Users' });

const UserModel = mongoose.model('user', UserSchema);

export { UserModel };