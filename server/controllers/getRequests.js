const { db } = require('../../database/');
const { answersWithPhotos, questionsWithAnswers, resultDataAgg } = require('../aggregates')

// this function will go the question results and convert the answers pulled to an objeect format
const convertAnswerArrayToObject = (results) => {
  results.map(question => {
    let result = {};
    question.answers.map(answer => {
      //answer.answer_id because we changed the name from _id to id in the aggregation
      result[answer.answer_id] = answer;
    })
    question.answers = result;
  })
  return results
}

module.exports = {
  getQuestions: function(req, res){
    db
      .collection('resultData')
      .aggregate(resultDataAgg(
        parseInt(req.query.product_id),
        req.query.page ? parseInt(req.query.page) : 1,
        req.query.count ? parseInt(req.query.count) : 5))
      .toArray((err, results) => {
        if (err) {
          console.log(err)
        } else {
          const finalResult = convertAnswerArrayToObject(results)
          res.send({
            "product_id": req.query.product_id,
            "results": finalResult,
          })
        }
      })
  },

  getQuestionsZ: function(req, res){
  // console.log('incomming question request', req.query)
  db
    .collection('questions')
    .aggregate(questionsWithAnswers(
      parseInt(req.query.product_id),
      req.query.page ? parseInt(req.query.page) : 1,
      req.query.count ? parseInt(req.query.count): 5))
    .toArray((err, results) => {
      if (err) {
        // reject(console.log('error getting photos'))
        throw err
      } else {
        // for (var doc of results) {
        //   doc.question_date = Date(doc.question_date)
        //   for (var photo of doc.answers) {
        //     photo.date_written = Date(photo.date_written)
        //   }
        // }
        // console.log('results', results)
        const finalResult = convertAnswerArrayToObject(results)
        res.send({
          "product_id": req.query.product_id,
          "results": finalResult
        })
      }
    })
  },
  
  getAnswers: function(req, res){
  // console.log('incomming answer request', req.params, req.query)
  db
    .collection('answers')
    .aggregate(answersWithPhotos(
      parseInt(req.params.question_id),
      req.query.page ? parseInt(req.query.page) : 1,
      req.query.count ? parseInt(req.query.count): 5))
    .toArray((err, results) => {
      // console.log('results', results)
      if (err) {
        console.log('error getting photos', err)
        res.status(500).send(`error on request:\n\n ${err}`)
      } else {
        console.log('success')
        const finalResult = {
          "question": req.params.question_id,
          "page": req.query.page,
          "count": req.query.count,
          "results": results}
        res.send(finalResult)
      }
    })
}

}