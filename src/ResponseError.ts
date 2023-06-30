class ResponseError extends Error {
  public status: any;
  constructor(status: any, message: string) {
    super(message);
    this.status = status;
  }
}

export { ResponseError };
