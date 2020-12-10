const { Schema, model } = require("mongoose");
const ObjectId = Schema.Types.ObjectId;

const spotSchema = new Schema({
  address: {
    type: String,
    required: true,
  },
  longitude: Number,
  latitude: Number,
  vacantSpaces: 100,
  userBooking: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

const Spot = model("Session", sessionSchema);

module.exports = Spot;
