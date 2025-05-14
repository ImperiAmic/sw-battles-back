import { StatusCodes } from "./types.js";

const statusCodes: StatusCodes = {
  OK: 200,
  INTERNAL_SERVER_ERROR: 500,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  NOT_ACCEPTABLE: 406,
};

export default statusCodes;
