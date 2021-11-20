var { expect, assert } = require('chai');
var axios = require('axios');

describe('Server Testing', () => {
  describe('QUESTIONS - GET request', () => {
    it('Get should response with a 200 status code', async () => {
      const prod_id = 13;
      let statusCode = null;
      await axios
        .get(`http://localhost:8000/qa/questions?product_id=${prod_id}`)
        .then((res) => {
          statusCode = res.status;
        })
        .catch(err => console.log('error', err));
      expect(statusCode).to.equal(200);
    });

    it('should respond with an object \n\tand that object has keys product_id and results', async () => {
      const prod_id = 13;
      let response;
      await axios
        .get(`http://localhost:8000/qa/questions?product_id=${prod_id}`)
        .then((res) => {
          response = res.data
        })
        .catch(err => console.log('error', err));
      //need to change to an object
      // expect(response).to.be.an('array'); 
    });
  })

  describe('ANSWERS - GET request', () => {
    it('Get should response with a 200 status code', async () => {
      const question_id = 62;
      const prod_id = 13;
      const url = `http://localhost:8000/qa/questions/${question_id}/answers?product_id=${prod_id}`
      const response = await axios.get(url)

      expect(response.status).to.equal(200);
    });

    it('should respond with an object \n\tand that object has keys product_id and results', async () => {
      const question_id = 62;
      const prod_id = 13;
      const url = `http://localhost:8000/qa/questions/${question_id}/answers?product_id=${prod_id}`
      const response = await axios.get(url)

      //need to change to an object
      expect(response.data).to.be.an('array');
    });
  })

  //POST Requests x 2

  //PUT requests x 3

})
  