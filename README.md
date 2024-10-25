# GengoFlip

## [See the App!](https://gengoflip.netlify.app/)

## Description

Our platform allows users to register, create, and manage their own sets of flashcards to practice vocabulary in a personalized way. Users can review their flashcards and improve their learning interactively.
#### [Client Repo here](https://github.com/David-Carballo/gengoflip-client)
#### [Server Repo here](https://github.com/David-Carballo/gengoflip-server)

## Backlog Functionalities

- Pomodoro Timer
- Battle users
- Admin profile

## Technologies used

HTML
CSS
Javascript
React
axios
React Context
Cloudinary
React Spinners
Express
NodeJS
MongoDB

# Server Structure

## Models

User model

```javascript
{
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {type: String, required: [true, 'Password is required.']},
    username: {type: String, unique: true, required: [true, 'Username is required']},
    firstName: {type: String, default: ""},
    lastName: {type: String, default: ""},
    profileImg: {type: String, default: 'https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg'},
    deckLibrary: {type: [{_id:false,
      deckId: {type: Schema.Types.ObjectId, ref: "Deck"},
      passedFlashcards: {type: Number, default: 0},
      previousLesson: {type: Date, default: null}
    }]}
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
```

Deck model

```javascript
 {
  deckName: {type: String, required:[true, 'El nombre es obligatorio']},
  description: {type: String},
  tags: {type: [String]},
  languages: {type: [String], enum:["English", "Spanish", "French", "German", "Portuguese", "Italian"], required: [true, 'Es necesario seleccionar los lenguajes que soporta']},
  savedCount: {type: Number, default: 0},
  imageUrl: {type: String, default: "https://img.freepik.com/vector-gratis/ilustracion-icono-galeria_53876-27002.jpg"},
  flashcards: {type: [Schema.Types.ObjectId], ref: "Flashcard"},
  owner: {type: Schema.Types.ObjectId, ref: "User"}
}
```

Flashcard model

```javascript
 {
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
}
```

## API Endpoints (backend routes)

| HTTP Method | URL                         | Request Body                 | Success status | Error Status | Description                                                    |
| ----------- | --------------------------- | ---------------------------- | -------------- | ------------ | -------------------------------------------------------------- |
| POST        | `/auth/signup`              | {name, email, password}      | 201            | 400          | Registers the user in the Database                             |
| POST        | `/auth/login`               | {username, password}         | 200            | 400          | Validates credentials, creates and sends Token                 |
| GET         | `/auth/verify`              |                              | 200            | 401          | Verifies the user Token                                        |
| GET         | `/decks`                     |                              | 200            | 400          |                    |
| GET        | `/decks/:deckId`              |                               | 201            | 400          |                                    |
| POST         | `/decks/`                   |                              | 200            | 400, 401     |                                         |
| PUT         | `/decks/:deckId`             |                              | 200            | 400, 401     |                                             |
| DELETE      | `/decks/:deckId`             |                              | 200            | 401          |                                           |
| GET       | `/flashcards/:flashcardId`          |                              | 200            | 401          |                                         |
| POST         | `/flashcards/`                  |                              | 200            | 401          |                                    |
| PATCH         | `/flashcards/many`                  |                              | 200            | 400, 401     |                                          |
| PUT         | `/flashcards/:flashcardId`                  |                              | 200            | 401          |                                |
| DELETE         | `/flashcards/:flashcardId`           |                              | 200            | 401          |                                      |
  
## Links

### Collaborators

[David Carballo](https://github.com/David-Carballo/)

### Project

[Repository Link Client](https://github.com/David-Carballo/gengoflip-client)

[Repository Link Server](https://github.com/David-Carballo/gengoflip-server)

[Deploy Link](https://gengoflip.netlify.app/)

### Slides

[Slides Link](https://docs.google.com/presentation/d/1zVwlddOuFC0Ekk4A7Tps7LfN89IoGSYdyg8edy683lg/edit?usp=sharing)
