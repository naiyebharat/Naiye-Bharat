import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  // Client Intake Form Telemetry Data
  clientName: { type: String },
  clientAge: { type: Number },
  email: { type: String },
  phoneNumber: { type: String },
  specialty: { type: String },
  language: { type: String },
  issueDescription: { type: String },
  sessionCost: { type: Number, default: 0 },
  paymentStatus: { type: String, default: "pending" },
  expiresAt: { type: Date },

  // isVerified = true → payment confirmed → TTL won't apply
  // isVerified = false (default) → payment pending → auto-deleted after 1 hour
  isVerified: { type: Boolean, default: false },

  // expireAt is set to now + 1hr on order creation.
  // If isVerified stays false, MongoDB TTL deletes it automatically.
  // On payment success, we $unset this field so the document is never deleted.
  expireAt: { type: Date },

  // Booking & Razorpay Gateway Details
  userId: { type: String },
  expertId: { type: mongoose.Schema.Types.ObjectId, ref: "Advocate" },
  amount: { type: Number },
  currency: { type: String, default: "INR" },
  razorpayOrderId: { type: String, unique: true, sparse: true },
  razorpayPaymentId: { type: String },
  status: {
    type: String,
    enum: ["pending", "created", "paid", "failed"],
    default: "pending"
  }
}, { timestamps: true });

// ✅ Correct Mongoose TTL Index syntax
// expireAfterSeconds: 0 means "delete the document AT the datetime stored in expireAt"
OrderSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

// Force delete compiled model in development to prevent Next.js hot-reload caching old schema
if (mongoose.models.Order) {
  delete mongoose.models.Order;
}

const Order = mongoose.model("Order", OrderSchema);
export default Order;