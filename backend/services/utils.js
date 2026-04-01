const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient } = require("@aws-sdk/lib-dynamodb");

const db = DynamoDBDocumentClient.from(
  new DynamoDBClient({ region: "us-east-1" }),
);
const isLogEnabled = process.env.LogEnabled === "true";

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
 * Simple XOR Obfuscation to hide plain text from the Network Tab
 * @param {string} str - The string to encode/decode
 * @returns {string}
 */
const xorCipher = (str) => {
  const key = process.env.CIPHER_KEY || "CYBER_OS_SECRET";
  return str
    .split("")
    .map((char, i) =>
      String.fromCharCode(char.charCodeAt(0) ^ key.charCodeAt(i % key.length)),
    )
    .join("");
};

/**
 * Encodes data to Base64 after XOR for transmission
 */
const encodeData = (data) => {
  const jsonStr = JSON.stringify(data);
  const ciphered = xorCipher(jsonStr);
  return Buffer.from(ciphered).toString("base64");
};

/**
 * Build an API Gateway response.
 * @param {number} statusCode
 * @param {Object} body
 * @returns {{statusCode:number,headers:Object,body:string}}
 */
const buildResponse = (statusCode, body, encode = true) => {
  const responseBody = encode ? encodeData(body) : JSON.stringify(body);

  return {
    statusCode,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "X-Content-Encoded": encode ? "true" : "false",
      "Content-Type": "application/json",
    },
    body: responseBody,
  };
};

module.exports = {
  db,
  logger,
  parseBody,
  buildResponse,
};
