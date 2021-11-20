const { Model } = require("mongoose")

module.exports.answersWithPhotos = (q_id) => {
  return ([
    { $match: { question_id: q_id } },
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
  
module.exports.questionsWithAnswers = (prod_id) => {
  return ([
    { $match: { product_id: prod_id } },
    { $sort: { question_id: 1 } },
    { $limit: 15 },
    {
      $lookup: {
        from: "answers",
        localField: "_id",
        foreignField: "question_id",
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