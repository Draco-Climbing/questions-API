const { Model } = require("mongoose")

module.exports.answersWithPhotos = (q_id, page = 1, count = 5) => {
  return ([
    // find everything that is not reported and has the correct question id
    //https://docs.mongodb.com/manual/reference/operator/aggregation/#boolean-expression-operators
    {
      $match: {
        $and: [
          { reported: { $in: [false, 0] } },
          { question_id: q_id }]
      },
    },
    { $sort: { date_written: 1 } },
    //create 'pages' by skipping over a certain amount of results
    { $skip: (count * (page - 1)) },
    //limit the number of result to a user speified number 
    { $limit: count },
    //remove the email field and version
    {$unset: ['answerer_email', '__v']},
    //lookup the photos and bring them into here
    {
      $lookup: {
        from: "photos",
        localField: "_id",
        foreignField: "answer_id",
        as: "photos"
      }
    }
  ])
}
  
module.exports.questionsWithAnswers = (prod_id, page = 1, count = 5) => {
  return ([
    // find everything that is not reported and has the correct question id
    {
      $match: {
        $and: [
          { reported: { $in: [false, 0] } },
          { product_id: prod_id }]
      },
    },
    //sort by the most recently written
    { $sort: { date_written: 1 } },
    //create 'pages' by skipping over a certain amount of results
    { $skip: (count * (page - 1)) },
    //limit the number of result to a user speified number 
    { $limit: count },
    //remove the email field and version
    {$unset: ['asker_email', '__v']},
    //lookup the answers and bring them into here
    {
      $lookup: {
        from: "answers",
        localField: "_id",
        foreignField: "question_id",
        //this pipeline will bring in the photos to each answer
        pipeline: [{
          $lookup: {
            from: "photos",
            localField: "_id",
            foreignField: "answer_id",
            as: "photos"
          }
        }],
        as: "answers"
      },
    },
  ])
}