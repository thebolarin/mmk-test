import express, { Request, Response } from 'express';
/**
 * Send Response
 * @param {object} res express response Object
 * @param {number} statusCode HTTP status code
 * @param {string} status Status type ('success'||''error')
 * @param {string} message info to the user
 * @param {object} data object of data for user
 */
export const ResMsg = (res: Response, statusCode = 200, error: any, message: any = "") => {
  res.status(statusCode).json({
    message,
    error,
  });
};