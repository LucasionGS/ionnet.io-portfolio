import { Response } from "express";

export default class RequestError extends Error {
  public status: number;
  public message: string;
  public errors: string[];

  constructor(status: number, message: string, errors?: string[]) {
    super(message);
    this.status = status;
    this.message = message;
    this.errors = errors || [];
  }

  public send(res: Response): void {
    res.status(this.status).json({
      error: true,
      status: this.status,
      message: this.message,
      errors: this.errors
    });
  }

  public static badRequest(message: string, errors?: string[]): RequestError {
    return new RequestError(400, message, errors);
  }

  public static unauthorized(message: string, errors?: string[]): RequestError {
    return new RequestError(401, message, errors);
  }

  public static forbidden(message: string, errors?: string[]): RequestError {
    return new RequestError(403, message, errors);
  }

  public static notFound(message: string, errors?: string[]): RequestError {
    return new RequestError(404, message, errors);
  }
}