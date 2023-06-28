import  supertest from "supertest";
const request = supertest("http://localhost:4000");

describe("Status Test Suite", () => {

    test("GET status", async () => {
        await request.get(`/api/status`)
            .expect(200);
    });

});