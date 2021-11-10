import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../errors/CustomError';

export default (err:Error, req:Request, res:Response, next:NextFunction) => {
  if (err instanceof CustomError) {
    res.status(err.statusCode).json({
      errors: err.serializeErrors()
    });
  }

  res.status(400).json({ errors: [{ message: err.message }] });
}