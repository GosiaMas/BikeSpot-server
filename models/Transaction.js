const { Schema, model } = require("mongoose");
const ObjectId = Schema.Types.ObjectId;

const transactionSchema = new Schema({
  address: {
    type: String,
    required: true,
  },
  longitude: Number,
  latitude: Number,
  vacantSpaces: 100,
  userBooking: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

const Session = model("Session", sessionSchema);

module.exports = Session;
