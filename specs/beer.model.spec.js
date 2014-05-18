/* global QUnit */

(function(Qunit, global){
	'use strict'
	
	QUnit.test("Check Beer Model's existence",function(assert){
		assert.ok(window.beerApp, "Namespace is there");
		assert.ok(window.beerApp.Beer, "Constructor is there");

		assert.equal(typeof window.beerApp.Beer, "function" ,"This is a function");

	});

	QUnit.test("Check default Beer Model's values",function(assert){

		var beer = new window.beerApp.Beer();

		assert.equal(beer.name, "Beer" ,"default name is correct");
	    assert.equal(beer.brewery, null ,"default brewery is null");
	});

	QUnit.test("Check default Beer Model's optional values extender",function(assert){
		var options = {
			name:"My Beer",
			brewery:"blah",
			description : "some description",
			abv: 40
		};

		var beer = new window.beerApp.Beer(options);
		var toString = beer.toString();

		assert.equal(beer.name, "My Beer" ,"default name is as you've passed");
	    assert.equal(beer.brewery, "blah" ,"default brewery is as you've passed");
	    assert.equal(toString, "My Beer(some description) by blah (abv 40%)", "To string works.. and it's awesome..!");

	    assert.equal(beer.id, "2", "There's an ID.. and the ID is correct");

	});
})(window.Qunit, window);
