const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient } = require("@aws-sdk/lib-dynamodb");
const crypto = require('crypto');


const db = DynamoDBDocumentClient.from(
  new DynamoDBClient({ region: "us-east-1" }),
);
const isLogEnabled = process.env.LogEnabled === "true";

/**
 * Derives a stable key from a password using SHA-256.
 * @param {string} password - The password to derive the key from.
 * @returns {Buffer} The derived key.
 */
const getDerivedKey = (password) => {
    return crypto.createHash('sha256').update(String(password)).digest();
};

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
 * Encrypt data using AES-256-GCM for secure transmission.
 * Combines IV, Auth Tag, and Ciphertext into a single Base64 string.
 * @param {Object} data - The data to encrypt.
 * @returns {string} Base64 encoded string containing IV, Auth Tag, and Ciphertext.
 */
const encodeData = (data) => {
    const password = process.env.CipherKey;
    const key = getDerivedKey(password);
    const iv = crypto.randomBytes(12);
    
    const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
    const encrypted = Buffer.concat([
        cipher.update(JSON.stringify(data), 'utf8'),
        cipher.final()
    ]);

    const authTag = cipher.getAuthTag();
    // Combined Payload: IV (12) + Tag (16) + Data
    return Buffer.concat([iv, authTag, encrypted]).toString("base64");
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
