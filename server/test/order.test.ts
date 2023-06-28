import "reflect-metadata";
import { Container } from "typedi";

import config from "../src/config";
 
import  supertest from "supertest";
const request = supertest("http://localhost:4000");


import orderService from "../src/services/orderService";



describe("Order Test Suite", () => {
	
	const OLD_ENV = process.env;

	beforeEach(() => {
		jest.resetModules() // Most important - it clears the cache
		process.env = { ...OLD_ENV }; // Make a copy
	});

	afterAll(() => {
		process.env = OLD_ENV; // Restore old environment
	});

	
 

	try {
	 
 
		test("GET orders", async () => {
			await request.get(`/api/orders`)
				.expect(500);
		});

		test("GET orders", async () => {
			await request.get(`/api/orders`)
				.expect(200);
		});

		test("GET orders by id", async () => {
			await request.get(`/api/orders/1`)
				.expect(404);
		});

		test("GET orders by id 6238e8210000646efa367326", async () => {
			await request.get(`/api/orders/6238e8210000646efa367326`)
				.expect(200);
		});

 		test("POST orders no inputs", async () => {
			await request.post(`/api/orders`)
				.expect(400);
		});
		
		test("POST orders", async () => {
			await request.post(`/api/orders`)
			.send({
				title: `io`,
				latitude: 0,
				longitude: 0,
				url: `url`,
				description: `idescriptiono`

			})
			.expect(200);
		}); 

		test("DELETE orders", async () => {
			await request.delete(`/api/orders/1`)
				.expect(200);
		});

		test("PUT orders", async () => {
			await request.put(`/api/orders/1`)
				.expect(200);
		});
 
 
		test("get all service",async (params:any) => {
  
			//const serviceInstance = Container.get(orderService);
			//await serviceInstance.getAll(null)

			let oser = new orderService()
			await oser.getAll(null)

		}, 3000)
 
	} catch (err) {
		//console.log("Exception : ", err);
	}
});
   