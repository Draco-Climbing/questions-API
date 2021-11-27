const express = require('express');
// const { Questions, Answers, Photos, db, resultdata } = require('../database/');
// const { answersWithPhotos, questionsWithAnswers, resultDataAgg } = require('./aggregates')
const controller = require('./controllers');

let app = express();

app.use(express.json())
app.listen(8000, function () {
  console.log('server running on port 8000');
})

app.get('/qa/questions/', controller.getControllers.getQuestions)
app.get('/qa/z/', controller.getControllers.getQuestionsZ)
app.get('/qa/questions/:question_id/answers', controller.getControllers.getAnswers)

app.put('/qa/questions/:question_id/helpful', controller.putControllers.helpfulAnswer)
app.put('/qa/questions/:question_id/report', controller.putControllers.reportQuestion)
app.put('/qa/answers/:answer_id/report', controller.putControllers.reportAnswer)

app.post('/qa/questions/', controller.postControllers.postQuestion)
app.post('/qa/questions/:question_id/answers', controller.postControllers.postAnswer)



// // this function will go the question results and convert the answers pulled to an objeect format
// const convertAnswerArrayToObject = (results) => {
//   results.map(question => {
//     let result = {};
//     question.answers.map(answer => {
//       //answer.answer_id because we changed the name from _id to id in the aggregation
//       result[answer.answer_id] = answer;
//     })
//     question.answers = result;
//   })
//   return results
// }

  
// app.get('/qa/questions/', (req, res) => {
//   db
//     .collection('resultData')
//     .aggregate(resultDataAgg(
//       parseInt(req.query.product_id),
//       req.query.page ? parseInt(req.query.page) : 1,
//       req.query.count ? parseInt(req.query.count): 5))
//     .toArray((err,results) => {
//       if (err) {
//         console.log(err)
//     } else {
//       const finalResult = convertAnswerArrayToObject(results)
//       res.send({
//           "product_id": req.query.product_id,
//           "results": finalResult,
//         })
//     }
//   })
// })

// app.get('/qa/z/', (req, res) => {
//   // console.log('incomming question request', req.query)
//   db
//     .collection('questions')
//     .aggregate(questionsWithAnswers(
//       parseInt(req.query.product_id),
//       req.query.page ? parseInt(req.query.page) : 1,
//       req.query.count ? parseInt(req.query.count): 5))
//     .toArray((err, results) => {
//       if (err) {
//         // reject(console.log('error getting photos'))
//         throw err
//       } else {
//         // for (var doc of results) {
//         //   doc.question_date = Date(doc.question_date)
//         //   for (var photo of doc.answers) {
//         //     photo.date_written = Date(photo.date_written)
//         //   }
//         // }
//         // console.log('results', results)
//         const finalResult = convertAnswerArrayToObject(results)
//         res.send({
//           "product_id": req.query.product_id,
//           "results": finalResult
//         })
//       }
//     })
// })

// app.get('/qa/questions/:question_id/answers', (req, res) => {
//   // console.log('incomming answer request', req.params, req.query)
//   db
//     .collection('answers')
//     .aggregate(answersWithPhotos(
//       parseInt(req.params.question_id),
//       req.query.page ? parseInt(req.query.page) : 1,
//       req.query.count ? parseInt(req.query.count): 5))
//     .toArray((err, results) => {
//       // console.log('results', results)
//       if (err) {
//         console.log('error getting photos', err)
//         res.status(500).send(`error on request:\n\n ${err}`)
//       } else {
//         console.log('success')
//         const finalResult = {
//           "question": req.params.question_id,
//           "page": req.query.page,
//           "count": req.query.count,
//           "results": results}
//         res.send(finalResult)
//       }
//     })
// })


// app.post('/qa/questions/', (req, res) => {
//   console.log('incomming post request', req.body)
//   let info = {};
//     Questions.findOne().sort('-_id').exec((err, item) => {
//       // console.log('max', item._id)
//       info = {
//         _id: item._id + 1,
//         product_id: req.body.product_id,
//         question_body: req.body.body,
//         question_date: Date.now(),
//         asker_name: req.body.name,
//         question_helpfulness: 0,
//         reported: false,
//         asker_email: req.body.email,
//       }
//       const document = new Questions(info)
//       document.save((err, doc) => {
//         if (err) {
//           console.log('error', err);
//         } else {
//           console.log('success on saving to the DB:', doc)
//         }
//       })
//       res.send(`${item._id}`)
//     })
// })

// app.post('/qa/questions/:question_id/answers', (req, res) => {
//   console.log('incomming post answer request', req.body, parseInt(req.params.question_id))
//   let info = {};
//     Answers.findOne().sort('-_id').exec((err, item) => {
//       console.log('maxAnswerId', item._id)
//       info = {
//         _id: item._id + 1,
//         question_id: parseInt(req.params.question_id),
//         body: req.body.body,
//         date: Date.now(),
//         answerer_name: req.body.name,
//         asker_email: req.body.email,
//         helpfulness: 0,
//         reported: false,
//       }
//       const document = new Answers(info)
//       document.save((err, doc) => {
//         if (err) {
//           console.log('error', err);
//         } else {
//           console.log('success on saving to the DB:', doc)
//         }
//       })
//       postPhotos(item._id + 1, req.body.photos)
//       res.send(`done`)
//     })
// })

// const postPhotos = (review_id, photos) => {
//     let info = {};
//     Photos.findOne().sort('-_id').exec((err, item) => {
//       console.log('maxPhotoId', item._id)
//       photoId = item._id
//       photos.map((item, index) => {
//         console.log('photoId: ', photoId + index);
//         info = {
//           _id: photoId + index + 1,
//           answer_id: review_id,
//           url: item
//         }
//         const document = new Photos(info)
//         document.save((err, doc) => {
//           if (err) {
//             console.log('error', err);
//           } else {
//             console.log('success on saving to the DB:', doc)
//           }
//         })
//       })
//     })
// }

// app.put('/qa/questions/:question_id/helpful', (req, res) => {
//   console.log('PUT helpful', parseInt(req.params.question_id))
//   db
//     .collection('questions')
//     .updateOne(
//       { _id: parseInt(req.params.question_id) },
//       { $inc: {"helpful": 1 }}
//     )
//   res.send('done')
// })

// app.put('/qa/questions/:question_id/report', (req, res) => {
//   console.log('PUT question report', parseInt(req.params.question_id))
//   db
//     .collection('questions')
//     .updateOne(
//       { _id: parseInt(req.params.question_id) },
//       { $set: {"reported": true }}
//     )
//   res.send('done')
// })

// app.put('/qa/answers/:answer_id/report', (req, res) => {
//   console.log('PUT answer report', parseInt(req.params.answer_id))
//   db
//     .collection('answers')
//     .updateOne(
//       { _id: parseInt(req.params.answer_id) },
//       { $set: {"reported": true }}
//     )
//   res.send('done')
// })