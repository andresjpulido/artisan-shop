import  supertest from "supertest";
const request = supertest("http://localhost:4000");
import {describe, expect, test, beforeEach, afterAll, jest} from '@jest/globals';
 

describe("Status Test Suite", () => {

    test("GET status", async () => {
        await request.get(`/api/status`)
            .expect(200);
    });

});