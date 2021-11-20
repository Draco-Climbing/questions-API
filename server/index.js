const express = require('express');
const { Questions, Answers, Photos, db, questionsAgg } = require('../database/');
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
        // console.log('results', results)
        console.log('success')
        res.send(results)
      }
    })
})

app.post('/qa/questions/', (req, res) => {
  console.log('incomming post request', req.body)
  let info = {};
    Questions.findOne().sort('-_id').exec((err, item) => {
      console.log('max', item._id)
      info = {
        _id: item._id + 1,
        product_id: req.body.product_id,
        body: req.body.body,
        date: Date.now(),
        asker_name: req.body.name,
        asker_email: req.body.email,
        helpful: 0,
        reported: false,
      }
      const document = new Questions(info)
      document.save((err, doc) => {
        if (err) {
          console.log('error', err);
        } else {
          console.log('success on saving to the DB:', doc)
        }
      })
      res.send(`done`)
    })
})

app.post('/qa/questions/:question_id/answers', (req, res) => {
  console.log('incomming post answer request', req.body, parseInt(req.params.question_id))
  let info = {};
    Answers.findOne().sort('-_id').exec((err, item) => {
      console.log('maxAnswerId', item._id)
      info = {
        _id: item._id + 1,
        question_id: parseInt(req.params.question_id),
        body: req.body.body,
        date: Date.now(),
        answerer_name: req.body.name,
        asker_email: req.body.email,
        helpfulness: 0,
        reported: false,
      }
      const document = new Answers(info)
      document.save((err, doc) => {
        if (err) {
          console.log('error', err);
        } else {
          console.log('success on saving to the DB:', doc)
        }
      })
      postPhotos(item._id + 1, req.body.photos)
      res.send(`done`)
    })
})

const postPhotos = (review_id, photos) => {
    let info = {};
    Photos.findOne().sort('-_id').exec((err, item) => {
      console.log('maxPhotoId', item._id)
      photoId = item._id
      photos.map((item, index) => {
        console.log('photoId: ', photoId + index);
        info = {
          _id: photoId + index + 1,
          answer_id: review_id,
          url: item
        }
        const document = new Photos(info)
        document.save((err, doc) => {
          if (err) {
            console.log('error', err);
          } else {
            console.log('success on saving to the DB:', doc)
          }
        })
      })
      // res.send(`done`)
    })
}

