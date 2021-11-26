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
    // make a new column 'id'
    { $set: { id: "$_id" } },
    // convert the date from milleseconds to ISO date
    { $set: {date: {$toDate: "$date"}}},
    //lookup the photos and bring them into here
    {
      $lookup: {
        from: "photos",
        localField: "_id",
        foreignField: "answer_id",
        pipeline: [
          { $set: { id: "$_id" } },
          { $unset: ['_id'] }
        ],
        as: "photos"
      }
    },
    //remove the email field and version and _id
    { $unset: ['answerer_email', '__v', '_id'] },
  ])
}
  
module.exports.questionsWithAnswers = (prod_id, page = 1, count = 5) => {
  return ([
    // find everything that is not reported and has the correct question id
    {
      $match: {
        $and: [
          // { reported: { $in: [false, 0] } },  //dropping the $in saved allowed for more than 1.5 requests to come in
          { reported: false },
          { product_id: prod_id }]
      },
    },
    //sort by the most recently written
    { $sort: { _id: -1 } },
    //create 'pages' by skipping over a certain amount of results
    { $skip: (count * (page - 1)) },
    //limit the number of result to a user speified number 
    { $limit: count },
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
            pipeline: [
              { $set: { id: "$_id" } },
              { $unset: ['_id'] }
            ],
            as: "photos"
          }
        },
          {
            $set: {
              date: { $toDate: "$date" },
              answer_id: "$_id",
            },
          },
          {$unset: ['_id'] }
        ],
        as: "answers"
      },
    },
    // make a new column 'question_id' which is the same as _id
    { $set: { question_id: "$_id" } },
    // convert the question date from milleseconds to ISO date
    { $set: { question_date: { $toDate: "$question_date" } } },
    //remove the email field and version and _id
    { $unset: ['asker_email', '__v', '_id'] },
  ])
}

// ([{ $match: { $and: [{ reported: false }, { product_id: prod_id }] }, }, { $set: { question_id: "$_id" } }, { $set: [{ question_date: { $toDate: "$question_date" } }, { question_id: "$_id" }] }, {
//   $lookup: {
//     from: "answers", localField: "_id", foreignField: "question_id", pipeline:
//       [{$lookup: { from: "photos", localField: "_id",foreignField: "answer_id", pipeline: [{ $set: { id: "$_id" } },],as: "photos"}},{$set: {date: { $toDate: "$date" },answer_id: "$_id"},},],as: "answers"},},{$merge: 'questions'}])