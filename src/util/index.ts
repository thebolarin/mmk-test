import express, { Request, Response } from 'express';
/**
 * Send Response
 * @param {object} res express response Object
 * @param {number} statusCode HTTP status code
 * @param {any} error Error 
 * @param {string} message
 */
export const ResMsg = (res: Response, statusCode = 200, error: any, message: any = "") => {
  res.status(statusCode).json({
    message,
    error,
  });
};