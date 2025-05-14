import { Request, Response } from "express";
import handleErrors from "./handleErrors.js";
import statusCodes from "../../../globals/statusCodes.js";
import ServerError from "../../ServerError/ServerError.js";

describe("Given the handleErrors middleware", () => {
  const req = {};
  const res: Pick<Response, "status" | "json"> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const next = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("When it recieves a reponse and an error with status code 404 and message 'Endpoint not found'", () => {
    const error = new ServerError(statusCodes.NOT_FOUND, "Endpoint not found");

    test("Then it should call the response's status method with status code 404", () => {
      const expectedStatusCode = error.statusCode;

      handleErrors(error, req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call the response's json method with error message 'Endpoint not found'", () => {
      const expectedErrorMessage = { error: error.message };

      handleErrors(error, req as Request, res as Response, next);

      expect(res.json).toHaveBeenCalledWith(expectedErrorMessage);
    });
  });

  describe("When it receives a response and an error with status code 404 and no message", () => {
    test("Then it should call the response's json method with error message 'Server error'", () => {
      const expectedErrorMessage = { error: "Server error" };

      const error = new ServerError(statusCodes.NOT_FOUND);

      handleErrors(error, req as Request, res as Response, next);

      expect(res.json).toHaveBeenCalledWith(expectedErrorMessage);
    });
  });

  describe("When it receives a response and an error without status code and message 'Cannot read properties of undefined'", () => {
    const error = new Error("Cannot read properties of undefined");

    test("Then it should call the response's status method with status code 500", () => {
      const expectedStatusCode = statusCodes.INTERNAL_SERVER_ERROR;

      handleErrors(error as ServerError, req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call the response's json method with error message 'Server error", () => {
      const expectedErrorMessage = { error: "Server error" };

      handleErrors(error as ServerError, req as Request, res as Response, next);

      expect(res.json).toHaveBeenCalledWith(expectedErrorMessage);
    });
  });
});
