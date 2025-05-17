import { Request, Response } from "express";
import handleHealthCheck from "./handleHealthCheck.js";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given the handleHealthCheck middleware", () => {
  describe("When it receives a response", () => {
    const req = {};
    const res: Pick<Response, "status" | "json"> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    test("Then it should call the received response's method status with 200", () => {
      const expectedStatusCode = 200;

      handleHealthCheck(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call the received response's method json with '🏓' message", () => {
      const expectedMessage = { message: "🏓" };

      handleHealthCheck(req as Request, res as Response);

      expect(res.json).toHaveBeenCalledWith(expectedMessage);
    });
  });
});
