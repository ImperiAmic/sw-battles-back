import mongoose from "mongoose";
import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import app from "../../../server/app.js";
import Battle from "../../model/Battle.js";
import connectToDatabase from "../../../database/connectToDatabase.js";
import { BattleResponseBody, ResponseBodyError } from "../../types.js";
import {
  empuriesBattle,
  lleidaBattle,
  wrongIdEbreBattle,
} from "../../fixtures.js";

let server: MongoMemoryServer;

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  const serverUri = server.getUri();
  await connectToDatabase(serverUri);
  await Battle.create(empuriesBattle, lleidaBattle);
});

afterAll(async () => {
  await mongoose.disconnect();
  await server.stop();
});

describe("Given the PATCH /battles/:battleId endpoint", () => {
  describe("When it receives a request with Battle of Empúries", () => {
    test("Then it should response with a 200 status code", async () => {
      const expectedStatusCode = 200;

      const response = await request(app).patch(
        `/battles/${empuriesBattle._id}`,
      );

      const responseBody = response.body as BattleResponseBody;

      expect(response.status).toBe(expectedStatusCode);
      expect(responseBody.battle.doesLightSideWin).toBe(false);
    });
  });

  describe("When it receives a request with an invalid ID", () => {
    test("Then it should response with 400 status code and 'The battle identifier is not correct' error", async () => {
      const expectedStatusCode = 400;
      const expectErrorMessage = "The battle identifier is not correct";

      const response = await request(app).patch(
        `/battles/${wrongIdEbreBattle._id}`,
      );

      const responseBody = response.body as ResponseBodyError;

      expect(response.status).toBe(expectedStatusCode);
      expect(responseBody.error).toBe(expectErrorMessage);
    });
  });
});
