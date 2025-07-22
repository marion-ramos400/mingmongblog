
export class ResponseHandler {
  constructor(res) {
    this.res = res;
  }

  sendResponse(code, data) {
    this.res.status(code).json(data)
  }

  sendError = (errCode, errMsg) =>  {
    this.sendResponse(errCode, { error: errMsg })
  }

  sendSuccess = (statusCode, data) => {
    this.sendResponse(statusCode, data)
  }

}
