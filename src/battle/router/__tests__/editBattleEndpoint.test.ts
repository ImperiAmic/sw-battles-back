import mongoose from "mongoose";
import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import app from "../../../server/app.js";
import Battle from "../../model/Battle.js";
import connectToDatabase from "../../../database/connectToDatabase.js";
import { BattleResponseBody, ResponseBodyError } from "../../types.js";
import {
  editedRuscinoBattle,
  lleidaBattle,
  ruscinoBattle,
  wrongEditedRuscinoBattle,
} from "../../fixtures.js";

let server: MongoMemoryServer;

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  const serverUri = server.getUri();
  await connectToDatabase(serverUri);
  await Battle.create(lleidaBattle, ruscinoBattle);
});

afterAll(async () => {
  await mongoose.disconnect();
  await server.stop();
});

describe("Given the PUT /battles/:battleId endpoint", () => {
  describe("When it receives a request with Battle of Ruscino", () => {
    test("Then it should response with a 200 status code", async () => {
      const expectedStatusCode = 200;

      const response = await request(app)
        .put(`/battles/${editedRuscinoBattle._id}`)
        .send(editedRuscinoBattle);

      const responseBody = response.body as BattleResponseBody;

      expect(response.status).toBe(expectedStatusCode);
      expect(responseBody.battle.conflict).toBe(editedRuscinoBattle.conflict);
    });
  });

  describe("When it receives a request with an invalid ID", () => {
    test("Then it should response with 400 status code and 'The battle identifier is not correct' error", async () => {
      const expectedStatusCode = 400;
      const expectErrorMessage = "The battle identifier is not correct";

      const response = await request(app).put(
        `/battles/${wrongEditedRuscinoBattle._id}`,
      );

      const responseBody = response.body as ResponseBodyError;

      expect(response.status).toBe(expectedStatusCode);
      expect(responseBody.error).toBe(expectErrorMessage);
    });
  });
});
