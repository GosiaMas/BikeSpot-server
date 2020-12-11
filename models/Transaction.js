const { Schema, model } = require("mongoose");
const ObjectId = Schema.Types.ObjectId;

const transactionSchema = new Schema({
  transUser: [{ type: Schema.Types.ObjectId, ref: "User" }],
  transSpot: [{ type: Schema.Types.ObjectId, ref: "Spot" }],
  date: { type: Date, default: new Date() },
  ammount: Number,
});

const Transaction = model("Transaction", transactionSchema);

module.exports = Transaction;
