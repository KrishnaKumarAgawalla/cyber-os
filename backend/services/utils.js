const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient } = require("@aws-sdk/lib-dynamodb");

const db = DynamoDBDocumentClient.from(new DynamoDBClient({ region: "us-east-1" }));
const isLogEnabled = process.env.LogEnabled === 'true';

/**
 * Custom logger that respects the environment toggle.
 * Set LOG_ENABLED=true to enable debugging logs.
 * @param {string} message
 * @param {any} [data]
 */
const logger = (message, data = "") => {
  if (isLogEnabled) {
    console.log(`[LOG]: ${message}`, data);
  }
};

/**
 * Parse JSON body safely.
 * @param {string|undefined} body
 * @returns {Object|null} Parsed JSON object or null if invalid.
 */
const parseBody = (body) => {
  if (!body) return {};

  try {
    return JSON.parse(body);
  } catch (err) {
    logger("Invalid JSON body", err);
    return null;
  }
};

/**
 * Build an API Gateway response.
 * @param {number} statusCode
 * @param {Object} body
 * @returns {{statusCode:number,headers:Object,body:string}}
 */
const buildResponse = (statusCode, body) => ({
  statusCode,
  headers: { "Access-Control-Allow-Origin": "*" },
  body: JSON.stringify(body),
});

module.exports = {
  db,
  logger,
  parseBody,
  buildResponse,
};
