import mongoose from "mongoose";
import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import app from "../../../server/app.js";
import Battle from "../../model/Battle.js";
import { GetBattlesResponseBody } from "../../types.js";
import connectToDatabase from "../../../database/connectToDatabase.js";
import { barcelonaBattle, empuriesBattle } from "../../fixtures.js";

let server: MongoMemoryServer;

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  const serverUri = server.getUri();
  await connectToDatabase(serverUri);

  await Battle.create(barcelonaBattle, empuriesBattle);
});

afterAll(async () => {
  await mongoose.disconnect();
  await server.stop();
});

describe("Given the GET /battles endpoint", () => {
  describe("When it receives a request", () => {
    test("Then it should response with a 200 status code", async () => {
      const expectedStatusCode = 200;

      const response = await request(app).get("/battles");

      expect(response.status).toBe(expectedStatusCode);
    });

    test("Then it should response with Barcelona and Empúries battles", async () => {
      const expectedBarcelonaBattleName = "Battle of Barcelona";
      const expectedEmpuriesBattleName = "Battle of Empúries";

      const response = await request(app).get("/battles");
      const responseBody = response.body as GetBattlesResponseBody;

      expect(responseBody.battles).toContainEqual(
        expect.objectContaining({ battleName: expectedBarcelonaBattleName }),
      );
      expect(responseBody.battles).toContainEqual(
        expect.objectContaining({ battleName: expectedEmpuriesBattleName }),
      );
    });

    test("Then it should response with Barcelona and Empúries battles", async () => {
      const expectedBattlesTotal = 2;

      const response = await request(app).get("/battles");
      const responseBody = response.body as GetBattlesResponseBody;

      expect(responseBody.battlesTotal).toBe(expectedBattlesTotal);
    });
  });
});
