const mongoose = require('mongoose');

//Connect to Mongo database
//connect to mongo on localhost
mongoose.connect('mongodb://localhost/sdc-questions', { useNewUrlParser: true, useUnifiedTopology: true })
//connect to mongo on heroku (not set up, need to set up for aws)
// mongoose.connect(process.env.MONGODB_URI);
var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
  console.log('MongoDB connection successful');
})

//SCHEMA for Database
let questionsSchema = mongoose.Schema({
  _id: Number,
  product_id: Number,
  body: String,
  date_written: Date,
  asker_name: String,
  asker_email: String,
  reported: Boolean,
  helpful: Number,
  answers: {_id: {
      _id: Number,
      body: String,
      date_written: Date,
      answerer_name: String,
      answerer_email: String,
      reported: Boolean,
      helpful: Number,
      photos: [{
        _id: Number,
        url: String
      }]
  }}
})

let answersSchema = mongoose.Schema({
  _id: Number,
  question_id: Number,
  body: String,
  date_written: Date,
  answerer_name: String,
  answerer_email: String,
  reported: Boolean,
  helpful: Number,
  photos: [{
    _id: Number,
    url: String,
  }]
})

let photosSchema = mongoose.Schema({
  _id: Number,
  answer_id: Number,
  url: String
})

let questions = mongoose.model('questions', questionsSchema);
let answers = mongoose.model('answers', answersSchema);
let photos = mongoose.model('photos', photosSchema);

module.exports.photos = photos
module.exports.answers = answers
module.exports.questions = questions
module.exports.db = db