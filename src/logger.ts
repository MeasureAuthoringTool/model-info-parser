import winston from "winston";

export default winston.createLogger({
  format: winston.format.simple(),
  level: "info",
  transports: [new winston.transports.Console()],
});
