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
    it("Checking the array", done => {
      chai
        .request(server)
        .get("/ops")
        .end((err, res) => {
          expect(res.body).to.be.an('array');
          expect(res.body.length).to.not.equals(0);        
          done();
        });
    });

      it("Check get operations/:id", done => {
        chai
          .request(server)
          .get("/operations/:id").send({
        })
          .end((err, res) => {
            assert.strictEqual(res.body.id, 4);
            expect(res.body).to.have.property('name');
            expect(res.body).to.have.property('sign');
            expect(res.body.id).to.equals('1');
            done();
          });
      });
      // Please add your test cases here.
       it("Checking /operations", done => {
        chai
          .request(server)
          .get("/operations")
          .end((err, res) => {
            expect(res.body).to.be.an('array');
            expect(res.body.length).to.not.equals(0);        
            done();
          });
      });
});