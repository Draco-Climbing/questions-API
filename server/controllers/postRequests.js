const { Questions, Answers, Photos } = require('../../database/');

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
    })
}

module.exports = {
  postQuestion: function(req, res) {
  console.log('incomming post request', req.body)
  let info = {};
    Questions.findOne().sort('-_id').exec((err, item) => {
      // console.log('max', item._id)
      info = {
        _id: item._id + 1,
        product_id: req.body.product_id,
        question_body: req.body.body,
        question_date: Date.now(),
        asker_name: req.body.name,
        question_helpfulness: 0,
        reported: false,
        asker_email: req.body.email,
      }
      const document = new Questions(info)
      document.save((err, doc) => {
        if (err) {
          console.log('error', err);
        } else {
          console.log('success on saving to the DB:', doc)
        }
      })
      res.send(`${item._id}`)
    })
  },
  
  postAnswer: function(req, res) {
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
  }
}

