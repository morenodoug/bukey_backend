class ApplicationError extends Error {
    constructor(message, status) {
      super();
      const errorMessage = (message == undefined || message == null) ? 
      "Ha ocurrido un error, por favor intente de nuevo" :message

      Error.captureStackTrace(this, this.constructor);
      
      this.name = this.constructor.name;
      
      this.message = message ||   errorMessage;
      
      this.status = status || 500;
  }
}
module.exports = ApplicationError