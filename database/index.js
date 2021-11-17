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
  _.id: Number,
  product_id: Number,
  body: Text,
  date_written: Date,
  asker_name: Text,
  asker_email: Text,
  reported: Boolean,
  helpful:  Number
  //insert schema
})

let answersSchema = mongoose.Schema({
  _.id: Number,
  question_id: Number,
  body: Text,
  date_written: Date,
  answerer_name: Text,
  answerer_email: Text,
  reported: Boolean,
  helpful:  Number
  //insert schema
})

let photosSchema = mongoose.Schema({
  _.id: Number,
  answer_id: Number,
  url: Text
})

let QuestionRepo = mongoose.model('QuestionsRepo', questionsSchema);
let AnswersRepo = mongoose.model('AnswersRepo', answersSchema);
let PhotosRepo = mongoose.model('PhotosRepo', photosSchema);

