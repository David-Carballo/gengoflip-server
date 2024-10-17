const { Schema, model} = require("mongoose");


const deckSchema = new Schema({
  deckName: {type: String, required:[true, 'El nombre es obligatorio']},
  description: {type: String},
  tags: {type: [String]},
  languages: {type: [String], enum:["English", "Spanish", "French", "German", "Portuguese", "Italian"], required: [true, 'Es necesario seleccionar los lenguajes que soporta']},
  savedCount: {type: Number, default: 0},
  imageUrl: {type: String, default: "https://img.freepik.com/vector-gratis/ilustracion-icono-galeria_53876-27002.jpg"},
  // flashcards: {type: [Schema.Types.ObjectId], ref: "Flashcard"},
  owner: {type: Schema.Types.ObjectId, ref: "User"}
});

const Deck = model("Deck", deckSchema);

module.exports = Deck; 