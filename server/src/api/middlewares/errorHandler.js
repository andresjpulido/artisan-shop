import AppError  from "../../AppError"; 
import { DATABASE_ERROR } from "../../constants/errorCodes"

const errorHandler = (error, req, res, next) => {
  console.log(error);

  if (error.name === "ValidationError") {
    return res.status(400).send({
      type: "ValidationError",
      errorCode: error.errorCode,
      details: error.details,
    });
  }

  if (error.name === "SequelizeDatabaseError") {
    return res.status(500).send({
      type: "DatabaseError",
      errorCode: DATABASE_ERROR,
      details: error.details,
    });
  }

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      errorCode: error.errorCode,
    });
  }

  return res.status(500).send({
    type: "GeneralError",
    details: error.details,
  });
};

module.exports = errorHandler;
