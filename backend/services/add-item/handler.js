const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, PutCommand } = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({ region: "us-east-1" });
const docClient = DynamoDBDocumentClient.from(client);
const isLogEnabled = process.env.LogEnabled === 'true';

/**
 * Custom logger that respects the environment toggle.
 * Set the environment variable LOG_ENABLED=true to enable logging in production.
 * @param {string} message - The log message to output.
 * @param {any} data - Optional additional data to log.
 */
const logger = (message, data = "") => {
  if (isLogEnabled) {
    console.log(`[LOG]: ${message}`, data);
  }
};

/**
 * Lambda handler for writing a single portfolio item into DynamoDB.
 * @param {Object} event - AWS Lambda event.
 * @param {Object} event.body - JSON string payload containing the item to store.
 * @returns {Promise<Object>} API Gateway-compatible response object.
 */
module.exports.handler = async (event) => {
  logger("Received event", event);

  if (!event.body) {
    logger("Missing request body");
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Request body is required" }),
    };
  }

  try {
    const item = JSON.parse(event.body);
    logger("Parsed item", item);

    const command = new PutCommand({
      TableName: process.env.TableName,
      Item: item,
    });

    const result = await docClient.send(command);
    logger("DynamoDB put result", result);

    return {
      statusCode: 201,
      body: JSON.stringify({ message: "Data successfully transmitted to Cyber-OS memory." }),
    };
  } catch (error) {
    logger("Error writing item", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to add item to DynamoDB" }),
    };
  }
};