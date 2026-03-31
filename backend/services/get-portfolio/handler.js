/**
 * @fileoverview Main entry point for the Cyber-OS Portfolio Data API.
 * This Lambda function retrieves specific data segments (Projects, Experience, etc.) 
 * from DynamoDB based on a unique ID.
 */

const { GetCommand } = require("@aws-sdk/lib-dynamodb");
const { db, logger } = require("../utils");


/**
 * Lambda handler to fetch portfolio items.
 * @param {Object} event - The AWS Lambda event object.
 * @returns {Promise<Object>} API Gateway compatible response object.
 */
module.exports.handler = async (event) => {
  logger("Received event:", JSON.stringify(event));
  const { id } = event.queryStringParameters || {};
  logger("Fetching portfolio segment for ID:", id);

  if (!id) {
    return {
      statusCode: 400,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ error: "Missing identity ID" }),
    };
  }

  try {
    const command = new GetCommand({
      TableName: process.env.TableName,
      Key: { id },
    });
    const result = await db.send(command);

    if (!result.Item) {
      return {
        statusCode: 404,
        headers: { "Access-Control-Allow-Origin": "*" },
        body: JSON.stringify({ error: "Data segment not found" }),
      };
    }

    /**
     * The returned Item includes the 'ui_vibe' key.
     * This key is mapped in the React frontend to specific Tailwind classes.
     */
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(result.Item),
    };
  } catch (error) {
    logger("DynamoDB Error", error);
    return {
      statusCode: 500,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ error: "System fault: Internal Server Error" }),
    };
  }
};
