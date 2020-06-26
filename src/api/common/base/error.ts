export class BaseError extends Error {
  constructor(public code: number, message: string) {
    super(message);
    Object.setPrototypeOf(this, BaseError.prototype);
  }
}

export class HttpResponseError extends BaseError {
  constructor(public code: number, message: string) {
    super(code, message);
    Object.setPrototypeOf(this, HttpResponseError.prototype);
  }
}

export class BadRequestError extends HttpResponseError {
  constructor(message: string) {
    super(400, message);
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
}

export class ServiceUnavailableError extends HttpResponseError {
  constructor(message: string) {
    super(503, message);
    Object.setPrototypeOf(this, ServiceUnavailableError.prototype);
  }
}

export class NotFoundError extends HttpResponseError {
  constructor(message: string) {
    super(404, message);
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}
