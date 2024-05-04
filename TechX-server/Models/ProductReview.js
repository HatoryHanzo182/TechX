import mongoose from 'mongoose';

/*
  * Session model for working with MongoDB.
  * Defines the session data structure using Data stored in the 'UserSessions' collection.
*/

const ProductReviewSchema = new mongoose.Schema(
{
    product_id: mongoose.Schema.Types.ObjectId,
    review_owner_id: mongoose.Schema.Types.ObjectId,
    review_owner_name: String,
    review: String,
    grade: Number,
    date: String,
    viewed_admin: Boolean
}, { collection: 'ProductReviews' })

const ProductReviewModel = mongoose.model('product_review', ProductReviewSchema);

export { ProductReviewModel };