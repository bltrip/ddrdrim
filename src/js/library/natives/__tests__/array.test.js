import { expect } from "chai";
import { numberToArrayLength } from "../array";

describe("Number to array length", function() {
	it("return an empty array if 0 passed in", function(){
    var array = numberToArrayLength(0);
    expect(array.length).to.equal(0);
  });
	it("return an array with a length of 1", function(){
    var array = numberToArrayLength(1);
    expect(array.length).to.equal(1);
  });
	it("values in array are offset by specified number", function(){
    var array = numberToArrayLength(3,1);
    expect(array).to.deep.equal([1,2,3]);
  });
});