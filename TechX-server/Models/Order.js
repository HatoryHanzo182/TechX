import mongoose from 'mongoose';

/*
  * Order model for working with MongoDB.
  * Defines the Order data structure using Data stored in the 'Order' collection.
*/

const OrderSchema = new mongoose.Schema(
{
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  email: String,
  phone: String,
  city: String,
  delivery_adress: String,
  payment_state: String,
  sum: Number,
  products_ordered: [mongoose.Schema.Types.ObjectId],
  user_id: mongoose.Schema.Types.ObjectId,
  date_registration: String,
  status: String
}, { collection:  'Orders' })

const OrderModel = mongoose.model('order', OrderSchema);

export {OrderModel};