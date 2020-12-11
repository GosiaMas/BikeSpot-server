const { Schema, model } = require("mongoose");
const ObjectId = Schema.Types.ObjectId;

const spotSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  longitude: Number,
  latitude: Number,
  vacantSpaces: Number,
  userBooking: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

const Spot = model("Spot", spotSchema);

module.exports = Spot;
