import  supertest from "supertest";
import dotenv from "dotenv"; 
dotenv.config();
const _req = supertest("http://l192.168.20.16:4000");
 
 
var username = process.env.BASIC_AUTH_USERNAME;
var password = process.env.BASIC_AUTH_PASSWORD;
var token  =  Buffer.from(username + ':' + password).toString('base64');
   
/*
export default {
	request, token
};
*/
module.exports = {
	_req, token
};
