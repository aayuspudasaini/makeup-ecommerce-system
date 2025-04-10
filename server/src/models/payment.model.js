const { Schema, model } = require("mongoose");

const paymentSchema = new Schema({
    order: { type: Schema.Types.ObjectId, ref: "Order", required: true },
    paymentMethod: { type: String, required: true }, // e.g., "Credit Card", "PayPal"
    paymentStatus: { type: String, required: true }, // e.g., "Completed", "Failed"
    transactionId: { type: String, required: true },
    amount: { type: Number, required: true },
    currency: { type: String, default: "NPR" },
    createdAt: { type: Date, default: Date.now },
});

const Payment = model("Payment", paymentSchema);

module.exports = Payment;