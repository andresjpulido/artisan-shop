require("dotenv").config();

var mongoose = require("mongoose");
var _ = require("lodash");
var eventsData = require("./events.json");
var usersData = require("./users.json");
var cityData = require("./cities.json");
var groupData = require("./groups.json");
var interestData = require("./interest.json");

let model = null;
let userIds = [];
let cityIds = [];
let interestIds = [];
let groupIds = [];
let creatorCont = 0;
let groupCont = 0;

import { exit } from "process";
import {
	userModel,
	eventModel,
	cityModel,
	groupModel,
	interestModel,
	conversationModel,
	messageModel
} from "../src/db/models";
console.log(process.env.MONGODB_HOST)
mongoose.connect(
	`mongodb://${process.env.MONGODB_HOST}/${process.env.MONGODB_DBNAME}`
);

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

// once the connection is established we define our schemas
db.once("open", async function callback() {
	console.log(
		"connected! " + process.env.MONGODB_HOST + " " + process.env.MONGODB_DBNAME
	);

	await remove(userModel);
	await remove(eventModel);
	await remove(cityModel);
	await remove(groupModel);
	await remove(interestModel);
	await remove(conversationModel);
	await remove(messageModel);

	for (var i = 0; i < interestData.length; i++) {
		let iModel = await new interestModel(interestData[i]).save();
		interestIds.push(iModel._id);
	}

	for (var i = 0; i < cityData.length; i++) {
		model = await new cityModel(cityData[i]).save();
		cityIds.push(model._id);
	}

	for (var i = 0; i < groupData.length; i++) {
		groupData[i].city = { _id: 0 };
		groupData[i].city._id = cityIds[0]._id;
		groupData[i].interests = [];
		groupData[i].interests.push(interestIds[i]);
		groupData[i].interests.push(interestIds[i + 1]);
		groupData[i].interests.push(interestIds[i + 2]);
		model = await new groupModel(groupData[i]).save();
		groupIds.push(model._id);
	}

	for (var i = 0; i < usersData.length; i++) {
		usersData[i].city = { _id: 0 };
		usersData[i].city._id = cityIds[0]._id;
		model = await new userModel(usersData[i]).save();
		userIds.push(model._id);
		/*
		if (groupIds.length - 1 > groupCont + 1) {
			usersData[i].groups.push(groupIds[groupCont + 1]._id);
		} else {
			usersData[i].groups.push(groupIds[groupCont - 1]._id);
		}		
*/
	}

	for (var i = 0; i < eventsData.length; i++) {
		eventsData[i].creator = { _id: 0 };
		eventsData[i].city = { _id: 0 };
		eventsData[i].attendees = [];

		eventsData[i].creator._id = userIds[creatorCont]._id;
		eventsData[i].city._id = cityIds[0]._id;

		if (userIds.length - 1 > creatorCont + 1) {
			eventsData[i].attendees.push(userIds[creatorCont + 1]._id);
		} else {
			eventsData[i].attendees.push(userIds[creatorCont - 1]._id);
		}
		eventsData[i].attendees.push(userIds[creatorCont]._id);

		if (groupIds[i]) {
			eventsData[i].group = { _id: 0 };
			eventsData[i].group._id = groupIds[i];
			console.log(eventsData[i]);
		}

		await new eventModel(eventsData[i]).save();

		if (userIds.length - 1 > creatorCont) creatorCont = creatorCont + 1;
		else creatorCont = 0;
	}

	//create conversations
	let msg = {};
	let usr1 = { _id: 0 };
	let usr2 = { _id: 0 };
	let participants = [];
	let messages = [];

	for (let i = 0; i < userIds.length - 2; i++) {
		usr1._id = userIds[i];
		usr2._id = userIds[i + 1];
		participants.push(usr1);
		participants.push(usr2);
		
		msg = { user: usr1,  text: makeid(250), pending: false };
		msg = await new messageModel(msg).save();
		messages.push(msg);

		msg = { user: usr2, text: makeid(200), pending: true };
		msg = await new messageModel(msg).save();
		messages.push(msg);

		msg = { user: usr1, text: makeid(150), pending: false };
		msg = await new messageModel(msg).save();
		messages.push(msg);

		msg = { user: usr2, text: makeid(250), pending: true };
		msg = await new messageModel(msg).save();
		messages.push(msg);

		await new conversationModel({participants:participants, messages:messages}).save();
		
		//TODO add conversation to participants


	}

	mongoose.connection.close();
	process.exit(1);
});

console.log("done!");
//
const remove = async (model) => {
	await model.find().deleteMany();
};

let makeid = (length) => {
	var result = "";
	var characters =
		" ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789 ";
	var charactersLength = characters.length;
	for (var i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
};
