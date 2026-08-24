const { expect } = require("chai");
const request = require("request");
const { add } = require("../server");

const baseUrl = "http://localhost:3000";

// REST API tests
describe("Calculator API Tests", function () {

  it("should return the correct sum for valid numbers", function (done) {
    request.get(`${baseUrl}/add?num_a=10&num_b=5`, function (error, response, body) {
      expect(response.statusCode).to.equal(200);
      expect(body).to.include("15");
      done();
    });
  });

  it("should return 400 for invalid input", function (done) {
    request.get(`${baseUrl}/add?num_a=hello&num_b=world`, function (error, response) {
      expect(response.statusCode).to.equal(400);
      done();
    });
  });

  it("should handle zero as an edge case", function (done) {
    request.get(`${baseUrl}/add?num_a=0&num_b=0`, function (error, response, body) {
      expect(response.statusCode).to.equal(200);
      expect(body).to.include("0");
      done();
    });
  });

});


// Calculation function tests
describe("Addition Function Tests", function () {

  it("should add two positive numbers", function () {
    expect(add(2, 3)).to.equal(5);
  });

  it("should add negative numbers", function () {
    expect(add(-2, -3)).to.equal(-5);
  });

  it("should return null for invalid values", function () {
    expect(add("hello", "world")).to.equal(null);
  });

});