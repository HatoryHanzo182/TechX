import mongoose from 'mongoose';

/*
  * Session model for working with MongoDB.
  * Defines the session data structure using Data stored in the 'UserSessions' collection.
*/

const SessionSchema = new mongoose.Schema(
{
    user_id: String,
    token: String
}, { collection: 'UserSessions' })

const SessionModel = mongoose.model('session', SessionSchema);

export {SessionModel};