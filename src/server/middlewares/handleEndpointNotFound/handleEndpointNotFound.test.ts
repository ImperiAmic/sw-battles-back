import { NextFunction, Request, Response } from "express";
import statusCodes from "../../../globals/statusCodes.js";
import ServerError from "../../ServerError/ServerError.js";
import handleEndpointNotFound from "./handleEndpointNotFound.js";

describe("Given the handleEndpointNotFound middleware", () => {
  describe("When it receives a next function", () => {
    const req = {};
    const res = {};
    const next = jest.fn();

    afterEach(() => {
      jest.clearAllMocks();
    });

    test("Then it should call the next function with an error with status code 404", () => {
      const expectedError: Pick<ServerError, "statusCode"> = {
        statusCode: statusCodes.NOT_FOUND,
      };

      handleEndpointNotFound(
        req as Request,
        res as Response,
        next as NextFunction,
      );

      expect(next).toHaveBeenCalledWith(expect.objectContaining(expectedError));
    });

    test("Then it should call the next function with an error with message'Endpoint not found'", () => {
      const expectedError = { message: "Endpoint not found" } as Pick<
        ServerError,
        "message"
      >;

      handleEndpointNotFound(
        req as Request,
        res as Response,
        next as NextFunction,
      );

      expect(next).toHaveBeenCalledWith(expect.objectContaining(expectedError));
    });
  });
});
