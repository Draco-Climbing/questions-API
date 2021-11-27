const { db } = require('../../database/');

module.exports = {
  helpfulAnswer: function(req, res){
  console.log('PUT helpful', parseInt(req.params.question_id))
  db
    .collection('questions')
    .updateOne(
      { _id: parseInt(req.params.question_id) },
      { $inc: {"helpful": 1 }}
    )
  res.send('done')
  },
  
  reportQuestion: function(req, res){
  console.log('PUT question report', parseInt(req.params.question_id))
  db
    .collection('questions')
    .updateOne(
      { _id: parseInt(req.params.question_id) },
      { $set: {"reported": true }}
    )
  res.send('done')
  },
  
  reportAnswer: function(req, res) {
  console.log('PUT answer report', parseInt(req.params.answer_id))
  db
    .collection('answers')
    .updateOne(
      { _id: parseInt(req.params.answer_id) },
      { $set: {"reported": true }}
    )
  res.send('done')
}
}