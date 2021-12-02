# mongoimport -d sdc-questions -c answers --headerline --columnsHaveTypes --type csv /seed/answers.csv
# mongoimport -d sdc-questions -c questions --headerline --columnsHaveTypes --type csv /seed/questions.csv
# mongoimport -d sdc-questions -c photos --headerline --columnsHaveTypes --type csv /seed/answers_photos.csv


# echo "--------------Creating Indexes-----------"
# mongosh sdc-questions --eval "db.photos.createIndex({answer_id: 1})"
# mongosh sdc-questions --eval "db.answers.createIndexes([{_id: 1},{question_id: 1}])"
# # mongosh sdc --eval "db.answers.ensureIndex()"
# mongosh sdc-questions --eval "db.questions.createIndexes([{_id: 1},{product_id: 1}])"
# # mongosh sdc --eval "db.questions.ensureIndex({product_id: 1})"

# echo "--------------Load resultData-----------"
# mongosh sdc-questions --eval "load('/seed/dataSetup.js')"  #not sure if we need quotes around '/seed.....js'
# mongosh sdc-questions --eval "db.resultData.createIndex({product_id: 1})"
# echo "--------------Finished creating resultData ----- Create resultData product_id Index-----------"
echo "--------------Finished!!!-----------"



# echo "--------------Index photo answer_id-----------"
# echo "--------------Index answer _id-----------"
# echo "--------------Index answer question_id-----------"
# echo "--------------Index questions _id-----------"
# echo "--------------Index questions product_id-----------"