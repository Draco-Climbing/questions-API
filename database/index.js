const mongoose = require('mongoose');
const { Schema } = mongoose; //new
const { answersWithPhotos, questionsWithAnswers } = require('../server/aggregates')

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
let questionsSchema = new Schema({
  // _id: { type: Schema.ObjectId, auto: true },
  _id: Number,
  product_id: Number,
  body: String,
  date_written: Date,
  asker_name: String,
  asker_email: String,
  reported: Boolean,
  helpful: Number,
  // answers: {_id: {
  //     _id: Number,
  //     body: String,
  //     date_written: Date,
  //     answerer_name: String,
  //     answerer_email: String,
  //     reported: Boolean,
  //     helpful: Number,
  //     photos: [{
  //       _id: Number,
  //       url: String
  //     }]
  // }}
})

let answersSchema = new Schema({
  // _id: Number,
  question_id: Number,
  body: String,
  date_written: Date,
  answerer_name: String,
  answerer_email: String,
  reported: Boolean,
  helpful: Number,
  // photos: [{
  //   _id: Number,
  //   url: String,
  // }]
})

let photosSchema = new Schema({
  // _id: Number,
  answer_id: Number,
  url: String
})

let questions = mongoose.model('questions', questionsSchema);
let answers = mongoose.model('answers', answersSchema);
let photos = mongoose.model('photos', photosSchema);

const questionsAgg = function(prod_id) {
  questions
    questions.aggregate(questionsWithAnswers(prod_id))
    .toArray((err, res) => {
    console.log('response', response)
  })
}

module.exports.photos = photos
module.exports.answers = answers
module.exports.Questions = questions
module.exports.questionsAgg = questionsAgg
module.exports.db = db