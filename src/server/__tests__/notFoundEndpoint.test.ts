import request from "supertest";
import app from "../app.js";

describe("Given the GET '/palpatine' unexisting endpoint", () => {
  describe("When it receives a request", () => {
    test("Then it should respond with a 404 status code and a 'Endpoint not found' error", async () => {
      interface Body {
        error: string;
      }

      const expectedStatusCode = 404;
      const expectedMessage = "Endpoint not found";

      const response = await request(app).get("/palpatine");

      const responseBody: Body = response.body;

      expect(response.status).toBe(expectedStatusCode);
      expect(responseBody.error).toBe(expectedMessage);
    });
  });
});
