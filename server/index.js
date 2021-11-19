const express = require('express');
const { questions, answers, photos, db } = require('../database/');
const { answersWithPhotos, questionsWithAnswers } = require('./aggregates')

let app = express();

app.listen(8000, function () {
  console.log('server running on port 8000');
})

// app.use(express.static(__dirname, ))
const pipeline = [{$lookup:{ from: "photos", localField: "_id", foreignField: "answer_id", as: "photos"}}]

app.get('/answers', (req, res) => {
  console.log('incomming answer request')
  db
    .collection('answers')
    // .find({'_id': 13})
    .aggregate(answersWithPhotos)
    // .aggregate(pipeline)
    // .limit(10)
    // .exec(
    .toArray((err, results) => {
      console.log('results', results)
      if (err) {
        PromiseRejectionEvent(console.log('error getting photos'))
      } else {
        console.log('success')
        res.send(results)
      }
    })
})

app.get('/qa/questions/', (req, res) => {
  console.log('incomming question request', req.query)
  db
    .collection('questions')
    .aggregate(questionsWithAnswers(parseInt(req.query.product_id)))
    .toArray((err, results) => {
      console.log('results', results)
      if (err) {
        PromiseRejectionEvent(console.log('error getting photos'))
      } else {
        console.log('success')
        res.send(results)
      }
    })
})