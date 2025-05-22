import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import {
  ebreBattle,
  ilipaBattle,
  newRosesBattle,
  repeatedRosesBattle,
} from "../../fixtures.js";
import connectToDatabase from "../../../database/connectToDatabase.js";
import { BattleResponseBody } from "../../types.js";
import Battle from "../../model/Battle.js";
import app from "../../../server/app.js";

let server: MongoMemoryServer;

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  const serverUri = server.getUri();
  await connectToDatabase(serverUri);
  await Battle.create(ebreBattle, ilipaBattle);
});

afterAll(async () => {
  await mongoose.disconnect();
  await server.stop();
});

describe("Given the PUT /battles endpoint", () => {
  describe("When it receives a request with Seige of Roses", () => {
    test("Then it should response with a 201 status code and Battle of Roses", async () => {
      const expectedStatusCode = 201;

      const response = await request(app).put("/battles").send(newRosesBattle);

      const responseBody = response.body as BattleResponseBody;

      expect(response.status).toBe(expectedStatusCode);
      expect(responseBody.battle.battleName).toBe(newRosesBattle.battleName);
    });
  });

  describe("When it receives a request with Ilipa Battle, which is already included", () => {
    test("Then it should response with a 409 status code and a 'The battle to add is already in the database' error", async () => {
      const expectedStatusCode = 409;
      const expectedErrorMessage = {
        error: "The battle to add is already in the database",
      };

      const response = await request(app)
        .put("/battles")
        .send(repeatedRosesBattle);

      expect(response.status).toBe(expectedStatusCode);
      expect(response.body).toStrictEqual(expectedErrorMessage);
    });
  });
});
