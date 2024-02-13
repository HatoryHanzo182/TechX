import mongoose from 'mongoose';

/*
  * Session model for working with MongoDB.
  * Defines the session data structure using Data stored in the 'UserSessions' collection.
*/

const SessionSchema = new mongoose.Schema(
{
    token: { type: String, required: true },
    user: { type: String, required: true},
    date: { type: Date, required: true }
}, { collection: 'UserSessions' });

const SessionModel = mongoose.model('session', SessionSchema);

export { SessionModel };