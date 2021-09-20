const { Schema, model } = require("mongoose");

const artistSchema = new Schema({
  name: String,
  genre: {
    type: String,
    enum: ["Metal", "Rock", "Salsa", "Cumbias", "Corridos", "Pop"],
  },
  country: String,
  albums: [{ type: Schema.Types.ObjectId, ref: "Album" }],
});

module.exports = model("Artist", artistSchema);
