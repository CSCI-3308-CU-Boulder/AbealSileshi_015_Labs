// Imports the server.js file to be tested.
let server = require("../server");
//Assertion (Test Driven Development) and Should, Expect(Behaviour driven development) library
let chai = require("chai");
// Chai HTTP provides an interface for live integration testing of the API's.
let chaiHttp = require("chai-http");
chai.should();
chai.use(chaiHttp); 
const { expect } = chai;
var assert = chai.assert;




describe("Server!", () => {
    it("Checking the review", done => {
      chai
        .request(server)
        .get("/filter")
        .end((err, res) => {
          expect(res.body.length).to.not.equals(0);
          done();
        });
    });
    it("Checking the title of our movie", done => {
      chai
        .request(server)
        .get("/get_feed")
        .end((err, res) => {
          expect(res.body).to.not.be.an('undefined');
          expect(res.body.length).to.not.equals(0);        
          done();
        });
    });
  });