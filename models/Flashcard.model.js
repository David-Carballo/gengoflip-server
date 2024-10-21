const { Schema, model } = require("mongoose");

const flashcardSchema = new Schema({
  cardName: {type: String, required: [true, 'Esta tarjeta necesita un nombre']},
  description: {type: String},
  originalLang: {type: String, required: true, enum:["English", "Spanish", "French", "German", "Portuguese", "Italian"]},
  translations: {type: [{_id:false,
    lang: {type: String, required: true, enum:["English", "Spanish", "French", "German", "Portuguese", "Italian"]},
    translatedName: {type:String, required: true},
    translatedDescription: {type:String}
    }],
    required: true
  },
  imageUrl: {type: String},
  owner: {type: Schema.Types.ObjectId, ref: "User", required: true}
}); 

const Flashcard = model("Flashcard", flashcardSchema);

module.exports = Flashcard;