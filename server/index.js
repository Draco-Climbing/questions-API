const express = require('express');
const { Questions, answers, photos, db, questionsAgg } = require('../database/');
const { answersWithPhotos, questionsWithAnswers, } = require('./aggregates')

let app = express();

app.listen(8000, function () {
  console.log('server running on port 8000');
})

app.use(express.json())

// app.use(express.static(__dirname, ))
const pipeline = [{$lookup:{ from: "photos", localField: "_id", foreignField: "answer_id", as: "photos"}}]

app.get('/qa/questions/:question_id/answers', (req, res) => {
  console.log('incomming answer request', req.params, req.query)
  db
    .collection('answers')
    .aggregate(answersWithPhotos(parseInt(req.params.question_id)))
    .toArray((err, results) => {
      // console.log('results', results)
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
  // questionsAgg(parseInt(req.query.product_id))
  db
    .collection('questions')
    .aggregate(questionsWithAnswers(parseInt(req.query.product_id)))
    .toArray((err, results) => {
      if (err) {
        PromiseRejectionEvent(console.log('error getting photos'))
      } else {
        for (var doc of results) {
          doc.date_written = Date(doc.date_written)
          for (var photo of doc.answers) {
            photo.date_written = Date(photo.date_written)
          }
        }
        console.log('results', results)
        console.log('success')
        res.send(results)
      }
    })
})

app.post('/qa/questions/', (req, res) => {
  console.log('incomming post request', req.body)
  let maxId = null;
  // const maxId = db.collection('questions').find().sort({ _id: -1 }).limit(1)
  // console.log('maxId', maxId)
  db
    .collection('questions')
    .aggregate([{
      $group: {
      _id: '',
      last: { $max: "$_id" }
      }
    }])
    .toArray((err, res) => {
      // console.log('response=====', res.last)
      maxId = parseInt(res.last + 1);
      const info = {
        _id: maxId,
        product_id: req.body.product_id,
        body: req.body.body,
        date: Date.now(),
        asker_name: req.body.name,
        asker_email: req.body.email,
        helpful: 0,
        reported: false,
      }
      console.log(info);
    })
  // const document = new Questions(info)
  // document.save((err, doc) => {
  //   if (err) {
  //     console.log('error', err);
  //   } else {
  //     console.log('success on saving to the DB:', doc)
  //   }
  // })
  res.send(`done - maxId=${maxId}`)
})
