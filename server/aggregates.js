module.exports.aggregates = {
  answersWithPhotos: [{
    $lookup: {
      from: "photos", localField: "_id", foreignField: "answer_id", as: "photos"
    }
  }]
}