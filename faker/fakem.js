var Faker = require('faker');
var util = require('util');



var LISTS = 12;
var ASSETS = 20;

var USERS = 20;

var AVG_COMMENTS = 10;
var AVG_ACTIONS = 6;


var COMMENTS = USERS * AVG_COMMENTS;

var STATUSES = 3;

var userKey = 1;
var commentKey = 1;

function fakeAction() {

	var action = {
		type: 'recommend',
		userId: Math.floor(Math.random() * USERS + 1),
		date: Faker.Date.past(100)
	};

	return action;

}

function fakeUser() {


	var user = {
		id: userKey++,
		displayName: Faker.Internet.userName(),
		name: Faker.Name.findName(),
		avatar: Faker.Image.avatar(),
		raw: Faker.Helpers.userCard(),
		actions: []
	};

	for (var i = 0; i < AVG_ACTIONS; i++) {
		user.actions.push(fakeAction());
	}

	return user;

}

function fakeComment() {

	var comment = {
		id: commentKey++,
		userId: Math.floor(Math.random() * USERS + 1),
		body: Faker.Lorem.paragraphs(),
		parentId: 0,
		assetId: Math.floor(Math.random() * ASSETS + 1),
		status: Math.floor(Math.random() * STATUSES + 1),
		approvedDate: Faker.Date.past(100),
		createdDate: Faker.Date.past(100),
		updatedDate: Faker.Date.past(100),
		actions: [],
		stats: {
			a: Faker.Lorem.words(),
			b: Faker.Lorem.sentence(),
			c: Math.random() * 100
		}
	};

	return comment;

}

function fakeAsset() {

	return {
		url: Faker.Internet.domainName(),
		headline: Faker.Lorem.sentence()
	};

}

function fakeList() {

	var list = [];

	for (var i = 0; i < 10; i++) {

		var ran = Math.floor(Math.random() * USERS + 1);

		if (list.indexOf(ran) === -1) {
			list.push(ran);
		}


	}


	return {
		name: Faker.Lorem.sentence(),
		list: list
	};

}

function fakeStuff(count, func) {

	stuff = [];

	for (var i = 0; i < count; i++) {
		stuff.push(func());
	}

	return stuff;

}


var stuff = {
	users: fakeStuff(USERS, fakeUser),
	comments: fakeStuff(COMMENTS, fakeComment),
	assets: fakeStuff(ASSETS, fakeAsset),
	lists: fakeStuff(LISTS, fakeList)
};

console.log(util.inspect(stuff, false, null));

