const { Schema, model } = require("mongoose");

const flashcardSchema = new Schema({
  cardName: {type: String, required: [true, 'Esta tarjeta necesita un nombre']},
  description: {type: String, required: [true, 'Añade una descripción a la tarjeta']},
  originalLang: {type: String, required: true, enum:["English", "Spanish", "French", "German", "Portuguese", "Italian"]},
  translations: {type: [{_id:false,
    lang: {type: String, required: true, enum:["English", "Spanish", "French", "German", "Portuguese", "Italian"]},
    translatedName: {type:String, required: true},
    translatedDescription: {type:String, required: true}
    }],
    required: true
  },
  imageUrl: {type: String, default: "https://img.freepik.com/vector-gratis/ilustracion-icono-galeria_53876-27002.jpg"},
  owner: {type: Schema.Types.ObjectId, ref: "User"}
});

const Flashcard = model("Flashcard", flashcardSchema);

module.exports = Flashcard;