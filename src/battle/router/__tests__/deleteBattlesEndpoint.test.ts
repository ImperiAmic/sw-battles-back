import request from "supertest";
import app from "../../../server/app.js";
import { ilipaBattle, ruscinoBattle } from "../../fixtures.js";
import { BattleResponseBody } from "../../types.js";
import { MongoMemoryServer } from "mongodb-memory-server";
import connectToDatabase from "../../../database/connectToDatabase.js";
import Battle from "../../model/Battle.js";
import mongoose from "mongoose";

let server: MongoMemoryServer;

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  const serverUri = server.getUri();
  await connectToDatabase(serverUri);
  await Battle.create(ruscinoBattle, ilipaBattle);
});

afterAll(async () => {
  await mongoose.disconnect();
  await server.stop();
});

describe("Given the DELETE /battles/:battleId endpoint", () => {
  describe("When it receives a request with the ID from Battle of Ruscino", () => {
    test("Then it should response with a 200 status code and the Battle of Ruscino", async () => {
      const response = await request(app).delete(
        `/battles/${ruscinoBattle._id}`,
      );

      const responseBody = response.body as BattleResponseBody;

      expect(response.status).toBe(200);
      expect(responseBody.battle).toEqual(
        expect.objectContaining({
          battleName: ruscinoBattle.battleName,
        }),
      );
    });
  });

  describe("When it receives a request with a battle ID that does not exist", () => {
    test("Then it should respond with a 404 status code and the 'The battle identifier has not been found' error", async () => {
      const expectedStatusCode = 404;
      const expectedErrorMessage = {
        error: "The battle identifier has not been found",
      };

      const response = await request(app).delete(
        "/battles/ffffffffffffffffffffffff",
      );

      expect(response.status).toBe(expectedStatusCode);
      expect(response.body).toStrictEqual(expectedErrorMessage);
    });
  });

  describe("When it receives a request with an invalid battle ID", () => {
    test("Then is should response with a 406 status code and 'The battle identifier is not correct' error message", async () => {
      const expectedStatusCode = 400;
      const expectedErrorMessage = {
        error: "The battle identifier is not correct",
      };

      const response = await request(app).delete(
        "/battles/aaaaaaaaaaaaaaaaaaaaaaa",
      );

      expect(response.status).toBe(expectedStatusCode);
      expect(response.body).toStrictEqual(expectedErrorMessage);
    });
  });
});
