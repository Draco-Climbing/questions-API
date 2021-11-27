// in mongosh run with: load(/Users/mbolsen/code/sei/sdc/questions-API/database/dataSetup.js)

db.questions.aggregate([
  // find everything that is not reported and has the correct question id
  //sort by the most recently written
  { $sort: { _id: -1 } },
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
  // //remove the email field and version and _id
  // { $unset: ['asker_email', '__v', '_id'] },
  {$merge: {into: "resultData"}}
])