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
    // Sample test case given to test / endpoint. 
    it("Returns the default welcome message", done => {
      chai
        .request(server)
        .get("/")
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.status).to.equals("success");
          assert.strictEqual(res.body.message, "Welcome!");
          done();
        });
    });

    // Please add your test cases here.
    it("Checking the array", done => {
      chai
        .request(server)
        .get("/operations")
        .end((err, res) => {
          expect(res.body).to.be.an('array');
          expect(res.body.length).to.not.equals(0);        
          done();
        });
    });
    it("Check new operation to the ops list", done => {
      chai
        .request(server)
        .post("/operations").send({
          name: "modulus",
          sign: "%"
      })
        .end((err, res) => {
          assert.strictEqual(res.body.id, 4);
          expect(res.body).to.have.property('name');
          expect(res.body).to.have.property('sign');
          expect(res.body.name).to.equals('modulus');
          expect(res.body.sign).to.equals('%');
          done();
        });
    });
    it("Checking the addition", done => {
      chai
        .request(server)
        .post("/add").send({
         num1: 5,
         num2: 5
      })
        .end((err, res) => {
          console.log(res.body);
          expect(res.body.result).to.equals(10);  
          done();
        });
    });
    it("Checking the addition (negative case)", done => {
      chai
        .request(server)
        .post("/add").send({
         num1: 5,
         num2: "string"
      })
        .end((err, res) => {
          console.log(res.body);
          expect(res).to.have.status(405);  
          done();
        });
    });
    it("Checking the division", done => {
      chai
        .request(server)
        .post("/divide").send({
         num1: 5,
         num2: 1
      })
        .end((err, res) => {
          console.log(res.body);
          expect(res.body.result).to.equals(5);  
          done();
        });
    });
    it("Checking the division (negative case)", done => {
      chai
        .request(server)
        .post("/divide").send({
         num1: 5,
         num2: 0
      })
        .end((err, res) => {
          console.log(res.status);
          expect(res).to.have.status(405);  
          done();
        });
    });
  });