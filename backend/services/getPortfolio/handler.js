/**
 * @fileoverview Main entry point for the Cyber-OS Portfolio Data API.
 * This Lambda function retrieves specific data segments (Projects, Experience, etc.) 
 * from DynamoDB based on a unique ID.
 */

const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, GetCommand } = require("@aws-sdk/lib-dynamodb");

// Initialize the DynamoDB Client for Node.js 22 runtime.
// The region is hardcoded to us-east-1 for "Always Free" consistency.
const client = new DynamoDBClient({ region: "us-east-1" });
const docClient = DynamoDBDocumentClient.from(client);

/**
 * Lambda handler to fetch portfolio items.
 * @param {Object} event - The AWS Lambda event object.
 * @param {Object} event.pathParameters - Contains the 'id' of the requested data segment.
 * @returns {Promise<Object>} API Gateway compatible response object.
 */
module.exports.handler = async (event) => {
  const { id } = event.pathParameters || {};

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
      TableName: process.env.TABLE_NAME,
      Key: { id },
    });
    const result = await docClient.send(command);

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
    console.error("DynamoDB Error:", error);
    return {
      statusCode: 500,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ error: "System fault: Internal Server Error" }),
    };
  }
};
